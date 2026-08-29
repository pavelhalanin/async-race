import './Car.css';
import CarIcon from './car-side-solid-full.svg?raw';

export const Car = {
  render(color: string): string {
    const CAR_ICON = CarIcon.replaceAll(/fill="[^"]*"/g, '').replace(
      '<svg',
      `<svg fill="currentColor"`
    );

    return `<span class="car__wrapper" style="color: ${color};">${CAR_ICON}</span>`;
  },
};
