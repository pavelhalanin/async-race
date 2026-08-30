import { WinnersPage } from '../../WinnersPage/WinnersPage';
import { Pagination } from '../../../utils/Pagination';

export const WinnersPagination = {
  idContainer: 'winners_pagination',
  async render(currentPage: number, limit: number, totalCount: number): Promise<void> {
    const NODE_ID = `#${WinnersPagination.idContainer}`;
    const DIV = document.querySelector(NODE_ID);
    if (!DIV) {
      console.info(`Node is not found: ${NODE_ID}`);
      return;
    }

    DIV.innerHTML = 'Loading...';

    const LAST_PAGE = Pagination.getLastPage(totalCount, limit);

    let html = `
      <button class="btn btn-primary" id="pagination_prev_button" ${currentPage <= 1 ? 'disabled' : ''}>Prev</button>
      <button class="btn btn-primary" id="pagination_next_button" ${currentPage >= LAST_PAGE ? 'disabled' : ''}>Next</button>
      Page:
      <select id="pagination_select" class="btn" style="border-color: var(--primary-border-color);">
        ${Array.from({ length: LAST_PAGE }, (_, index) => {
          const PAGE = index + 1;
          return `<option value="${PAGE}" ${PAGE === currentPage ? 'selected' : ''}>${PAGE}</option>`;
        }).join('')}
      </select>
      <span>Limit: ${limit}</span>
    `;

    DIV.innerHTML = html;

    WinnersPagination.addListenerPrevButton(currentPage, limit);
    WinnersPagination.addListenerNextButton(currentPage, limit);
    WinnersPagination.addListenerSelect(limit);
  },
  addListenerPrevButton(currentPage: number, limit: number): void {
    document
      .querySelector('#pagination_prev_button')
      ?.addEventListener('click', async () => await WinnersPage.render(currentPage - 1, limit));
  },
  addListenerNextButton(currentPage: number, limit: number): void {
    document
      .querySelector('#pagination_next_button')
      ?.addEventListener('click', async () => await WinnersPage.render(currentPage + 1, limit));
  },
  addListenerSelect(limit: number): void {
    document.querySelector('#pagination_select')?.addEventListener('change', async event => {
      const TARGET = event.target;
      if (TARGET instanceof HTMLSelectElement) {
        const selectedPage = parseInt(TARGET.value);
        await WinnersPage.render(selectedPage, limit);
      }
    });
  },
};
