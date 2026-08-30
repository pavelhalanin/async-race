import type { IGarage } from '../../types/garage.dto';
import type { IWinner, IWinnerUpdate } from '../../types/winner.dto';

export const WinnersApi = {
  paginationTypeSort: Object.freeze({
    noSort: 0,
    idAsc: 1,
    idDesc: 2,
    winsAsc: 3,
    winsDesc: 4,
    timeAsc: 5,
    timeDesc: 6,
  }),
  async getPagination(
    page: number,
    limit: number,
    type: number = 0
  ): Promise<{
    WINNERS: Array<IWinner>;
    TOTAL_COUNT: number;
  }> {
    let uri = `http://localhost:3000/winners/?_page=${page}&_limit=${limit}`;

    const sortMap: Record<number, { sort: string; order: string } | null> = {
      [WinnersApi.paginationTypeSort.idAsc]: { sort: 'id', order: 'ASC' },
      [WinnersApi.paginationTypeSort.idDesc]: { sort: 'id', order: 'DESC' },
      [WinnersApi.paginationTypeSort.winsAsc]: { sort: 'wins', order: 'ASC' },
      [WinnersApi.paginationTypeSort.winsDesc]: { sort: 'wins', order: 'DESC' },
      [WinnersApi.paginationTypeSort.timeAsc]: { sort: 'time', order: 'ASC' },
      [WinnersApi.paginationTypeSort.timeDesc]: { sort: 'time', order: 'DESC' },
    };

    const sortConfig = sortMap[type];
    if (sortConfig) {
      uri += `&_sort=${sortConfig.sort}&_order=${sortConfig.order}`;
    }

    const RESPONSE = await fetch(uri);

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
    const URI = 'http://localhost:3000/winners/';

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
    const URI = `http://localhost:3000/winners/${id}`;

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
