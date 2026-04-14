import axios from '@/utils/axios';
import { ipNR } from '@/utils/ip';
import { getAuthHeader } from '@/utils/apiHelper';


export async function getPlayerProfile(id: string, token: string) {
    return axios.get(`${ipNR}/player_manager/profile/${id}`, getAuthHeader(token));
}

export async function getPlayerBalanceWeb(token: string) {
    return axios.get(`${ipNR}/player_manager/balance-web`, getAuthHeader(token));
}


export async function getPlayerItemWeb(token: string) {
    return axios.get(`${ipNR}/player_manager/item-web`, getAuthHeader(token));
}


export async function getPlayerUserItems(token: string) {
    return axios.get(`${ipNR}/player_manager/user-items`, getAuthHeader(token));
}


export async function getPlayerDeTu(token: string) {
    return axios.get(`${ipNR}/player_manager/de-tu`, getAuthHeader(token));
}


export async function getPlayerPay(token: string) {
    return axios.get(`${ipNR}/player_manager/pay`, getAuthHeader(token));
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


export async function removeTemporaryBan(userId: string, token: string) {
    return axios.delete(
        `${ipNR}/player_manager/temporary-ban/${userId}`,
        getAuthHeader(token)
    );
}


export async function getAllTemporaryBannedPlayers(token: string) {
    return axios.get(`${ipNR}/player_manager/temporary-ban-all`, getAuthHeader(token));
}