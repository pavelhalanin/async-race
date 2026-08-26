import { App } from '../../components/App/App';
import { Winners } from '../../components/Winners/Winners';
import { ENV } from '../../enviroment';

export const WinnersPage = {
  async render(): Promise<void> {
    const NODE_ID = `#${App.idContent}`;
    const DIV = document.querySelector(NODE_ID);
    if (!DIV) {
      console.log(`Node is not found: ${NODE_ID}`);
      return;
    }

    try {
      DIV.innerHTML = `<div id="${Winners.idContent}"></div>`;
      await Winners.render(1, ENV.limit);
    } catch (error) {
      DIV.innerHTML = `
        <div>${error}</div>
      `;
    }
  },
};
