interface TokenData {
  token: string;
  expiresAt: string | Date;
}

export interface AuthCookies {
  access: TokenData;
  refresh: TokenData;
}
