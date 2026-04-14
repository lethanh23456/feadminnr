export enum EWithdrawStatus {
    SUCCESS = 'SUCCESS',
    PENDING = 'PENDING',
    FAILED = 'FAILED',
}

export const WithdrawStatusConfig: Record<string, { text: string; color: string }> = {
    [EWithdrawStatus.SUCCESS]: {
        text: 'Thành công',
        color: 'success',
    },
    [EWithdrawStatus.PENDING]: {
        text: 'Chờ duyệt',
        color: 'warning',
    },
    [EWithdrawStatus.FAILED]: {
        text: 'Từ chối',
        color: 'error',
    },
    ERROR: {
        text: 'Lỗi',
        color: 'error',
    }
};