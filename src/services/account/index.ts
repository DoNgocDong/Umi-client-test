import request from '../baseRequest';
import { AccountInfo, BankingAccountInfo } from '@/services/account/account';

const customerPath = '/customer/api/v1/users';
const accountPath = '/account/api/v1/accounts';

export async function getProfile() {
  return request<AccountInfo>(customerPath + '/my-info', {
    method: 'GET',
    headers: {
      'accept': '*/*',
      'Content-Type': 'application/json'
    }
  });
}

export async function getBankingAccount() {
  return request<BankingAccountInfo>(accountPath + '/banking/my-banking', {
    method: 'GET',
    headers: {
      'accept': 'application/json',
    }
  });
}