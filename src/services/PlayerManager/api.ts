import axios from '@/utils/axios';
import { ipNR } from '@/utils/ip';
import { getAuthHeader } from '@/utils/apiHelper';

export interface PlayerQueryByAuthId {
    authId?: string;
}

export interface PlayerMailPayload {
    who: string | 'ALL';
    title: string;
    content: string;
}

export interface TemporaryBanPayload {
    userId: number;
    phut: number;
    why: string;
}

const buildQueryConfig = (token: string, params?: Record<string, unknown>) => ({
    ...getAuthHeader(token),
    params,
});


export async function getPlayerProfile(id: string, token: string) {
    return axios.get(`${ipNR}/player_manager/profile/${id}`, getAuthHeader(token));
}

export async function getPlayerBalanceWeb(token: string, authId?: string) {
    return axios.get(`${ipNR}/player_manager/balance-web`, buildQueryConfig(token, { authId }));
}


export async function getPlayerItemWeb(token: string, authId?: string) {
    return axios.get(`${ipNR}/player_manager/item-web`, buildQueryConfig(token, { authId }));
}


export async function getPlayerUserItems(token: string, authId?: string) {
    return axios.get(`${ipNR}/player_manager/user-items`, buildQueryConfig(token, { authId }));
}


export async function getPlayerDeTu(token: string, authId?: string) {
    return axios.get(`${ipNR}/player_manager/de-tu`, buildQueryConfig(token, { authId }));
}


export async function getPlayerPay(token: string, authId?: string) {
    return axios.get(`${ipNR}/player_manager/pay`, buildQueryConfig(token, { authId }));
}


export async function sendEmailToPlayers(
    token: string,
    who: string | 'ALL',
    title: string,
    content: string
) {
    return axios.post(
        `${ipNR}/player_manager/send-email`,
        { who, title, content },
        getAuthHeader(token)
    );
}

export async function sendMailToPlayer(payload: PlayerMailPayload, token: string) {
    return sendEmailToPlayers(token, payload.who, payload.title, payload.content);
}


export async function temporaryBanPlayer(
    token: string,
    userId: number,
    phut: number,
    why: string
) {
    return axios.post(
        `${ipNR}/player_manager/temporary-ban`,
        { userId, phut, why },
        getAuthHeader(token)
    );
}

export async function temporaryBanPlayerByPayload(payload: TemporaryBanPayload, token: string) {
    return temporaryBanPlayer(token, payload.userId, payload.phut, payload.why);
}


export async function removeTemporaryBan(userId: string, token: string) {
    return axios.delete(
        `${ipNR}/player_manager/temporary-ban/${userId}`,
        getAuthHeader(token)
    );
}


export async function getAllTemporaryBannedPlayers(token: string) {
    return axios.get(`${ipNR}/player_manager/temporary-ban-all`, getAuthHeader(token));
}

export async function getAnyPlayerProfileByAuthId(authId: string, token: string) {
    return getPlayerProfile(authId, token);
}

export async function getAnyPlayerBalanceWebByAuthId(authId: string, token: string) {
    return getPlayerBalanceWeb(token, authId);
}

export async function getAnyPlayerItemWebByAuthId(authId: string, token: string) {
    return getPlayerItemWeb(token, authId);
}

export async function getAnyPlayerUserItemsByAuthId(authId: string, token: string) {
    return getPlayerUserItems(token, authId);
}

export async function getAnyPlayerDeTuByAuthId(authId: string, token: string) {
    return getPlayerDeTu(token, authId);
}

export async function getAnyPlayerWalletByAuthId(authId: string, token: string) {
    return getPlayerPay(token, authId);
}

export async function lockPlayerTemporarily(payload: TemporaryBanPayload, token: string) {
    return temporaryBanPlayerByPayload(payload, token);
}

export async function unlockPlayerTemporarily(userId: string, token: string) {
    return removeTemporaryBan(userId, token);
}

export async function getTemporaryBannedPlayers(token: string) {
    return getAllTemporaryBannedPlayers(token);
}