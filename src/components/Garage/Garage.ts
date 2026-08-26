import GarageApi from '../../api/garage/GarageApi';
import { Car } from '../Car/Car';
import { CreateCardForm } from '../CreateCarForm/CreateCarForm';
import { GaragePagination } from '../GaragePagination/GaragePagination';
import { RemoveCarButton } from '../RemoveCarButton/RemoveCarButton';
import { SelectCarButton } from '../SelectCarButton/SelectCarButton';
import { UpdateCardForm } from '../UpdateCarForm/UpdateCarForm';
import './Garage.css';

export const Garage = {
  idGarageContent: 'garage_content',
  async render(page: number, limit: number): Promise<void> {
    const NODE_ID = `#${Garage.idGarageContent}`;
    const DIV = document.querySelector(NODE_ID);
    if (!DIV) {
      console.error(`Node is not found: ${NODE_ID}`);
      return;
    }
    DIV.innerHTML = 'Loading...';
    const { CARS, TOTAL_COUNT } = await GarageApi.getPagination(page, limit);

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

    CreateCardForm.init();
    UpdateCardForm.init();
    for (const CAR of CARS) {
      SelectCarButton.init(CAR.id);
      RemoveCarButton.init(CAR.id);
    }

    document
      .querySelector(`#generate_cars`)
      ?.addEventListener('click', GarageApi.generageRandom100Cars);

    await GaragePagination.render(page, limit, TOTAL_COUNT);
  },
};
