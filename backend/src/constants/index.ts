export const APP = {
   VERSION: '1.0.0.0',
   RELASE_DATE: '2021-07-20T15:49:07.1350156+07:00',
};

export const TOKEN_EXPIRE = 8640000;

export const WORKING_TIME = {
   '0': {
      morningStartAt: '08:30',
      morningEndAt: '12:00',
      afternoonStartAt: '13:00',
      afternoonEndAt: '17:30',
      morningWorking: '3.5',
      afternoonWorking: '4.5',
      id: 0,
   },
   '1': {
      morningStartAt: '08:00',
      morningEndAt: '12:00',
      afternoonStartAt: '13:00',
      afternoonEndAt: '17:00',
      morningWorking: '4',
      afternoonWorking: '4',
      id: 0,
   },
   '2': {
      morningStartAt: '08:30',
      morningEndAt: '12:00',
      afternoonStartAt: '13:00',
      afternoonEndAt: '17:30',
      morningWorking: '3.5',
      afternoonWorking: '4.5',
      id: 0,
   },
   '3': {
      morningStartAt: '08:30',
      morningEndAt: '12:00',
      afternoonStartAt: '13:00',
      afternoonEndAt: '17:30',
      morningWorking: '3.5',
      afternoonWorking: '4.5',
      id: 0,
   },
};

export const ADMIN_PASSWORD = '123qwe';

export const REQUIRED_FIELD_LOGIN = ['password', 'userNameOrEmailAddress'];
export const REQUIRED_FIELD_RESET_PASS = ['adminPassword', 'newPassword', 'userId'];
export const SEARCH_TEXT_FIELD_USER = ['userName', 'name', 'surname', 'emailAddress'];
export const SEARCH_TEXT_FIELD_CUSTOMER = ['name'];
export const REQUIRED_FIELD_SAVE_CUSTOMER = ['name', 'address'];
export const REQUIRED_FIELD_SAVE_TASK = ['name', 'type'];
export const REQUIRED_FIELD_CREATE_ROLE = ['description', 'displayName', 'name'];
