import './style.css';
import './const.css';
import './buttons.css';

import { App } from './components/App/App';

try {
  App.render();
} catch (error) {
  console.error(error);
}
