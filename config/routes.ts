export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: 'Home',
    path: '/home',
    component: './Home',
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: './dashboard',
  },
  {
    name: 'Branch',
    path: '/branch',
    component: './branch',
  },
  {
    name: ' CRUD',
    path: '/table',
    component: './Table',
  },
  {
    path: '/*',
    component: './errors/NotFound.tsx',
    layout: false
  },
];
