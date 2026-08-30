import GarageApi from '../../../api/garage/GarageApi';
import { WinnersApi } from '../../../api/winners/WinnersApi';
import type { IWinner } from '../../../types/winner.dto';
import { Pagination } from '../../../utils/Pagination';
import { Car } from '../../Car/Car';
import { WinnersPage } from '../WinnersPage';
import { WinnersPagination } from '../WinnersPagination/WinnersPagination';
import './Winners.css';

export const Winners = {
  idContent: 'winners_content',
  localStoragePage: 'async_race__winners_selected_page',
  async render(page: number, limit: number, type: number): Promise<void> {
    const NODE_ID = `#${Winners.idContent}`;
    const DIV = document.querySelector(NODE_ID);
    if (!DIV) {
      console.info(`Node is not found: ${NODE_ID}`);
      return;
    }
    DIV.innerHTML = 'Loading...';
    const { WINNERS, TOTAL_COUNT } = await WinnersApi.getPagination(page, limit, type);
    Winners.savePage(page);

    DIV.innerHTML = await Winners._render_getHtml(TOTAL_COUNT, WINNERS, page, type);
    await Winners.componentDidMount(page, limit, TOTAL_COUNT, type);
  },
  async _render_getHtml(
    TOTAL_COUNT: number,
    WINNERS: Array<IWinner>,
    page: number,
    type: number
  ): Promise<string> {
    return `
      <div class="winners__table_container scroll">
        <div>Winners (${TOTAL_COUNT})</div>
        <div>Page #${page}</div>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th width="120" class="winners__th">
                Number
                ${Winners.getSortButton(0, type, WinnersApi.paginationTypeSort.idDesc, 'winners_sort_id_desc_button')}
                ${Winners.getSortButton(1, type, WinnersApi.paginationTypeSort.idAsc, 'winners_sort_id_asc_button')}
              </th>
              <th width="70">Car</th>
              <th>Name</th>
              <th width="100" class="winners__th">
                Wins
                ${Winners.getSortButton(0, type, WinnersApi.paginationTypeSort.winsDesc, 'winners_sort_wins_desc_button')}
                ${Winners.getSortButton(1, type, WinnersApi.paginationTypeSort.winsAsc, 'winners_sort_wins_asc_button')}
              </th>
              <th width="200" class="winners__th">
                Best time (seconds)
                ${Winners.getSortButton(0, type, WinnersApi.paginationTypeSort.timeDesc, 'winners_sort_time_desc_button')}
                ${Winners.getSortButton(1, type, WinnersApi.paginationTypeSort.timeAsc, 'winners_sort_time_asc_button')}
              </th>
            </tr>
          </thead>
          ${await Winners.renderTbody(WINNERS)}
        </table>
      </div>
    `;
  },
  getSortButton(topType: number, type1: number, type2: number, id: string): string {
    return `
      <button
        class="btn btn-sm btn-primary ${topType == 0 ? 'winners__button_top' : 'winners__button_bottom'}"
        id="${id}"
        ${type1 == type2 ? 'disabled' : ''}
      >
        ${topType == 0 ? '↑' : '↓'}
      </button>
    `;
  },
  async renderTbody(winners: Array<IWinner>): Promise<string> {
    const rows = await Promise.all(
      winners.map(async winner => {
        try {
          const CAR = await GarageApi.getById(winner.id);
          return `
            <tr>
              <td align="right">${winner.id}</td>
              <td align="center">${Car.render(CAR.color)}</td>
              <td>${CAR.name}</td>
              <td align="right">${winner.wins}</td>
              <td align="right">${winner.time}</td>
            </tr>
          `;
        } catch (error) {
          return `
            <tr>
              <td align="right">${winner.id}</td>
              <td>${error}</td>
              <td>${error}</td>
              <td align="right">${winner.wins}</td>
              <td align="right">${winner.time}</td>
            </tr>
          `;
        }
      })
    );

    return `
      <tbody>
        ${rows.join('')}
        ${winners.length === 0 ? `<tr><td colspan="5">Table is empty</td></tr>` : ''}
      </tbody>
    `;
  },
  getPage(): number {
    return Number(localStorage.getItem(Winners.localStoragePage) || 1) || 1;
  },
  savePage(page: number): void {
    localStorage.setItem(Winners.localStoragePage, String(page));
  },
  fixPage(page: number, limit: number, totalCount: number, type: number): void {
    const LAST_PAGE = Pagination.getLastPage(totalCount, limit);
    if (page > LAST_PAGE) {
      Winners.savePage(LAST_PAGE);
      Winners.render(LAST_PAGE, limit, type);
    }
  },
  async componentDidMount(
    page: number,
    limit: number,
    totalCount: number,
    type: number
  ): Promise<void> {
    await WinnersPagination.render(page, limit, totalCount);
    Winners.fixPage(page, limit, totalCount, type);

    document
      .querySelector('#winners_sort_id_asc_button')
      ?.addEventListener('click', () =>
        WinnersPage.render(page, limit, WinnersApi.paginationTypeSort.idAsc)
      );

    document
      .querySelector('#winners_sort_id_desc_button')
      ?.addEventListener('click', () =>
        WinnersPage.render(page, limit, WinnersApi.paginationTypeSort.idDesc)
      );

    document
      .querySelector('#winners_sort_wins_asc_button')
      ?.addEventListener('click', () =>
        WinnersPage.render(page, limit, WinnersApi.paginationTypeSort.winsAsc)
      );

    document
      .querySelector('#winners_sort_wins_desc_button')
      ?.addEventListener('click', () =>
        WinnersPage.render(page, limit, WinnersApi.paginationTypeSort.winsDesc)
      );

    document
      .querySelector('#winners_sort_time_asc_button')
      ?.addEventListener('click', () =>
        WinnersPage.render(page, limit, WinnersApi.paginationTypeSort.timeAsc)
      );

    document
      .querySelector('#winners_sort_time_desc_button')
      ?.addEventListener('click', () =>
        WinnersPage.render(page, limit, WinnersApi.paginationTypeSort.timeDesc)
      );
  },
};
