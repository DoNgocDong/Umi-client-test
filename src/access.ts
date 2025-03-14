function decodeJwt(token: string) {
  const payloadBase64Url = token.split('.')[1];
  const payloadBase64 = payloadBase64Url.replace(/-/g, '+').replace(/_/g, '/');
  const payloadJson = atob(payloadBase64);
  const payload = JSON.parse(payloadJson);
  return payload;
}

export default function access(initialState: { 
  token?: string, 
  payload?: AuthTyping.AuthPayload 
}) {
  
  const {token} = initialState;
  const decoded: AuthTyping.AuthPayload = token ? decodeJwt(token) : undefined;
  
  const admin = !!(
    decoded && decoded.role == 'ADMIN'
  );

  const customer = !!(
    decoded && decoded.role == 'CUSTOMER'
  );

  return {
    admin, customer
  };
};
