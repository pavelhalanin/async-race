import { App } from '../../components/App/App';
import { Winners } from '../../components/WinnersPage/Winners/Winners';
import { WinnersPagination } from './WinnersPagination/WinnersPagination';

export const WinnersPage = {
  async render(selectedPage: number, limit: number): Promise<void> {
    const NODE_ID = `#${App.idContent}`;
    const DIV = document.querySelector(NODE_ID);
    if (!DIV) {
      console.log(`Node is not found: ${NODE_ID}`);
      return;
    }

    try {
      DIV.innerHTML = `
        <div id="${Winners.idContent}"></div>
        <div id="${WinnersPagination.idContainer}"></div>
      `;
      await Winners.render(selectedPage, limit);
    } catch (error) {
      DIV.innerHTML = `
        <div>${error}</div>
      `;
    }
  },
};
