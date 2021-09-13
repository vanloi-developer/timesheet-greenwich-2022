import mongoose from "mongoose";

export interface IRead<T> {
  retrieve: () => Promise<T[]>;

  findById: (_id: string) => Promise<T>;
}
