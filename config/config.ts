import { defineConfig } from '@umijs/max';
import * as Icons from '@ant-design/icons';
import routes from './routes';

export default defineConfig({
  define: {
    SERVICE_URI: process.env.REACT_APP_SERVICE_URI,
    JWT_SECRET_KEY: process.env.REACT_APP_JWT_SECRET_KEY,
    JWT_EXPIRED_TIME: process.env.JWT_EXPIRED_TIME
  },
  icons: {},
  hash: true,
  antd: {
    compact: true
  },
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
