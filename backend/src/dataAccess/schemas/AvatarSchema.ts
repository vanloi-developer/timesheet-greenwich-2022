import { Schema } from "mongoose";

import { IAvatar } from "../../interfaces";

export const AvatarSchema: Schema = new Schema<IAvatar>({
  name: { type: String, require: true },
  image: {
    data: { type: Buffer },
    contentType: { type: String, default: null },
  },
});
