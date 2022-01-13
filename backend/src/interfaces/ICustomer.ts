import { IBase } from "./IBase";

export interface ICustomer extends IBase {
  name: string;

  address: string;
  
  id: number;
}
