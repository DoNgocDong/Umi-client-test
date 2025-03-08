import { RunTimeLayoutConfig } from "@umijs/max";
import AvatarContent from "@/components/Avatar";
import ForbiddenPage from "./components/Errors/Forbidden";
import logoUrl from "@/assets/logo/KLB_logo.svg";

export async function getInitialState(): Promise<{ user?: any }> {
  const user = localStorage.getItem('user') || undefined;

  return { user };
}

export const layout: RunTimeLayoutConfig = () => {
  return {
    logo: <img src={logoUrl} alt="KLB logo" style={{ height: '32px' }} />,
    menu: {
      locale: false,
    },
    layout: 'mix',
    unAccessible: ForbiddenPage,
    rightContentRender: () => <AvatarContent />,
  };
};
