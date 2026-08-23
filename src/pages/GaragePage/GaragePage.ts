import { App } from '../../components/App/App';
import { CreateCardForm } from '../../components/CreateCarForm/CreateCarForm';
import { Garage } from '../../components/Garage/Garage';
import { GaragePagination } from '../../components/GaragePagination/GaragePagination';

export const GaragePage = {
  async render(): Promise<void> {
    const NODE_ID = `#${App.idContent}`;
    const DIV = document.querySelector(NODE_ID);
    if (!DIV) {
      console.log(`Node is not found: ${NODE_ID}`);
      return;
    }

    try {
      DIV.innerHTML = `
        ${CreateCardForm.render()}
        <div>
          <button id="generate_cars">Generate cars</button>
        </div>
        <div id="${Garage.idGarageContent}"></div>
        <div id="${GaragePagination.idPaginationContainer}"></div>
      `;
      const LIMIT = 5;
      await Garage.render(1, LIMIT);
      GaragePagination.render(LIMIT);
    } catch (error) {
      DIV.innerHTML = `
        <div>${error}</div>
      `;
    }
  },
};
