import GarageApi from '../../../api/garage/GarageApi';
import { WinnersApi } from '../../../api/winners/WinnersApi';
import type { IWinner } from '../../../types/winner.dto';
import { Pagination } from '../../../utils/Pagination';
import { Car } from '../../Car/Car';
import { WinnersPagination } from '../WinnersPagination/WinnersPagination';

export const Winners = {
  idContent: 'winners_content',
  localStoragePage: 'async_race__winners_selected_page',
  async render(page: number, limit: number): Promise<void> {
    const NODE_ID = `#${Winners.idContent}`;
    const DIV = document.querySelector(NODE_ID);
    if (!DIV) {
      console.error(`Node is not found: ${NODE_ID}`);
      return;
    }
    DIV.innerHTML = 'Loading...';
    const { WINNERS, TOTAL_COUNT } = await WinnersApi.getPagination(page, limit);
    Winners.savePage(page);

    DIV.innerHTML = `
      <div>Winners (${TOTAL_COUNT})</div> <div>Page #${page}</div>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th width="100">Number</th>
            <th width="70">Car</th>
            <th>Name</th>
            <th width="100">Wins</th>
            <th width="150">Best time (seconds)</th>
          </tr>
        </thead>
        ${await Winners.renderTbody(WINNERS)}
      </table>
    `;
    await Winners.componentDidMount(page, limit, TOTAL_COUNT);
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
              <td>${winner.id}</td>
              <td>${error}</td>
              <td>${error}</td>
              <td>${winner.wins}</td>
              <td>${winner.time}</td>
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
  fixPage(page: number, limit: number, totalCount: number): void {
    const LAST_PAGE = Pagination.getLastPage(totalCount, limit);
    if (page > LAST_PAGE) {
      Winners.savePage(LAST_PAGE);
      Winners.render(LAST_PAGE, limit);
    }
  },
  async componentDidMount(page: number, limit: number, totalCount: number): Promise<void> {
    await WinnersPagination.render(page, limit, totalCount);
    Winners.fixPage(page, limit, totalCount);
  },
};
