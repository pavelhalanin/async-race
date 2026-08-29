import { ENV } from '../../enviroment';
import { GaragePage } from '../../components/GaragePage/GaragePage';
import { WinnersPage } from '../../components/WinnersPage/WinnersPage';
import { Garage } from '../GaragePage/Garage/Garage';
import { Winners } from '../WinnersPage/Winners/Winners';
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
          <button class="btn btn-sm btn-primary" id="garage_render">To garage</button>
          <button class="btn btn-sm btn-primary" id="winner_render">To winners</button>
        </div>
        <div id="${App.idContent}"></div>
      `;

      document
        .querySelector(`#garage_render`)
        ?.addEventListener('click', async () => GaragePage.render(Garage.getPage(), ENV.limitCars));
      document
        .querySelector(`#winner_render`)
        ?.addEventListener('click', () => WinnersPage.render(Winners.getPage(), ENV.limitWinners));

      await GaragePage.render(Garage.getPage(), ENV.limitCars);
    } catch (error) {
      DIV.innerHTML = `
        <div style='color: red;'>
          ${error}
        </div>
      `;
    }
  },
};
