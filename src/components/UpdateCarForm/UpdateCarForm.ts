import GarageApi from '../../api/garage/GarageApi';
import { ENV } from '../../enviroment';
import { GaragePage } from '../../pages/GaragePage/GaragePage';
import type { IGarage, IGarageCreate } from '../../types/garage.dto';

export const UpdateCardForm = {
  idForm: 'update_car_form',
  localStorageKey: 'async_race__update_data',
  idNameInput: 'update_car__name_input',
  idColorInput: 'update_car__color_input',
  render(): string {
    const DATA = UpdateCardForm.getUpdateData();
    return `
      <form id="${UpdateCardForm.idForm}">
        <label
          for="${UpdateCardForm.idNameInput}"
        >
          Name:
        </label>
        <input
          id="${UpdateCardForm.idNameInput}"
          type="text"
          name="name"
          value="${DATA.name}"
        >
        <label
          for="${UpdateCardForm.idColorInput}"
        >
          Color:
        </label>
        <input
          id="${UpdateCardForm.idColorInput}"
          type="color"
          name="color"
          value="${DATA.color}"
        >
        <button
          class="btn btn-sm btn-success"
        >
          Update
        </button>
        <input
          type="hidden"
          name="id"
          value="${DATA.id}"
        >
      </form>
    `;
  },
  init(): void {
    const FORM = document.querySelector(`#${UpdateCardForm.idForm}`);
    if (!FORM) {
      console.error(`Node not found: #${UpdateCardForm.idForm}`);
      return;
    }
    FORM.addEventListener('submit', UpdateCardForm.onSubmit);

    const NAME_INPUT = document.querySelector(`#${UpdateCardForm.idNameInput}`);
    if (!NAME_INPUT) {
      console.error(`Node not found: #${UpdateCardForm.idNameInput}`);
      return;
    }
    NAME_INPUT.addEventListener('input', function (this: HTMLInputElement) {
      UpdateCardForm.setName(this.value);
    });

    const COLOR_INPUT = document.querySelector(`#${UpdateCardForm.idColorInput}`);
    if (!COLOR_INPUT) {
      console.error(`Node not found: #${UpdateCardForm.idColorInput}`);
      return;
    }
    COLOR_INPUT.addEventListener('input', function (this: HTMLInputElement) {
      UpdateCardForm.setColor(this.value);
    });
  },
  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const CAR: IGarageCreate = {
      name: (formData.get('name') as string) || 'Unnamed car',
      color: (formData.get('color') as string) || '#000000',
    };

    console.log('Try to update car', CAR);
    const DATA = UpdateCardForm.getUpdateData();
    const UPDATED_CAR = await GarageApi.update(CAR, DATA.id);
    console.log('Updated car', UPDATED_CAR);
    await GaragePage.render(1, ENV.limit);
  },
  getUpdateData(): IGarage {
    const STRING_DATA: string | null = localStorage.getItem(UpdateCardForm.localStorageKey);
    let object: IGarage = { id: 0, name: '', color: '' };

    if (STRING_DATA) {
      try {
        const DATA: unknown = JSON.parse(STRING_DATA);

        if (
          DATA !== null &&
          typeof DATA === 'object' &&
          'id' in DATA &&
          typeof DATA.id === 'number'
        ) {
          object.id = DATA.id;
        }

        if (
          DATA !== null &&
          typeof DATA === 'object' &&
          'name' in DATA &&
          typeof DATA.name === 'string'
        ) {
          object.name = DATA.name;
        }

        if (
          DATA !== null &&
          typeof DATA === 'object' &&
          'color' in DATA &&
          typeof DATA.color === 'string'
        ) {
          object.color = DATA.color;
        }
      } catch (error) {
        console.error(error);
      }
    }

    localStorage.setItem(UpdateCardForm.localStorageKey, JSON.stringify(object));

    return object;
  },
  setId(id: number): void {
    const DATA = UpdateCardForm.getUpdateData();
    DATA.id = id;
    localStorage.setItem(UpdateCardForm.localStorageKey, JSON.stringify(DATA));
  },
  setName(name: string): void {
    const DATA = UpdateCardForm.getUpdateData();
    DATA.name = name;
    localStorage.setItem(UpdateCardForm.localStorageKey, JSON.stringify(DATA));
  },
  setColor(color: string): void {
    const DATA = UpdateCardForm.getUpdateData();
    DATA.color = color;
    localStorage.setItem(UpdateCardForm.localStorageKey, JSON.stringify(DATA));
  },
};
