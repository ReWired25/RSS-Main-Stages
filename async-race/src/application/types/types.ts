export type CreateRequest = (
  carName: string,
  carColor: string
) => Promise<void>;

export type UpdateRequest = (
  carName: string,
  carColor: string,
  idNum: number
) => Promise<void>;

export type UpdateCarsFunc = (numOfPage: number) => Promise<void>;
