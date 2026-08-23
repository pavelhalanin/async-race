import { GaragePage } from '../../pages/GaragePage/GaragePage';
import type { IGarage, IGarageCreate } from '../../types/garage.dto';
import { HtmlColorHelper } from '../../utils/HtmlColorHelper';

const GarageApi = {
  async get(): Promise<Array<IGarage>> {
    const URI = 'http://localhost:3000/garage/';

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
  async generageRandom10Cars(): Promise<void> {
    const D = new Date();
    const HH = String(D.getHours()).padStart(2, '0');
    const MI = String(D.getMinutes()).padStart(2, '0');
    const SS = String(D.getSeconds()).padStart(2, '0');
    const RANDOM_CAR_NAME = `Random car ${HH}${MI}${SS}`;
    for (let index = 1; index <= 10; index++) {
      const CAR: IGarageCreate = {
        name: `${RANDOM_CAR_NAME}-${String(index).padStart(2, '0')}`,
        color: HtmlColorHelper.getRandomColor(),
      };
      await GarageApi.create(CAR);
    }
    await GaragePage.render();
  },
};

export default GarageApi;
