import { config, passport } from '@imtbl/sdk';

export const passportInstance = new passport.Passport({
  baseConfig: new config.ImmutableConfiguration({
    environment: config.Environment.SANDBOX,
  }),
  clientId: `${process.env.CLIENT_ID}`,
  redirectUri: `${process.env.URL}`,
  logoutRedirectUri: `${process.env.URL}logout`,
  audience: 'platform_api',
  scope: 'openid offline_access email transact'
});
