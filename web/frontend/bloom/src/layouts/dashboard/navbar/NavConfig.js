// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  menuItem: getIcon('ic_menu_item'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { 
        title: '상품 관리', 
        path: PATH_DASHBOARD.general.ecommerce, 
        icon: ICONS.ecommerce,
        children: [
          { title: '상품 등록하기', path: PATH_DASHBOARD.eCommerce.new },
          { title: '상품 목록보기', path: PATH_DASHBOARD.eCommerce.root },
        ],
      },
      { title: '예약 관리', path: PATH_DASHBOARD.invoice.root, icon: ICONS.dashboard },
      { title: '정산 관리', path: PATH_DASHBOARD.sale.root, icon: ICONS.analytics },
      { title: '리뷰 관리', path: PATH_DASHBOARD.review.root, icon: ICONS.banking },
      { title: '정보 수정', path: PATH_DASHBOARD.user.account, icon: ICONS.booking },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'admin',
    items: [
      { title: '회원 관리', path: PATH_DASHBOARD.admin.user, icon: ICONS.user,},
      { title: '리뷰 관리', path: PATH_DASHBOARD.admin.review, icon: ICONS.cart},
      { title: '기업 관리', path: PATH_DASHBOARD.admin.shop, icon: ICONS.invoice},
    ],
  },
];

export default navConfig;
