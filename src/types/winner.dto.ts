export interface IWinner {
  id: number;
  wins: number;
  time: number;
}

export type IWinnerUpdate = Omit<IWinner, 'id'>;
