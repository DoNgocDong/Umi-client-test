import { defineConfig } from '@umijs/max';
import routes from './routes';

export default defineConfig({
  define: {
    SERVICE_URI: process.env.REACT_APP_SERVICE_URI,
    JWT_SECRET_KEY: process.env.REACT_APP_JWT_SECRET_KEY,
    JWT_EXPIRED_TIME: process.env.JWT_EXPIRED_TIME,
    PUBLIC_PAGE_PATH: ['login', 'home']
  },
  icons: {},
  hash: true,
  antd: {},
  access: {},
  mako: {},
  model: {},
  dva: {},
  initialState: {},
  request: {},
  layout: {
    title: 'KLB - Client',
  },
  locale: {
    default: 'vi-VN',
    antd: true,
  },
  routes,
  npmClient: 'pnpm',
});
