import { EngineApi } from '../../../api/engine/EngineApi';
import GarageApi from '../../../api/garage/GarageApi';
import { WinnersApi } from '../../../api/winners/WinnersApi';
import type { IGarage } from '../../../types/garage.dto';
import type { IStartRaceInfo } from '../../../types/startRaceInfo.dto';
import { Pagination } from '../../../utils/Pagination';
import { Car } from '../../Car/Car';
import { CreateCardForm } from '../CreateCarForm/CreateCarForm';
import { GaragePagination } from '../GaragePagination/GaragePagination';
import { RemoveCarButton } from '../RemoveCarButton/RemoveCarButton';
import { SelectCarButton } from '../SelectCarButton/SelectCarButton';
import { UpdateCardForm } from '../UpdateCarForm/UpdateCarForm';
import { CarFinishFlag } from './CarFinishFlag/CarFinishFlag';
import './Garage.css';

export const Garage = {
  idGarageContent: 'garage_content',
  localStoragePage: 'async_race__selected_page',
  async render(page: number, limit: number): Promise<void> {
    const NODE_ID = `#${Garage.idGarageContent}`;
    const DIV = document.querySelector(NODE_ID);
    if (!DIV) {
      console.info(`Node is not found: ${NODE_ID}`);
      return;
    }
    DIV.innerHTML = 'Loading...';
    const { CARS, TOTAL_COUNT } = await GarageApi.getPagination(page, limit);
    Garage.savePage(page);

    DIV.innerHTML = `
      <div>Garage (${TOTAL_COUNT})</div> <div>Page #${page}</div>
      <div class="${Garage.idGarageContent}__cars scroll">
        ${CARS.map(car => {
          return `
            <div class="car__element">
              <div>
                ${SelectCarButton.render(car.id)}
                ${RemoveCarButton.render(car.id)}
                ${car.id} ${car.name}
              </div>
              <button class="btn btn-sm btn-success" data-button-car-start="${car.id}">A</button>
              <button class="btn btn-sm btn-danger" data-button-car-stop="${car.id}">B</button>
              <div class="garage_content__car_road" data-car-image="${car.id}">
                ${Car.render(car.color)}
                ${CarFinishFlag.render(car.id)}
              </div>
              <div data-car-css="${car.id}"></div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    if (CARS.length === 0) {
      DIV.innerHTML = 'No cars';
    }

    await Garage.componentDidMount(CARS, page, limit, TOTAL_COUNT);
    Garage.addEventForCars(CARS);
  },
  addEventForCars(cars: Array<IGarage>): void {
    for (const CAR of cars) {
      const ID = String(CAR.id);
      document
        .querySelector(`button[data-button-car-start="${CSS.escape(ID)}"]`)
        ?.addEventListener('click', async () => await Garage.startCar(CAR.id));
      document
        .querySelector(`button[data-button-car-stop="${CSS.escape(ID)}"]`)
        ?.addEventListener('click', async () => await Garage.stopEngine(CAR.id));
    }
  },
  _startCar_before(id: number): void {
    Garage.removeDtp(id);
    Garage.removeAnimate(id);
    CarFinishFlag.removeFinishAnimation(id);
    Garage.disableA(id);
    Garage.disableB(id);
  },
  _startCar_after(id: number): void {
    Garage.enableA(id);
    Garage.enableB(id);
  },
  async startCar(id: number): Promise<number> {
    try {
      Garage._startCar_before(id);

      const DATA = await EngineApi.engineStart(id);
      const TIME = DATA.distance / 1000 / DATA.velocity;

      Garage.addAnimate(id, TIME);

      try {
        await EngineApi.engineDrive(id);
      } catch (error) {
        console.info('Car not finished - car is crushed', error);
        CarFinishFlag.addFinishCrushAnimation(id);
        Garage.addDtp(id);
        return 9_999_999;
      }
      CarFinishFlag.addFinishSuccessAnimation(id);

      try {
        const WINNER = await WinnersApi.getById(id);
        const MIN_TIME = Math.min(WINNER.time, TIME);
        await WinnersApi.update(
          {
            wins: WINNER.wins + 1,
            time: MIN_TIME,
          },
          id
        );
        return MIN_TIME;
      } catch (error) {
        console.info('Car not found for update', error);
        await WinnersApi.create({ id: id, time: TIME, wins: 1 });
        return TIME;
      }
    } catch (error) {
      console.info('Error start car', error);
      return 9_999_999;
    } finally {
      Garage._startCar_after(id);
    }
  },
  getLeftProcent(carId: number): number {
    const CAR_ROAD = Garage.getRoadElement(carId);
    const CAR_ICON = Garage.getCarElement(carId);

    const ROAD_WIDTH = globalThis.getComputedStyle(CAR_ROAD).width;
    const CURR_WIDTH = globalThis.getComputedStyle(CAR_ICON).left;

    const ROAD_NUMBER_WIDTH = Number(ROAD_WIDTH.replace('px', '')); // 100 %
    const CURR_NUMBER_WIDTH = Number(CURR_WIDTH.replace('px', '')); // x%
    let PROCENT = (CURR_NUMBER_WIDTH * 100) / ROAD_NUMBER_WIDTH;
    console.log(`Crush for cardId='${carId} on ${PROCENT}%'`);
    CAR_ICON.style.left = `${PROCENT}%`;

    return PROCENT;
  },
  getRoadElement(carId: number): HTMLElement {
    const CAR_ROAD_SELECTOR = `div[data-car-image="${carId}"]`;
    const CAR_ROAD = document.querySelector(CAR_ROAD_SELECTOR);
    if (!CAR_ROAD) {
      throw new Error(`Node is not found ${CAR_ROAD_SELECTOR}`);
    }
    if (!(CAR_ROAD instanceof HTMLElement)) {
      throw new TypeError(`Node is not found ${CAR_ROAD_SELECTOR}`);
    }
    return CAR_ROAD;
  },
  getCarElement(carId: number): HTMLElement {
    const CAR_ICON_SELECTOR = `div[data-car-image="${carId}"] .car__wrapper`;
    const CAR_ICON = document.querySelector(CAR_ICON_SELECTOR);
    if (!CAR_ICON) {
      throw new Error(`Node is not found ${CAR_ICON_SELECTOR}`);
    }
    if (!(CAR_ICON instanceof HTMLElement)) {
      throw new TypeError(`Node is not found ${CAR_ICON_SELECTOR}`);
    }
    return CAR_ICON;
  },
  removeDtp(carId: number): void {
    const CAR_ICON = Garage.getCarElement(carId);
    CAR_ICON.dataset.dtp = 'false';
    CAR_ICON.style.left = '';
  },
  addDtp(carId: number): void {
    const CAR_ICON = Garage.getCarElement(carId);
    CAR_ICON.dataset.dtp = 'true';
    const PROCENT = Garage.getLeftProcent(carId);
    CAR_ICON.setAttribute('title', `Crush on ${PROCENT}%`.replaceAll(`"`, `'`));
    Garage.removeAnimate(carId);
  },
  removeAnimate(carId: number): void {
    const CAR_ICON = Garage.getCarElement(carId);
    CAR_ICON.classList.remove(`animate--${carId}`);
  },
  addAnimate(carId: number, time: number): void {
    const CSS_SELECTOR = `div[data-car-css="${CSS.escape(String(carId))}"]`;
    const DIV_CSS = document.querySelector(CSS_SELECTOR);
    if (!DIV_CSS) {
      throw new Error(`Node is not found ${CSS_SELECTOR}`);
    }
    if (DIV_CSS instanceof HTMLElement) {
      DIV_CSS.innerHTML = `
            <style>
            .garage_content__car_road .car__wrapper.animate--${carId} {
              animation: moveRight ${time}s linear forwards;
            }
            </style>
          `;
    }

    const CAR_ICON = Garage.getCarElement(carId);
    CAR_ICON.classList.add(`animate--${carId}`);
  },
  async resetRace(page: number, limit: number): Promise<void> {
    const BUTTON_SELECTOR = `#reset_race`;
    const BUTTON = document.querySelector(BUTTON_SELECTOR);
    if (!BUTTON) {
      console.info(`Node is not found: ${BUTTON_SELECTOR}`);
      return;
    }

    BUTTON.setAttribute('disabled', 'true');
    BUTTON.innerHTML = 'Reset race (loading...)';

    const { CARS } = await GarageApi.getPagination(page, limit);
    for (const CAR of CARS) {
      Garage.disableA(CAR.id);
      Garage.disableB(CAR.id);
    }

    for (let index = 0; index <= CARS.length; index++) {
      try {
        const CAR_ID = CARS[index].id;
        await EngineApi.engineStopped(CAR_ID);
        Garage.removeDtp(CAR_ID);
        Garage.removeAnimate(CAR_ID);
        CarFinishFlag.removeFinishAnimation(CAR_ID);
      } catch (error) {
        console.info('Error stop engine', error);
      }
    }

    for (const CAR of CARS) {
      Garage.enableA(CAR.id);
      Garage.enableB(CAR.id);
    }

    BUTTON.innerHTML = 'Reset race';
    BUTTON.removeAttribute('disabled');
  },
  async startRace(page: number, limit: number): Promise<void> {
    const BUTTON_SELECTOR = `#start_race`;
    const BUTTON = document.querySelector(BUTTON_SELECTOR);
    if (!BUTTON) {
      console.info(`Node is not found: ${BUTTON_SELECTOR}`);
      return;
    }

    BUTTON.setAttribute('disabled', 'true');
    BUTTON.innerHTML = 'Start race (loading...)';

    const { CARS } = await GarageApi.getPagination(page, limit);
    for (const CAR of CARS) {
      Garage.disableA(CAR.id);
      Garage.disableB(CAR.id);
    }

    const ARRAY: Array<IStartRaceInfo> = [];

    const PROMISES = CARS.map(async CAR => {
      const CAR_ID = CAR.id;
      const TIME = await Garage.startCar(CAR_ID);
      return {
        carId: CAR_ID,
        time: TIME,
      };
    });

    const RESULTS = await Promise.all(PROMISES);
    ARRAY.push(...RESULTS);

    let minTime = 9_999_999;
    for (const element of ARRAY) {
      if (element.time < minTime) {
        minTime = element.time;
      }
    }

    Garage._start_race__alert(minTime, CARS, ARRAY);

    for (const CAR of CARS) {
      Garage.enableA(CAR.id);
      Garage.enableB(CAR.id);
    }

    BUTTON.innerHTML = 'Start race';
    BUTTON.removeAttribute('disabled');
  },
  _start_race__alert(minTime: number, CARS: Array<IGarage>, ARRAY: Array<IStartRaceInfo>): void {
    if (minTime == 9_999_999) {
      alert('nothing not win race because cars crush');
    }

    if (minTime !== 9_999_999) {
      const WINNERS: Array<IGarage> = [];
      for (const element of ARRAY) {
        if (element.time == minTime) {
          for (const CAR of CARS) {
            if (CAR.id === element.carId) {
              WINNERS.push(CAR);
            }
          }
        }
      }

      alert(
        `First car finished on time ${minTime}s: ${WINNERS.map(car => {
          return `\n${minTime}s - ${car.id} - ${car.name} (color ${car.color})`;
        })}`
      );
    }
  },
  async stopEngine(carId: number): Promise<void> {
    Garage.disableA(carId);
    Garage.disableB(carId);
    await EngineApi.engineStopped(carId);
    Garage.removeDtp(carId);
    Garage.removeAnimate(carId);
    CarFinishFlag.removeFinishAnimation(carId);
    Garage.enableA(carId);
    Garage.enableB(carId);
  },
  getA(carId: number): HTMLButtonElement {
    const ID = String(carId);
    const SELECTOR = `button[data-button-car-start="${CSS.escape(ID)}"]`;
    const BUTTON = document.querySelector(SELECTOR);
    if (!BUTTON) {
      throw new Error(`Node is not found: ${SELECTOR}`);
    }
    if (!(BUTTON instanceof HTMLButtonElement)) {
      throw new TypeError(`Node is not found ${SELECTOR}`);
    }
    return BUTTON;
  },
  disableA(carId: number): void {
    const BUTTON = Garage.getA(carId);
    BUTTON.setAttribute('disabled', 'true');
  },
  enableA(carId: number): void {
    const BUTTON = Garage.getA(carId);
    BUTTON.removeAttribute('disabled');
  },
  getB(carId: number): HTMLButtonElement {
    const ID = String(carId);
    const SELECTOR = `button[data-button-car-stop="${CSS.escape(ID)}"]`;
    const BUTTON = document.querySelector(SELECTOR);
    if (!BUTTON) {
      throw new Error(`Node is not found: ${SELECTOR}`);
    }
    if (!(BUTTON instanceof HTMLButtonElement)) {
      throw new TypeError(`Node is not found ${SELECTOR}`);
    }
    return BUTTON;
  },
  disableB(carId: number): void {
    const BUTTON = Garage.getB(carId);
    BUTTON.setAttribute('disabled', 'true');
  },
  enableB(carId: number): void {
    const BUTTON = Garage.getB(carId);
    BUTTON.removeAttribute('disabled');
  },
  getPage(): number {
    return Number(localStorage.getItem(Garage.localStoragePage) || 1) || 1;
  },
  savePage(page: number): void {
    localStorage.setItem(Garage.localStoragePage, String(page));
  },
  fixPage(page: number, limit: number, totalCount: number): void {
    const LAST_PAGE = Pagination.getLastPage(totalCount, limit);
    if (page > LAST_PAGE) {
      Garage.savePage(LAST_PAGE);
      Garage.render(LAST_PAGE, limit);
    }
    if (page <= 0) {
      Garage.savePage(1);
      Garage.render(1, limit);
    }
  },
  async componentDidMount(
    CARS: Array<IGarage>,
    page: number,
    limit: number,
    totalCount: number
  ): Promise<void> {
    CreateCardForm.init();
    UpdateCardForm.init();
    for (const CAR of CARS) {
      SelectCarButton.init(CAR.id);
      RemoveCarButton.init(CAR.id);
    }

    document
      .querySelector(`#generate_cars`)
      ?.addEventListener('click', GarageApi.generageRandom100Cars);

    document
      .querySelector(`#reset_race`)
      ?.addEventListener('click', async () => await Garage.resetRace(page, limit));

    document
      .querySelector(`#start_race`)
      ?.addEventListener('click', async () => await Garage.startRace(page, limit));

    await GaragePagination.render(page, limit, totalCount);

    Garage.fixPage(page, limit, totalCount);
  },
};
