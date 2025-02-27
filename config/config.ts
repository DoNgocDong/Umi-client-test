import { defineConfig } from '@umijs/max';
import routes from './routes';

export default defineConfig({
  hash: true,
  antd: {},
  access: {},
  model: {},
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
