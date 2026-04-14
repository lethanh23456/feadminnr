import { EWithdrawStatus } from "./constant";

declare module Cashier {
    export interface IRecord {
        id: number;
        user_id: number;
        amount: number;
        bank_name: string;
        bank_number: string;
        bank_owner: string;
        status: EWithdrawStatus;
        finance_id: number;
    }
}