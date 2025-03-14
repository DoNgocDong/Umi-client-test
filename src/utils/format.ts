// 示例方法，没有实际意义
export function trim(str: string) {
  return str.trim();
}

export function base64UrlEncode(input: string): string {
  return Buffer.from(input).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function hmacSHA256(key: string, message: string): string {
  const crypto = require('crypto');
  return crypto.createHmac('sha256', key)
    .update(message)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}
