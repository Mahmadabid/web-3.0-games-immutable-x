type ImmutableConfiguration = any

export interface PassportModuleConfiguration {
    baseConfig: ImmutableConfiguration;
    clientId: string;
    logoutRedirectUri: string;
    logoutMode?: 'redirect' | 'silent'; // defaults to 'redirect'
    redirectUri: string;
    scope?: string;
    audience?: string;
}