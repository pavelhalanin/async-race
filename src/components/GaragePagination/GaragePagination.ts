import GarageApi from '../../api/garage/GarageApi';
import { GaragePage } from '../../pages/GaragePage/GaragePage';
import { Pagination } from '../../utils/Pagination';
import './GaragePagination.css';

export const GaragePagination = {
  idPaginationContainer: 'garage_pagination',
  async render(currentPage: number, limit: number): Promise<void> {
    const NODE_ID = `#${GaragePagination.idPaginationContainer}`;
    const DIV = document.querySelector(NODE_ID);
    if (!DIV) {
      console.error(`Node is not found: ${NODE_ID}`);
      return;
    }

    DIV.innerHTML = 'Loading...';

    const TOTAL_COUNT = await GarageApi.getCount();
    const LAST_PAGE = Pagination.getLastPage(TOTAL_COUNT, limit);

    let html = '<div class="pagination__content">';
    for (let page = 1; page <= LAST_PAGE; page++) {
      html += `<button data-page="${page}" class="${currentPage == page ? '--current' : ''}">${page}</button>`;
    }
    html += '</div>';

    DIV.innerHTML = html;

    for (let page = 1; page <= LAST_PAGE; page++) {
      const SELECTOR = `${NODE_ID} button[data-page="${CSS.escape(String(page))}"]`;
      const BUTTON = document.querySelector(SELECTOR);
      BUTTON?.addEventListener('click', async () => await GaragePage.render(page, 5));
    }
  },
};
