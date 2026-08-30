import { ENV } from '../../../enviroment';
import { GaragePage } from '../GaragePage';
import { Pagination } from '../../../utils/Pagination';
import './GaragePagination.css';

export const GaragePagination = {
  idPaginationContainer: 'garage_pagination',
  async render(currentPage: number, limit: number, totalCount: number): Promise<void> {
    const NODE_ID = `#${GaragePagination.idPaginationContainer}`;
    const DIV = document.querySelector(NODE_ID);
    if (!DIV) {
      console.info(`Node is not found: ${NODE_ID}`);
      return;
    }

    DIV.innerHTML = 'Loading...';

    const LAST_PAGE = Pagination.getLastPage(totalCount, limit);

    let html = `
      <button class="btn btn-primary" id="pagination_prev_button" ${currentPage <= 1 ? 'disabled' : ''}>Prev</button>
      <select id="pagination_select" class="btn">
        ${Array.from({ length: LAST_PAGE }, (_, index) => {
          const PAGE = index + 1;
          return `<option value="${PAGE}" ${PAGE === currentPage ? 'selected' : ''}>${PAGE}</option>`;
        }).join('')}
      </select>
      <button class="btn btn-primary" id="pagination_next_button" ${currentPage >= LAST_PAGE ? 'disabled' : ''}>Next</button>
    `;

    DIV.innerHTML = html;

    document
      .querySelector('#pagination_prev_button')
      ?.addEventListener(
        'click',
        async () => await GaragePage.render(currentPage - 1, ENV.limitCars)
      );

    document
      .querySelector('#pagination_next_button')
      ?.addEventListener(
        'click',
        async () => await GaragePage.render(currentPage + 1, ENV.limitCars)
      );

    document.querySelector('#pagination_select')?.addEventListener('change', async event => {
      const TARGET = event.target;
      if (TARGET instanceof HTMLSelectElement) {
        const selectedPage = parseInt(TARGET.value);
        await GaragePage.render(selectedPage, ENV.limitCars);
      }
    });
  },
};
