// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: '/',
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
  sale: {
    root: path(ROOTS_DASHBOARD, '/sale'),
    list: path(ROOTS_DASHBOARD, '/sale/list'),
    view: (id) => path(ROOTS_DASHBOARD, `/sale/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/sale/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/review/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_DASHBOARD, '/review/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
  review: {
    root: path(ROOTS_DASHBOARD, '/review'),
    list: path(ROOTS_DASHBOARD, '/review/list'),
    new: path(ROOTS_DASHBOARD, '/review/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/review/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/review/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/review/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_DASHBOARD, '/review/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
  items: {
    root: path(ROOTS_DASHBOARD, '/items'),
    list: path(ROOTS_DASHBOARD, '/items/product'),
    update: (name) => path(ROOTS_DASHBOARD, `/items/product/update/${name}`),
    // list: path(ROOTS_DASHBOARD, '/items/list'),
    checkout: path(ROOTS_DASHBOARD, '/items/checkout'),
    new: path(ROOTS_DASHBOARD, '/items/product/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/items/product/${name}`),
    edit: (name) => path(ROOTS_DASHBOARD, `/items/product/${name}/edit`),
  },
  reservation: {
    root: path(ROOTS_DASHBOARD, '/reservation'),
    list: path(ROOTS_DASHBOARD, '/reservation/list'),
  },
  admin: {
    user: path(ROOTS_DASHBOARD, '/admin/user'),
    shop: path(ROOTS_DASHBOARD, '/admin/shop'),
    review: path(ROOTS_DASHBOARD, '/admin/review'),
  },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
