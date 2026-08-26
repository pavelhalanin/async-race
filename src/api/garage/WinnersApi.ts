import type { IGarage } from '../../types/garage.dto';
import type { IWinner, IWinnerUpdate } from '../../types/winner.dto';

export const WinnersApi = {
  async getPagination(
    page: number,
    limit: number
  ): Promise<{
    WINNERS: Array<IWinner>;
    TOTAL_COUNT: number;
  }> {
    const URI = `http://localhost:3000/winners/?_page=${page}&_limit=${limit}`;

    const RESPONSE = await fetch(URI);

    const HTTP_STATUS = RESPONSE.status;
    if (HTTP_STATUS !== 200) {
      throw new Error(`HTTP ${HTTP_STATUS}`);
    }

    const WINNERS = await RESPONSE.json();
    const TOTAL_COUNT: number = Number(RESPONSE.headers.get('x-total-count'));
    return { WINNERS, TOTAL_COUNT };
  },
  async getById(id: number): Promise<IWinner> {
    const URI = `http://localhost:3000/winners/${id}`;

    const RESPONSE = await fetch(URI);

    const HTTP_STATUS = RESPONSE.status;
    if (HTTP_STATUS !== 200) {
      throw new Error(`HTTP ${HTTP_STATUS}`);
    }

    const DATA = await RESPONSE.json();
    return DATA;
  },
  async create(winner: IWinner): Promise<Array<IWinner>> {
    const URI = 'http://localhost:3000/garage/';

    const RESPONSE = await fetch(URI, {
      method: 'POST',
      body: JSON.stringify(winner),
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
    const URI = `http://localhost:3000/winners/${id}`;

    const RESPONSE = await fetch(URI, {
      method: 'DELETE',
    });

    const HTTP_STATUS = RESPONSE.status;
    if (HTTP_STATUS !== 200) {
      throw new Error(`HTTP ${HTTP_STATUS}`);
    }
  },
  async update(winner: IWinnerUpdate, id: number): Promise<IGarage> {
    const URI = `http://localhost:3000/garage/${id}`;

    const RESPONSE = await fetch(URI, {
      method: 'PUT',
      body: JSON.stringify(winner),
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
};
