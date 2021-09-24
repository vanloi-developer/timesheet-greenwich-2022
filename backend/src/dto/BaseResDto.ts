interface IBaseResDto {
   result: Object | null;
   targetUrl: Object | null;
   success: Boolean;
   error: Object | null;
   unAuthorizedRequest: Boolean;
   __abp: Boolean;
}

export const BaseResDto: IBaseResDto = {
   result: null,
   targetUrl: null,
   success: true,
   error: null,
   unAuthorizedRequest: false,
   __abp: true,
};
