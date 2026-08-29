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
          <div>
            ${Car.render(car.color)}
          </div>
        `;
        }).join('')}
      </div>
    `;

    if (CARS.length === 0) {
      DIV.innerHTML = 'No cars';
    }

    await Garage.componentDidMount(CARS, page, limit, TOTAL_COUNT);
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
