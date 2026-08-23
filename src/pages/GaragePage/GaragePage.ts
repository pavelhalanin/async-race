import GarageApi from '../../api/garage/GarageApi';
import { App } from '../../components/App/App';
import { CreateCardForm } from '../../components/CreateCarForm/CreateCarForm';
import { Garage } from '../../components/Garage/Garage';
import { RemoveCardButton } from '../../components/RemoveCarButton/RemoveCarButton';

export const GaragePage = {
  async render(): Promise<void> {
    const NODE_ID = `#${App.idContent}`;
    const DIV = document.querySelector(NODE_ID);
    if (!DIV) {
      console.log(`Node is not found: ${NODE_ID}`);
      return;
    }

    try {
      DIV.innerHTML = 'Loading...';
      const CARS = await GarageApi.get();
      DIV.innerHTML = `
        ${CreateCardForm.render()}
        <div>
          <button id="generate_cars">Generate cars</button>
        </div>
        ${await Garage.render(CARS)}
      `;
      CreateCardForm.init();
      for (const CAR of CARS) {
        RemoveCardButton.init(CAR.id);
      }

      document
        .querySelector(`#generate_cars`)
        ?.addEventListener('click', GarageApi.generageRandom10Cars);
    } catch (error) {
      DIV.innerHTML = `
        <div>${error}</div>
      `;
    }
  },
};
