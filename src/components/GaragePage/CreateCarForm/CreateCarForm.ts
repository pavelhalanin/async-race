import GarageApi from '../../../api/garage/GarageApi';
import { ENV } from '../../../enviroment';
import { GaragePage } from '../../GaragePage/GaragePage';
import type { IGarageCreate } from '../../../types/garage.dto';
import { Garage } from '../Garage/Garage';
import './CreateCarForm.css';

export const CreateCardForm = {
  idForm: 'create_car_form',
  localStorageKey: 'async_race__car_create_data',
  idNameInput: 'create_car__name_input',
  idColorInput: 'create_car__color_input',
  render(): string {
    const DATA = CreateCardForm.getCreateData();
    return `
      <form id="${CreateCardForm.idForm}">
        <label
          for="${CreateCardForm.idNameInput}"
        >
          Name:
        </label>
        <input
          id="${CreateCardForm.idNameInput}"
          type="text"
          name="name"
          value="${DATA.name}"
        >
        <label
          for="${CreateCardForm.idColorInput}"
        >
          Color:
        </label>
        <input
          id="${CreateCardForm.idColorInput}"  
          type="color"
          name="color"
          value="${DATA.color}"
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
      console.info(`Node not found: #${CreateCardForm.idForm}`);
      return;
    }
    FORM.addEventListener('submit', CreateCardForm.onSubmit);

    const NAME_INPUT = document.querySelector(`#${CreateCardForm.idNameInput}`);
    if (!NAME_INPUT) {
      console.info(`Node not found: #${CreateCardForm.idNameInput}`);
      return;
    }
    NAME_INPUT.addEventListener('input', function (this: HTMLInputElement) {
      CreateCardForm.setName(this.value);
    });

    const COLOR_INPUT = document.querySelector(`#${CreateCardForm.idColorInput}`);
    if (!COLOR_INPUT) {
      console.info(`Node not found: #${CreateCardForm.idColorInput}`);
      return;
    }
    COLOR_INPUT.addEventListener('input', function (this: HTMLInputElement) {
      CreateCardForm.setColor(this.value);
    });
  },
  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();

    const FORM = event.target;
    if (!(FORM instanceof HTMLFormElement)) {
      return;
    }

    const FORM_DATA = new FormData(FORM);

    const CAR: IGarageCreate = {
      name: FORM_DATA.get('name')?.toString() || 'Unnamed car',
      color: FORM_DATA.get('color')?.toString() || '#000000',
    };

    console.log('Try to create car', CAR);
    const CREATED_CAR = await GarageApi.create(CAR);
    console.log('Created car', CREATED_CAR);
    await GaragePage.render(Garage.getPage(), ENV.limitCars);
  },
  getCreateData(): IGarageCreate {
    const STRING_DATA: string | null = localStorage.getItem(CreateCardForm.localStorageKey);
    let object: IGarageCreate = { name: '', color: '' };

    if (STRING_DATA) {
      try {
        const DATA: unknown = JSON.parse(STRING_DATA);

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
        console.info('State manager error', error);
      }
    }

    localStorage.setItem(CreateCardForm.localStorageKey, JSON.stringify(object));

    return object;
  },
  setName(name: string): void {
    const DATA = CreateCardForm.getCreateData();
    DATA.name = name;
    localStorage.setItem(CreateCardForm.localStorageKey, JSON.stringify(DATA));
  },
  setColor(color: string): void {
    const DATA = CreateCardForm.getCreateData();
    DATA.color = color;
    localStorage.setItem(CreateCardForm.localStorageKey, JSON.stringify(DATA));
  },
};
