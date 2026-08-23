import { App } from '../../components/App/App';

export const WinnersPage = {
  async render(): Promise<void> {
    const NODE_ID = `#${App.idContent}`;
    const DIV = document.querySelector(NODE_ID);
    if (!DIV) {
      console.log(`Node is not found: ${NODE_ID}`);
      return;
    }

    try {
      DIV.innerHTML = 'Winners page';
    } catch (error) {
      DIV.innerHTML = `
        <div>${error}</div>
      `;
    }
  },
};
