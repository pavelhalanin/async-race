import GarageApi from '../../api/garage/GarageApi';
import { Car } from '../Car/Car';
import { CreateCardForm } from '../CreateCarForm/CreateCarForm';
import { GaragePagination } from '../GaragePagination/GaragePagination';
import { RemoveCardButton } from '../RemoveCarButton/RemoveCarButton';
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
      <div>Garage (${TOTAL_COUNT})</div>
      <div>Page #${page}</div>
      ${CARS.map(car => {
        return `
        <div>
          ${RemoveCardButton.render(car.id)}
          ${car.id} ${car.name}
        </div>
        <div>
          ${Car.render(car.color)}
        </div>
      `;
      }).join('')}
    `;

    if (CARS.length === 0) {
      DIV.innerHTML = 'No cars';
    }

    CreateCardForm.init();
    for (const CAR of CARS) {
      RemoveCardButton.init(CAR.id);
    }

    document
      .querySelector(`#generate_cars`)
      ?.addEventListener('click', GarageApi.generageRandom100Cars);

    await GaragePagination.render(page, limit, TOTAL_COUNT);
  },
};
