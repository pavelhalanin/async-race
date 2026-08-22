import './style.css';
import Garage from './components/Garage/Garage';
import CreateCardForm from './components/CreateCarForm/CreateCarForm';

try {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    ${CreateCardForm.render()}
    ${await Garage.render()}
  `;
  CreateCardForm.init();
} catch (error) {
  console.error(error);
}
