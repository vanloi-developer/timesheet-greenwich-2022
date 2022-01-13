import { IBase } from "./IBase";

export interface IRole extends IBase {
  name: string;

  displayName: string;

  normalizedName: string;

  description: string;

  id: number;
}
