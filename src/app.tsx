import { RunTimeLayoutConfig } from "@umijs/max";
import AvatarContent from "@/components/Avatar";
import ForbiddenPage from "./components/Errors/Forbidden";
import logoUrl from "@/assets/logo/KLB_logo.svg";

function decodeJwt(token: string) {
  const payloadBase64Url = token.split('.')[1];
  const payloadBase64 = payloadBase64Url.replace(/-/g, '+').replace(/_/g, '/');
  const payloadJson = atob(payloadBase64);
  const payload = JSON.parse(payloadJson);
  return payload;
}

export async function getInitialState(): Promise<{ 
  token?: string,
  refreshToken?: string, 
  payload?: AuthTyping.AuthPayload 
}> {
  const token = localStorage.getItem('access_token') || undefined;
  const refreshToken = localStorage.getItem('refresh_token') || undefined;
  const decoded: AuthTyping.AuthPayload = token ? decodeJwt(token) : undefined; 

  return { 
    token, 
    refreshToken,
    payload: decoded 
  };
}

export const layout: RunTimeLayoutConfig = () => {
  return {
    logo: <img src={logoUrl} alt="KLB logo" style={{ height: '32px' }} />,
    menu: {
      locale: false,
    },
    layout: 'mix',
    unAccessible: ForbiddenPage,
    rightContentRender: () => <AvatarContent />
  };
};
