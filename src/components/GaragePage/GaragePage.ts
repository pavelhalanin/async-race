import { App } from '../../components/App/App';
import { CreateCardForm } from './CreateCarForm/CreateCarForm';
import { Garage } from './Garage/Garage';
import { GaragePagination } from './GaragePagination/GaragePagination';
import { UpdateCardForm } from './UpdateCarForm/UpdateCarForm';

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
          ${GaragePage.getHtmlStartRaceButton()}
          ${GaragePage.getHtmlResetRaceButton()}
          ${GaragePage.getHtmlGenerateRandom100CarsButton()}
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
  getHtmlStartRaceButton(): string {
    return `
      <button
        class="btn btn-sm btn-success"
        id="start_race"
      >
        Start race
      </button>
    `;
  },
  getHtmlResetRaceButton(): string {
    return `
      <button
        class="btn btn-sm btn-danger"
        id="reset_race"
      >
        Reset race
      </button>
    `;
  },
  getHtmlGenerateRandom100CarsButton(): string {
    return `
      <button
        class="btn btn-sm btn-primary"
        id="generate_cars"
        title="Generate random 100 cars"
      >
        Generate cars
      </button>
    `;
  },
};
