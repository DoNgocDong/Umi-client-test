
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
    icon: 'HomeOutlined',
  },
  {
    name: 'Profile',
    path: '/profile',
    component: './customer/customer_info',
    icon: 'InfoOutlined',
    hideInMenu: true,
    wrappers: ['@/wrappers/auth'],
    access: 'customer',
  },
  {
    name: 'Banking',
    path: '/banking',
    component: './customer/banking',
    icon: 'BankOutlined',
    hideInMenu: true,
    wrappers: ['@/wrappers/auth'],
    access: 'customer',
  },
  {
    name: 'Admin',
    path: '/',
    routes: [
      {name: 'Dashboard', path: '/dashboard', component: './admin/dashboard'},
      {name: 'Users', path: '/users', component: './admin/users'},
      {name: 'Branch', path: '/branch', component: './admin/branch'},
      {name: 'Interest Rate', path: '/interest-rate', component: './admin/interest_rate'},
    ],
    wrappers: ['@/wrappers/auth'],
    access: 'admin',
    icon: 'SettingOutlined'
  },
  {
    path: '/*',
    component: '@/components/Errors/NotFound.tsx',
    layout: false
  },
];
