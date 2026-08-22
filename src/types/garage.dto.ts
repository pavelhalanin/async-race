export interface IGarage {
  name: string;
  color: string;
  id: number;
}

export type IGarageCreate = Omit<IGarage, 'id'>;
