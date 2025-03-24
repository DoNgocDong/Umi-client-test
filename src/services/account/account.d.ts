export enum AccountType {
  PAYMENT = 'PAYMENT',
  SAVINGS = 'SAVINGS',
  CREDIT = 'CREDIT',
  LOAN = 'LOAN',
}

export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  CLOSED = 'CLOSED',
}

export interface AccountCommon {
  accountCommonId: string;
  customerId: string;
  accountNumber: string;
  accountType: AccountType;
  status: AccountStatus;
}

export interface AccountInfo {
  id: string,
  userId: string,
  cifCode: string,
  accountNumber: string,
  phone: string,
  address: string,
  dob: Date,
  mail: string,
  firstName: string,
  lastName: string,
  identityCard: string,
  gender: string,
  avatar: string,
  status: string
}

export interface BankingAccountInfo {
  accountId: string;
  nickName: string;
  accountCommon: AccountCommon;
  branch: BranchTyping.BranchInfo;
  balance: number;
  createdAt: string;
  updatedAt: string;
}