import './style.css';
import Garage from './components/Garage/Garage';
import CreateCardForm from './components/CreateCarForm/CreateCarForm';
import GarageApi from './api/garage/GarageApi';
import RemoveCardButton from './components/RemoveCarButton/RemoveCarButton';

try {
  const CARS = await GarageApi.get();
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    ${CreateCardForm.render()}
    ${await Garage.render(CARS)}
  `;
  CreateCardForm.init();
  for (const CAR of CARS) {
    RemoveCardButton.init(CAR.id);
  }
} catch (error) {
  console.error(error);
}
