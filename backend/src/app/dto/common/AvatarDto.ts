import { IBase } from "src/interfaces/IBase";
import { IAvatar } from "../../../interfaces";

export interface AvatarDto {
  name: string;

  img: {
    data: Buffer;
    contentType: string;
  };

  id?: number;
}
