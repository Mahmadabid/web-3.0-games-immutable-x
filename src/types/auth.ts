interface Passport {
    zkevm_eth_address?: string;
    zkevm_user_admin_address?: string;
}

interface Profile {
    passport?: Passport;
    email?: string;
    email_verified?: boolean;
    iss?: string;
    aud?: string;
    iat?: number;
    exp?: number;
    sub?: string;
    sid?: string;
}

export interface UserObject {
    id_token?: string;
    session_state?: null;
    access_token?: string;
    refresh_token?: string;
    token_type?: string;
    scope?: string;
    profile?: Profile;
    expires_at?: number;
}


export type GameData = {
    quiz: {
        points: number;
    };
    balloon: {
        points: number;
    };
};

export type WebEntryData = {
    userId: string;
    data: GameData;
};

export type ApiResponse = {
    error?: string;
    message?: string;
    entry?: WebEntryData;
    entries?: WebEntryData[];
  };
  