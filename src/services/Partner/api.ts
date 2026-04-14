import axios from '@/utils/axios';
import { ipNR } from '@/utils/ip';
import { getAuthHeader } from '@/utils/apiHelper';


export async function createAccountSell(username: string, password: number, url: string, description: string, price: number, token: string) {
    return axios.post(`${ipNR}/partner/create-account-sell`, { username, password, url, description, price }, getAuthHeader(token));
}

export async function confirmSell(token: string) {
    return axios.get(`${ipNR}/partner/confirm-sell`, getAuthHeader(token));
}

export async function updateAccountSell(id: number, url: string, description: string, price: 30000, token: string) {
    return axios.patch(`${ipNR}/partner/update-account-sell`, { id, url, description, price }, getAuthHeader(token));
}
export async function deleteAccountSell(id: number, token: string) {
    return axios.delete(`${ipNR}/partner/delete-account-sell`, {
        ...getAuthHeader(token),
        data: { id }
    });
}
export async function getAllAccountSell(token: string) {
    return axios.get(`${ipNR}/partner/all-account-sell`, getAuthHeader(token));
}
export async function getAccountSellByPartner(token: string) {
    return axios.get(`${ipNR}/partner/account-sell-by-partner`, getAuthHeader(token));
}
export async function getAccountSellById(id: number, token: string) {
    return axios.get(`${ipNR}/partner/account-sell/${id}`, getAuthHeader(token));
}
export async function markAccountSell(id: number, status: string, token: string) {
    return axios.patch(`${ipNR}/partner/mark-account-sell`, { id, status }, getAuthHeader(token));
}
export async function buyAccountSell(id: number, token: string) {
    return axios.post(`${ipNR}/partner/buy-account-sell`, { id }, getAuthHeader(token));
}
export async function getAllAccountBuyer(token: string) {
    return axios.get(`${ipNR}/partner/all-account-buyer`, getAuthHeader(token));
}