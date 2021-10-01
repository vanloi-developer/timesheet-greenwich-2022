import { IBase } from "./IBase";

export interface ITimeKeeping extends IBase {
  isPunishedCheckIn: boolean;

  noteReply: string;

  id: number;
}
