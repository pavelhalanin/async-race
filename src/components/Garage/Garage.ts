import GarageApi from '../../api/garage/GarageApi';
import { Car } from '../Car/Car';
import { CreateCardForm } from '../CreateCarForm/CreateCarForm';
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
    const CARS = await GarageApi.getPagination(page, limit);

    DIV.innerHTML = CARS.map(car => {
      return `
        <div>
          ${RemoveCardButton.render(car.id)}
          ${car.id} ${car.name}
        </div>
        <div>
          ${Car.render(car.color)}
        </div>
      `;
    }).join('');

    if (CARS.length === 0) {
      DIV.innerHTML = 'No cars';
    }

    CreateCardForm.init();
    for (const CAR of CARS) {
      RemoveCardButton.init(CAR.id);
    }

    document
      .querySelector(`#generate_cars`)
      ?.addEventListener('click', GarageApi.generageRandom10Cars);
  },
};
