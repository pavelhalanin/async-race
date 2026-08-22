import GarageApi from '../../api/garage/GarageApi';

const Garage = {
  async render(): Promise<string> {
    const GARAGE = await GarageApi.get();

    return GARAGE.map(car => {
      return `<div style="color: ${car.color};">${car.id} ${car.name}</div>`;
    }).join('');
  },
};

export default Garage;
