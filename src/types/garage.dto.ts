export interface IGarage {
  name: string;
  color: string;
  id: number;
}

export type ICarExamples<T extends string> = {
  [brand in T]: string[];
};

export type IGarageCreate = Omit<IGarage, 'id'>;
