interface IBaseErrorDto {
   code: Number;
   message: String;
   details: String | null;
   validationErrors: null;
}

export const BaseErrorDto: IBaseErrorDto = {
   code: 0,
   message: 'An internal error occurred during your request!',
   details: null,
   validationErrors: null,
};
