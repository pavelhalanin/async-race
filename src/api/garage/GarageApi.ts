import type { IGarage } from '../../types/garage.dto';

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
};

export default GarageApi;
