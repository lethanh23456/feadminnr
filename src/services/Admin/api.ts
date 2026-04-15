import axios from '@/utils/axios';
import { ipNR } from '@/utils/ip';
import { getAuthHeader } from '@/utils/apiHelper';

export async function changeUserRole(token: string, userId: number, role: string) {
    return axios.patch(
        `${ipNR}/admin/change-role`,
        { userId, role },
        getAuthHeader(token)
    );
}


export async function banUser(token: string, userId: number) {
    return axios.patch(
        `${ipNR}/admin/ban-user`,
        { userId },
        getAuthHeader(token)
    );
}


export async function unbanUser(token: string, userId: number) {
    return axios.patch(
        `${ipNR}/admin/unban-user`,
        { userId },
        getAuthHeader(token)
    );
}


export async function updateUserBalance(
    token: string,
    userId: number,
    type: 'vang' | 'ngoc',
    amount: number
) {
    return axios.patch(
        `${ipNR}/admin/update-balance`,
        { userId, type, amount },
        getAuthHeader(token)
    );
}


export async function addItemWeb(token: string, userId: number, itemId: number) {
    return axios.post(
        `${ipNR}/admin/add-item-web`,
        { userId, itemId },
        getAuthHeader(token)
    );
}


export async function useItemWeb(token: string, userId: number, itemId: number) {
    return axios.delete(`${ipNR}/admin/use-item-web`, {
        data: { userId, itemId },
        ...getAuthHeader(token)
    });
}


export async function addItem(token: string, userId: number, itemId: number, quantity: number) {
    return axios.post(
        `${ipNR}/admin/add-item`,
        { userId, itemId, quantity },
        getAuthHeader(token)
    );
}

export async function updateItem(token: string, itemId: number, data: Record<string, unknown>) {
    return axios.put(
        `${ipNR}/admin/update-item`,
        { itemId, ...data },
        getAuthHeader(token)
    );
}


export async function deleteItem(token: string, itemId: number) {
    return axios.delete(`${ipNR}/admin/delete-item`, {
        data: { itemId },
        ...getAuthHeader(token)
    });
}


export async function createDeTu(token: string, userId: number, deTuId: number) {
    return axios.post(
        `${ipNR}/admin/create-de-tu`,
        { userId, deTuId },
        getAuthHeader(token)
    );
}


export async function getAccountSellByPartner(token: string) {
    return axios.get(`${ipNR}/admin/account-sell-by-partner`, getAuthHeader(token));
}


export async function getAllAccountBuyer(token: string) {
    return axios.get(`${ipNR}/admin/all-account-buyer`, getAuthHeader(token));
}

export async function updateUserMoney(token: string, userId: number, amount: number) {
    return axios.patch(
        `${ipNR}/admin/money`,
        { userId, amount },
        getAuthHeader(token)
    );
}


export async function updateUserWalletStatus(token: string, userId: number, status: boolean) {
    return axios.patch(
        `${ipNR}/admin/status`,
        { userId, status },
        getAuthHeader(token)
    );
}