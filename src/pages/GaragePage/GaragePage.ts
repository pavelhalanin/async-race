import { App } from '../../components/App/App';
import { CreateCardForm } from '../../components/CreateCarForm/CreateCarForm';
import { Garage } from '../../components/Garage/Garage';
import { GaragePagination } from '../../components/GaragePagination/GaragePagination';
import { UpdateCardForm } from '../../components/UpdateCarForm/UpdateCarForm';

export const GaragePage = {
  async render(currentPage: number, limit: number): Promise<void> {
    const NODE_ID = `#${App.idContent}`;
    const DIV = document.querySelector(NODE_ID);
    if (!DIV) {
      console.log(`Node is not found: ${NODE_ID}`);
      return;
    }

    try {
      DIV.innerHTML = `
        ${CreateCardForm.render()}
        ${UpdateCardForm.render()}
        <div>
          <button
            class="btn btn-primary"
            id="generate_cars"
            title="Generate random 100 cars"
          >
            Generate cars
          </button>
        </div>
        <div id="${Garage.idGarageContent}"></div>
        <div id="${GaragePagination.idPaginationContainer}"></div>
      `;
      await Garage.render(currentPage, limit);
    } catch (error) {
      DIV.innerHTML = `
        <div>${error}</div>
      `;
    }
  },
};
