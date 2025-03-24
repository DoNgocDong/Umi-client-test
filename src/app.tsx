import { history, Link, RunTimeLayoutConfig, useAccess, useModel } from "@umijs/max";
import AvatarContent from "@/components/RightContent/Avatar";
import Question from "@/components/RightContent/Question";
import Footer from '@/components/Layouts/Footer';
import ForbiddenPage from "./components/Errors/Forbidden";
import logoUrl from "@/assets/logo/KLB_logo.svg";
import { LinkOutlined } from "@ant-design/icons";
import services from "@/services";
import { message } from "antd";

const { getProfile } = services.Account;

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
  const access = useAccess();

  return {
    actionsRender: () => [<Question key="doc" />],
    avatarProps: {
      render: () => {
        return <AvatarContent />
      },
    },
    logo: <img src={logoUrl} alt="KLB logo" style={{ height: '32px' }} />,
    menu: {
      locale: false,
    },
    layout: 'mix',
    links: [
      <a key="openapi" href="http://localhost:8080/swagger-ui/index.html" target="_blank" rel="noopener noreferrer">
        <LinkOutlined />
        <span>OpenAPI Docs</span>
      </a>
    ],
    onPageChange: async (location) => {
      if(access.customer && !PUBLIC_PAGE_PATH.some(item => location?.pathname?.includes(item))) {
        try {
          await getProfile();
        } catch (err) {
          message.error('Unauthenticated!');
          localStorage.clear();
          history.push('/login');
        }
      }
    },
    unAccessible: ForbiddenPage,
    rightContentRender: () => <AvatarContent />,
    footerRender: () => <Footer />
  };
};
