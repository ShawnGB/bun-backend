type LoginBody = {
  body: { email: string; password: string };
  jwt: JWTType;
  setCookie: (name: string, value: string, options?: SetCookieOptions) => void;
};

interface JWTType {
  sign: (
    morePayload: UnwrapSchema<any, Record<string, string>> & JWTPayloadSpec
  ) => Promise<string>;
  verify: (
    jwt?: string
  ) => Promise<
    false | (UnwrapSchema<any, Record<string, string>> & JWTPayloadSpec)
  >;
}
