import GarageApi from '../../api/garage/GarageApi';
import Car from '../Car/Car';

const Garage = {
  async render(): Promise<string> {
    const GARAGE = await GarageApi.get();

    return GARAGE.map(car => {
      return `
        <div>
          ${car.id} ${car.name}
        </div>
        <div>
          ${Car.render(car.color)}
        </div>
      `;
    }).join('');
  },
};

export default Garage;
