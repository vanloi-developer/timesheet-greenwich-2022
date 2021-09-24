export interface IAuthResultDto {
   accessToken: String | null;
   encryptedAccessToken: String | null;
   expireInSeconds: Number;
   userId: Number | null;
}
