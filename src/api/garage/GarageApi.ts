import { Garage } from '../../components/GaragePage/Garage/Garage';
import { ENV } from '../../enviroment';
import { GaragePage } from '../../components/GaragePage/GaragePage';
import type { ICarExamples, IGarage, IGarageCreate } from '../../types/garage.dto';
import { HtmlColorHelper } from '../../utils/HtmlColorHelper';
import { Random } from '../../utils/Radnom';
import JSON_CAR_EXAMPLES from './../cars/cars.json';

const GarageApi = {
  async getPagination(
    page: number,
    limit: number
  ): Promise<{
    CARS: Array<IGarage>;
    TOTAL_COUNT: number;
  }> {
    const URI = `http://localhost:3000/garage/?_page=${page}&_limit=${limit}`;

    const RESPONSE = await fetch(URI);

    const HTTP_STATUS = RESPONSE.status;
    if (HTTP_STATUS !== 200) {
      throw new Error(`HTTP ${HTTP_STATUS}`);
    }

    const CARS = await RESPONSE.json();
    const TOTAL_COUNT: number = Number(RESPONSE.headers.get('x-total-count'));
    return { CARS, TOTAL_COUNT };
  },
  async getById(id: number): Promise<IGarage> {
    const URI = `http://localhost:3000/garage/${id}`;

    const RESPONSE = await fetch(URI);

    const HTTP_STATUS = RESPONSE.status;
    if (HTTP_STATUS !== 200) {
      throw new Error(`HTTP ${HTTP_STATUS}`);
    }

    const DATA = await RESPONSE.json();
    return DATA;
  },
  async create(car: IGarageCreate): Promise<Array<IGarage>> {
    const URI = 'http://localhost:3000/garage/';

    const RESPONSE = await fetch(URI, {
      method: 'POST',
      body: JSON.stringify(car),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const HTTP_STATUS = RESPONSE.status;
    if (HTTP_STATUS !== 201) {
      throw new Error(`HTTP ${HTTP_STATUS}`);
    }

    const DATA = await RESPONSE.json();
    return DATA;
  },
  async remove(id: number): Promise<void> {
    const URI = `http://localhost:3000/garage/${id}`;

    const RESPONSE = await fetch(URI, {
      method: 'DELETE',
    });

    const HTTP_STATUS = RESPONSE.status;
    if (HTTP_STATUS !== 200) {
      throw new Error(`HTTP ${HTTP_STATUS}`);
    }
  },
  async update(car: IGarageCreate, id: number): Promise<IGarage> {
    const URI = `http://localhost:3000/garage/${id}`;

    const RESPONSE = await fetch(URI, {
      method: 'PUT',
      body: JSON.stringify(car),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const HTTP_STATUS = RESPONSE.status;
    if (HTTP_STATUS !== 200) {
      throw new Error(`HTTP ${HTTP_STATUS}`);
    }

    const DATA = await RESPONSE.json();
    return DATA;
  },
  async generageRandom100Cars(this: HTMLButtonElement): Promise<void> {
    this.setAttribute('disabled', 'true');
    this.innerHTML = 'Generate cars (loading...)';

    const CAR_EXAMPLES: ICarExamples<string> = JSON_CAR_EXAMPLES;
    const FIRST_PARTS = Object.keys(CAR_EXAMPLES);
    for (let index = 1; index <= 100; index++) {
      const FIRST_INDEX = Random.random_from_a_to_b(0, FIRST_PARTS.length - 1);
      const FIRST_PART = FIRST_PARTS[FIRST_INDEX];
      const SECOND_PARTS = CAR_EXAMPLES[FIRST_PART];
      const SECOND_INDEX = Random.random_from_a_to_b(0, SECOND_PARTS.length - 1);
      const SECOND_PART = SECOND_PARTS[SECOND_INDEX];
      const CAR: IGarageCreate = {
        name: `${FIRST_PART}-${SECOND_PART}`,
        color: HtmlColorHelper.getRandomColor(),
      };
      await GarageApi.create(CAR);
    }
    await GaragePage.render(Garage.getPage(), ENV.limitCars);

    this.removeAttribute('disabled');
    this.innerHTML = 'Generate cars';
  },
};

export default GarageApi;
