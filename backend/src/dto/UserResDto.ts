import { APP } from "./../constants/index";

const VERSION = APP.VERSION;
const RELASE_DATE = APP.RELASE_DATE;

interface IUserResDTO {
   application: {
      version: String;
      releaseDate: String;
      features: Object;
   };
   user: Object | null;
   tenant: null;
}

export const UserResDTO: IUserResDTO = {
   application: {
      version: VERSION,
      releaseDate: RELASE_DATE,
      features: {},
   },
   user: null,
   tenant: null,
};
