import GarageApi from '../../api/garage/GarageApi';
import { ENV } from '../../enviroment';
import { GaragePage } from '../../pages/GaragePage/GaragePage';
import { Garage } from '../Garage/Garage';
import { UpdateCardForm } from '../UpdateCarForm/UpdateCarForm';

export const SelectCarButton = {
  idForm: 'select_car_form',
  render(id: number): string {
    return `
      <button
        class="btn btn-sm btn-warning"
        data-select-car-id="${id}"
      >
        Select
      </button>
    `;
  },
  init(id: number): void {
    const SELECTOR = `button[data-select-car-id="${CSS.escape(String(id))}"]`;
    const BUTTON = document.querySelector(SELECTOR);
    if (!BUTTON) {
      console.error(`Node not found: ${SELECTOR}`);
      return;
    }
    BUTTON.addEventListener('click', SelectCarButton.onClick);
  },
  async onClick(event: Event): Promise<void> {
    const BUTTON = event.target as HTMLButtonElement;
    const CAR_ID = Number(BUTTON.dataset.selectCarId as string) || 0;
    UpdateCardForm.setId(CAR_ID);
    const DATA = await GarageApi.getById(CAR_ID);
    UpdateCardForm.setName(DATA.name);
    UpdateCardForm.setColor(DATA.color);
    await GaragePage.render(Garage.getPage(), ENV.limitCars);
  },
};
