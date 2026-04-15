export type AccountStatus = 'selling' | 'sold' | 'pending' | string;

export interface AccountItem {
  id: number;
  username: string;
  password?: string;
  url: string;
  description: string;
  price: number;
  status?: AccountStatus;
  partnerId?: number;
  adminId?: number;
  sellerId?: number;
  buyerId?: number;
  createdAt?: string;
  updatedAt?: string;
  soldAt?: string;
  [key: string]: unknown;
}

export interface AccountStats {
  total: number;
  selling: number;
  sold: number;
  bought: number;
  totalValue: number;
}

export interface AccountFormValue {
  username: string;
  password: string;
  url: string;
  description: string;
  price: number;
}
