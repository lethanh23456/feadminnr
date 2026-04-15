import axios from '@/utils/axios';
import { getAuthHeader } from '@/utils/apiHelper';
import { ipNR } from '@/utils/ip';

export type AccountSellStatus = 'selling' | 'sold' | 'pending' | string;

export interface AccountSellPayload {
    username: string;
    password: string;
    url: string;
    description: string;
    price: number;
}

export interface AccountSellUpdatePayload {
    id: number;
    url?: string;
    description?: string;
    price?: number;
}

export interface AccountSellListParams {
    partnerId?: number;
    adminId?: number;
    status?: AccountSellStatus;
}

export interface AccountBuyerListParams {
    partnerId?: number;
    adminId?: number;
}

export async function createAccountSellV2(payload: AccountSellPayload, token: string) {
    return axios.post(`${ipNR}/partner/create-account-sell`, payload, getAuthHeader(token));
}

export async function confirmSellByEmailLink(confirmToken: string, token: string) {
    return axios.get(`${ipNR}/partner/confirm-sell`, {
        ...getAuthHeader(token),
        params: { token: confirmToken },
    });
}

export async function updateAccountSellV2(payload: AccountSellUpdatePayload, token: string) {
    return axios.patch(`${ipNR}/partner/update-account-sell`, payload, getAuthHeader(token));
}

export async function deleteAccountSellV2(id: number, token: string) {
    return axios.delete(`${ipNR}/partner/delete-account-sell`, {
        ...getAuthHeader(token),
        data: { id },
    });
}

export async function getAllAccountSellV2(token: string) {
    return axios.get(`${ipNR}/partner/all-account-sell`, getAuthHeader(token));
}

export async function getAccountSellByActor(params: AccountSellListParams, token: string) {
    return axios.get(`${ipNR}/partner/account-sell-by-partner`, {
        ...getAuthHeader(token),
        params,
    });
}

export async function getAccountSellByIdV2(id: number, token: string) {
    return axios.get(`${ipNR}/partner/account-sell/${id}`, getAuthHeader(token));
}

export async function markAccountSellV2(id: number, status: AccountSellStatus, token: string) {
    return axios.patch(`${ipNR}/partner/mark-account-sell`, { id, status }, getAuthHeader(token));
}

export async function buyAccountSellV2(id: number, token: string) {
    return axios.post(`${ipNR}/partner/buy-account-sell`, { id }, getAuthHeader(token));
}

export async function getAllAccountBuyerV2(params: AccountBuyerListParams, token: string) {
    return axios.get(`${ipNR}/partner/all-account-buyer`, {
        ...getAuthHeader(token),
        params,
    });
}

// Backward-compatible wrappers
export async function createAccountSell(
    username: string,
    password: number,
    url: string,
    description: string,
    price: number,
    token: string,
) {
    return createAccountSellV2({ username, password: String(password), url, description, price }, token);
}

export async function confirmSell(token: string, confirmToken?: string) {
    if (confirmToken) {
        return confirmSellByEmailLink(confirmToken, token);
    }

    return axios.get(`${ipNR}/partner/confirm-sell`, getAuthHeader(token));
}

export async function updateAccountSell(
    id: number,
    url: string,
    description: string,
    price: 30000,
    token: string,
) {
    return updateAccountSellV2({ id, url, description, price }, token);
}

export async function deleteAccountSell(id: number, token: string) {
    return deleteAccountSellV2(id, token);
}

export async function getAllAccountSell(token: string) {
    return getAllAccountSellV2(token);
}

export async function getAccountSellByPartner(token: string) {
    return getAccountSellByActor({}, token);
}

export async function getAccountSellById(id: number, token: string) {
    return getAccountSellByIdV2(id, token);
}

export async function markAccountSell(id: number, status: string, token: string) {
    return markAccountSellV2(id, status, token);
}

export async function buyAccountSell(id: number, token: string) {
    return buyAccountSellV2(id, token);
}

export async function getAllAccountBuyer(token: string) {
    return getAllAccountBuyerV2({}, token);
}