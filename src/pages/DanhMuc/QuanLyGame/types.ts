export interface GameUserProfile {
  id?: number | string;
  authId?: string;
  username?: string;
  name?: string;
  email?: string;
  phone?: string;
  status?: string;
  [key: string]: unknown;
}

export interface BalanceWebInfo {
  vangNapWeb?: number;
  ngocNapWeb?: number;
  [key: string]: unknown;
}

export interface GameItemRecord {
  id?: number | string;
  itemId?: number | string;
  itemName?: string;
  quantity?: number;
  [key: string]: unknown;
}

export interface DiscipleRecord {
  id?: number | string;
  name?: string;
  level?: number | string;
  [key: string]: unknown;
}

export interface WalletInfo {
  id?: number | string;
  balance?: number;
  cash?: number;
  [key: string]: unknown;
}

export interface BanRecord {
  userId?: number | string;
  authId?: string;
  username?: string;
  reason?: string;
  why?: string;
  remainingMinutes?: number;
  createdAt?: string;
  expiredAt?: string;
  [key: string]: unknown;
}

export interface MailFormValues {
  who: string;
  title: string;
  content: string;
}

export interface BanFormValues {
  userId: number;
  phut: number;
  why: string;
}
