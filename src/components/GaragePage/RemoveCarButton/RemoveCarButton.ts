import GarageApi from '../../../api/garage/GarageApi';
import { WinnersApi } from '../../../api/winners/WinnersApi';
import { ENV } from '../../../enviroment';
import { GaragePage } from '../GaragePage';
import { Garage } from '../Garage/Garage';

export const RemoveCarButton = {
  idForm: 'create_car_form',
  render(id: number): string {
    return `
      <button
        class="btn btn-sm btn-danger"
        data-car-id="${id}"
      >
        Remove
      </button>
    `;
  },
  init(id: number): void {
    const SELECTOR = `button[data-car-id="${CSS.escape(String(id))}"]`;
    const BUTTON = document.querySelector(SELECTOR);
    if (!BUTTON) {
      console.error(`Node not found: ${SELECTOR}`);
      return;
    }
    BUTTON.addEventListener('click', RemoveCarButton.onClick);
  },
  async onClick(event: Event): Promise<void> {
    const BUTTON = event.target;
    if (!(BUTTON instanceof HTMLButtonElement)) {
      return;
    }

    const CAR_ID = Number(BUTTON.dataset.carId) || 0;
    console.log(`Remove car with ID: ${CAR_ID}`);
    await GarageApi.remove(CAR_ID);
    await WinnersApi.remove(CAR_ID);
    await GaragePage.render(Garage.getPage(), ENV.limitCars);
  },
};
