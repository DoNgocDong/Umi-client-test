import { defineConfig } from '@umijs/max';
import routes from './routes';

export default defineConfig({
  define: {
    SERVICE_URI: 'http://localhost:8080'
  },
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
