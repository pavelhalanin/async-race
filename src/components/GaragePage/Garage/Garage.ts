import { EngineApi } from '../../../api/engine/EngineApi';
import GarageApi from '../../../api/garage/GarageApi';
import type { IGarage } from '../../../types/garage.dto';
import { Pagination } from '../../../utils/Pagination';
import { Car } from '../../Car/Car';
import { CreateCardForm } from '../CreateCarForm/CreateCarForm';
import { GaragePagination } from '../GaragePagination/GaragePagination';
import { RemoveCarButton } from '../RemoveCarButton/RemoveCarButton';
import { SelectCarButton } from '../SelectCarButton/SelectCarButton';
import { UpdateCardForm } from '../UpdateCarForm/UpdateCarForm';
import './Garage.css';

export const Garage = {
  idGarageContent: 'garage_content',
  localStoragePage: 'async_race__selected_page',
  async render(page: number, limit: number): Promise<void> {
    const NODE_ID = `#${Garage.idGarageContent}`;
    const DIV = document.querySelector(NODE_ID);
    if (!DIV) {
      console.error(`Node is not found: ${NODE_ID}`);
      return;
    }
    DIV.innerHTML = 'Loading...';
    const { CARS, TOTAL_COUNT } = await GarageApi.getPagination(page, limit);
    Garage.savePage(page);

    DIV.innerHTML = `
      <div>Garage (${TOTAL_COUNT})</div> <div>Page #${page}</div>
      <div class="${Garage.idGarageContent}__cars">
        ${CARS.map(car => {
          return `
          <div>
            ${SelectCarButton.render(car.id)}
            ${RemoveCarButton.render(car.id)}
            ${car.id} ${car.name}
          </div>
          <button class="btn btn-sm btn-primary" data-button-car-start="${car.id}">A</button>
          <div class="garage_content__car_road" data-car-image="${car.id}">
            ${Car.render(car.color)}
          </div>
          <div data-car-css="${car.id}"></div>
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
    }
  },
  async startCar(id: number): Promise<void> {
    try {
      Garage.removeDtp(id);
      Garage.removeAnimate(id);

      const DATA = await EngineApi.engineStart(id);
      const TIME = DATA.distance / 1000 / DATA.velocity;

      Garage.addAnimate(id, TIME);

      try {
        await EngineApi.engineDrive(id);
      } catch (error) {
        console.error(error);
        Garage.addDtp(id);
      }
    } catch (error) {
      alert(error);
    }
  },
  getCarElement(carId: number): Element {
    const CAR_ICON_SELECTOR = `div[data-car-image="${carId}"] .car__wrapper`;
    const CAR_ICON = document.querySelector(CAR_ICON_SELECTOR);
    if (!CAR_ICON) {
      throw new Error(`Node is not found ${CAR_ICON_SELECTOR}`);
    }
    if (!(CAR_ICON instanceof HTMLSpanElement)) {
      throw new TypeError(`Node is not found ${CAR_ICON_SELECTOR}`);
    }
    return CAR_ICON;
  },
  removeDtp(carId: number): void {
    const CAR_ICON = Garage.getCarElement(carId);
    if (!(CAR_ICON instanceof HTMLSpanElement)) {
      throw new TypeError(`Node is not found ${carId}`);
    }
    CAR_ICON.dataset.dtp = 'false';
  },
  addDtp(carId: number): void {
    const CAR_ICON = Garage.getCarElement(carId);
    if (!(CAR_ICON instanceof HTMLSpanElement)) {
      throw new TypeError(`Node is not found ${carId}`);
    }
    CAR_ICON.dataset.dtp = 'true';
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

    await GaragePagination.render(page, limit, totalCount);

    Garage.fixPage(page, limit, totalCount);
  },
};
