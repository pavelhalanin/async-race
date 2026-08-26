import './global/style.css';
import './global/const.css';
import './global/buttons.css';
import './global/table.css';

import { App } from './components/App/App';

try {
  App.render();
} catch (error) {
  console.error(error);
}
