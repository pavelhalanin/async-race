import type { IGarage } from '../../types/garage.dto';
import Car from '../Car/Car';
import RemoveCardButton from '../RemoveCarButton/RemoveCarButton';

const Garage = {
  async render(cars: Array<IGarage>): Promise<string> {
    return cars
      .map(car => {
        return `
        <div>
          ${RemoveCardButton.render(car.id)}
          ${car.id} ${car.name}
        </div>
        <div>
          ${Car.render(car.color)}
        </div>
      `;
      })
      .join('');
  },
};

export default Garage;
