import GarageApi from '../../api/garage/GarageApi';
import { ENV } from '../../enviroment';
import { GaragePage } from '../../pages/GaragePage/GaragePage';

export const RemoveCardButton = {
  idForm: 'create_car_form',
  render(id: number): string {
    return `
      <button class="btn btn-danger" data-car-id="${id}">Remove</button>
    `;
  },
  init(id: number): void {
    const SELECTOR = `button[data-car-id="${CSS.escape(String(id))}"]`;
    const BUTTON = document.querySelector(SELECTOR);
    if (!BUTTON) {
      console.error(`Node not found: ${SELECTOR}`);
      return;
    }
    BUTTON.addEventListener('click', RemoveCardButton.onClickRemoveButton);
  },
  async onClickRemoveButton(event: Event): Promise<void> {
    const BUTTON = event.target as HTMLButtonElement;
    const CAR_ID = Number(BUTTON.dataset.carId as string) || 0;
    console.log(`Remove car with ID: ${CAR_ID}`);
    await GarageApi.remove(CAR_ID);
    await GaragePage.render(1, ENV.limit);
  },
};
