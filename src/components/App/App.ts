import { ENV } from '../../enviroment';
import { GaragePage } from '../../pages/GaragePage/GaragePage';
import { WinnersPage } from '../../pages/WinnersPage/WinnersPage';
import './App.css';

export const App = {
  idRoot: 'app',
  idContent: 'content',
  async render(): Promise<void> {
    const NODE_ID = `#${App.idRoot}`;
    const DIV = document.querySelector(NODE_ID);
    if (!DIV) {
      console.error(`Node is not found: ${NODE_ID}`);
      return;
    }

    try {
      DIV.innerHTML = `
        <div>
          <button class="btn btn-primary" id="garage_render">To garage</button>
          <button class="btn btn-primary" id="winner_render">To winners</button>
        </div>
        <div id="${App.idContent}"></div>
      `;

      document
        .querySelector(`#garage_render`)
        ?.addEventListener('click', async () => GaragePage.render(1, ENV.limit));
      document.querySelector(`#winner_render`)?.addEventListener('click', WinnersPage.render);

      await GaragePage.render(1, ENV.limit);
    } catch (error) {
      DIV.innerHTML = `
        <div style='color: red;'>
          ${error}
        </div>
      `;
    }
  },
};
