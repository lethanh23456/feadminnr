import axios from '@/utils/axios';
import { ipNR } from '@/utils/ip';
import { getAuthHeader } from '@/utils/apiHelper';

export async function GetAllWithdrawl(token: string) {
    return axios.get(`${ipNR}/cashier/all-withdraw`, getAuthHeader(token));
}

export async function ApproveWithdraw(id: number, finance_id: number, token: string) {
    return axios.patch(`${ipNR}/cashier/approve-withdraw`, { id, finance_id }, getAuthHeader(token));
}

export async function RejectWithdraw(id: number, finance_id: number, token: string) {
    return axios.patch(`${ipNR}/cashier/reject-withdraw`, { id, finance_id }, getAuthHeader(token));
}