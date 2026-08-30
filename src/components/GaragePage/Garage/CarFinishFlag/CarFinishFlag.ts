import FinishFlag from './flag-checkered-solid-full.svg?raw';
import './CarFinishFlag.css';

export const CarFinishFlag = {
  render(carId: number): string {
    return `
      <span data-finish-for-car-id="${carId}">
        ${FinishFlag}
      </span>
    `;
  },
  getFlag(carId: number): HTMLSpanElement {
    const ID = String(carId);
    const SELECTOR = `span[data-finish-for-car-id="${ID}"]`;
    const SPAN = document.querySelector(SELECTOR);
    if (!SPAN) {
      throw new Error(`Node is not found: ${SELECTOR}`);
    }
    if (!(SPAN instanceof HTMLSpanElement)) {
      throw new TypeError(`Node is not found ${SELECTOR}`);
    }
    return SPAN;
  },
  addFinishCrushAnimation(carId: number): void {
    const SPAN = CarFinishFlag.getFlag(carId);
    SPAN.classList.add('car__finish-flag--crush');
  },
  addFinishSuccessAnimation(carId: number): void {
    const SPAN = CarFinishFlag.getFlag(carId);
    SPAN.classList.add('car__finish-flag--success');
  },
  removeFinishAnimation(carId: number): void {
    const SPAN = CarFinishFlag.getFlag(carId);
    SPAN.classList.remove('car__finish-flag--crush', 'car__finish-flag--success');
  },
};
