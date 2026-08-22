import './style.css';
import Garage from './components/Garage/Garage';

try {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    ${await Garage.render()}
  `;
} catch (error) {
  console.error(error);
}
