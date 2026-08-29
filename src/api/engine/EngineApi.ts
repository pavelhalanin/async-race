import type { IEngine } from '../../types/engine.dto';

export const EngineApi = {
  async engineStart(id: number): Promise<IEngine> {
    const URI = `http://localhost:3000/engine/?id=${id}&status=started`;

    const RESPONSE = await fetch(URI, {
      method: 'PATCH',
    });

    const HTTP_STATUS = RESPONSE.status;
    if (HTTP_STATUS !== 200) {
      throw new Error(`HTTP ${HTTP_STATUS}`);
    }

    const DATA = await RESPONSE.json();
    return DATA;
  },
  async engineDrive(id: number): Promise<IEngine> {
    const URI = `http://localhost:3000/engine/?id=${id}&status=drive`;

    const RESPONSE = await fetch(URI, {
      method: 'PATCH',
    });

    const HTTP_STATUS = RESPONSE.status;
    if (HTTP_STATUS !== 200) {
      throw new Error(`HTTP ${HTTP_STATUS}`);
    }

    const DATA = await RESPONSE.json();
    return DATA;
  },
  async engineStopped(id: number): Promise<IEngine> {
    const URI = `http://localhost:3000/engine/?id=${id}&status=stopped`;

    const RESPONSE = await fetch(URI, {
      method: 'PATCH',
    });

    const HTTP_STATUS = RESPONSE.status;
    if (HTTP_STATUS !== 200) {
      throw new Error(`HTTP ${HTTP_STATUS}`);
    }

    const DATA = await RESPONSE.json();
    return DATA;
  },
};
