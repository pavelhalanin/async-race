import GarageApi from '../../api/garage/GarageApi';
import { ENV } from '../../enviroment';
import { GaragePage } from '../../pages/GaragePage/GaragePage';
import type { IGarageCreate } from '../../types/garage.dto';
import { Garage } from '../Garage/Garage';
import './CreateCarForm.css';

export const CreateCardForm = {
  idForm: 'create_car_form',
  render(): string {
    return `
      <form id="${CreateCardForm.idForm}">
        <label
          for="${CreateCardForm.idForm}_create_car_name"
        >
          Name:
        </label>
        <input
          id="${CreateCardForm.idForm}_create_car_name"
          type="text"
          name="name"
        >
        <label
          for="${CreateCardForm.idForm}_create_car_color"
        >
          Color:
        </label>
        <input
          id="${CreateCardForm.idForm}_create_car_color"  
          type="color"
          name="color"
        >
        <button
          class="btn btn-sm btn-success"
        >
          Create
        </button>
      </form>
    `;
  },
  init(): void {
    const FORM = document.querySelector(`#${CreateCardForm.idForm}`);
    if (!FORM) {
      console.error(`Node not found: #${CreateCardForm.idForm}`);
      return;
    }
    FORM.addEventListener('submit', CreateCardForm.onSubmit);
  },
  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const CAR: IGarageCreate = {
      name: (formData.get('name') as string) || 'Unnamed car',
      color: (formData.get('color') as string) || '#000000',
    };

    console.log('Try to create car', CAR);
    const CREATED_CAR = await GarageApi.create(CAR);
    console.log('Created car', CREATED_CAR);
    await GaragePage.render(Garage.getPage(), ENV.limit);
  },
};
