import { WinnersApi } from '../../api/garage/WinnersApi';
import type { IWinner } from '../../types/winner.dto';

export const Winners = {
  idContent: 'winners_content',
  async render(page: number, limit: number): Promise<void> {
    const NODE_ID = `#${Winners.idContent}`;
    const DIV = document.querySelector(NODE_ID);
    if (!DIV) {
      console.error(`Node is not found: ${NODE_ID}`);
      return;
    }
    DIV.innerHTML = 'Loading...';
    const { WINNERS, TOTAL_COUNT } = await WinnersApi.getPagination(page, limit);

    DIV.innerHTML = `
      <div>Winners (${TOTAL_COUNT})</div> <div>Page #${page}</div>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Number</th>
            <th>Car</th>
            <th>Name</th>
            <th>Wins</th>
            <th>Best time (seconds)</th>
          </tr>
        </thead>
        ${Winners.renderTbody(WINNERS)}
      </table>
    `;
  },
  renderTbody(winners: Array<IWinner>): string {
    return `
      <tbody>
        ${winners.map(winner => {
          return `
            <tr>
              <th>${winner.id}</th>
              <th></th>
              <th></th>
              <th>${winner.wins}</th>
              <th>${winner.time}</th>
            </tr>
          `;
        })}
        ${winners.length === 0 ? `<tr><td colspan="5">Table is empty</td></tr>` : ''}
      </tbody>
    `;
  },
};
