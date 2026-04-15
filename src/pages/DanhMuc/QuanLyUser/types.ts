export interface AdminUser {
  id: number;
  username?: string;
  email?: string;
  role?: string;
  isBanned?: boolean;
  walletStatus?: boolean;
  source?: string;
  raw?: Record<string, any>;
}

export interface UserFilterValues {
  keyword: string;
}
