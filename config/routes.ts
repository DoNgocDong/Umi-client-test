
export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: './auth/login.tsx',
    layout: false,
    hideInMenu: true
  },
  {
    name: 'Home',
    path: '/home',
    component: './Home',
    icon: 'HomeOutlined'
  },
  {
    name: 'Admin',
    path: '/',
    routes: [
      {name: 'Dashboard', path: '/dashboard', component: './dashboard'},
      {name: 'Users', path: '/users', component: './users'},
      {name: 'Branch', path: '/branch', component: './branch'},
      {name: 'Interest Rate', path: '/interest-rate', component: './interest_rate'},
    ],
    wrappers: ['@/wrappers/auth'],
    access: 'admin',
    icon: 'SettingOutlined'
  },
  // {
  //   name: ' CRUD',
  //   path: '/table',
  //   component: './Table',
  // },
  {
    path: '/*',
    component: '@/components/Errors/NotFound.tsx',
    layout: false
  },
];
