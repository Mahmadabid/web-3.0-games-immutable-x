import { config, passport } from '@imtbl/sdk';

export const createPassportInstance = () => {
  return new passport.Passport({
    baseConfig: new config.ImmutableConfiguration({
      environment: config.Environment.PRODUCTION,
    }),
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID || '',
    redirectUri: process.env.NEXT_PUBLIC_URL || '',
    logoutRedirectUri: `${process.env.URL}logout`,
    audience: 'platform_api',
    scope: 'openid offline_access email transact'
  });
};
