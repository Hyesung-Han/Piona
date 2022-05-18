import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
import { PATH_AFTER_LOGIN, PATH_AFTER_LOGIN_ADMIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';
// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {

  const { user } = useAuth();
  const AFTER_LOGIN = (user != null && user.user_code === "A" ? PATH_AFTER_LOGIN_ADMIN : PATH_AFTER_LOGIN);

  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
      ],
    },

    // Dashboard Routes
    {
      path: '/',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={AFTER_LOGIN} replace />, index: true },
        {
          path: 'reservation',
          children: [
            { element: <Navigate to="/dashboard/reservation/list" replace />, index: true },
            { path: 'list', element: <InvoiceList /> },
          ],
        },
        {
          path: 'items',
          children: [
            { element: <Navigate to="/dashboard/items/product" replace />, index: true },
            { path: 'product', element: <EcommerceShop /> },
            { path: 'product/:name', element: <EcommerceProductDetails /> },
            { path: 'product/update/:name', element: <EcommerceProductUpdate /> },
            { path: 'product/new', element: <EcommerceProductCreate /> },
            { path: 'product/:name/edit', element: <EcommerceProductCreate /> },
          ],
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
            { path: 'list', element: <UserList /> },
            { path: 'account', element: <UserAccount /> },
          ],
        },

        {
          path: 'review',
          children: [
            { element: <Navigate to="/dashboard/review/list" replace />, index: true },
            { path: 'list', element: <ReviewList /> },
          ],
        },
        {
          path: 'sale',
          children: [
            { element: <Navigate to="/dashboard/sale/list" replace />, index: true },
            { path: 'list', element: <SaleList /> },
          ],
        },
        {
          path: 'admin',
          children: [
            { element: <Navigate to="/dashboard/admin/shop" replace />, index: true },
            { path: 'user', element: <UserList /> },
            { path: 'shop', element: <AdminShopList /> },
            { path: 'review', element: <AdminReviewList /> },
          ],
        },
        { path: 'permission-denied', element: <PermissionDenied /> },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));

// GENERAL
// const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));

// ECOMMERCE
const EcommerceShop = Loadable(lazy(() => import('../pages/dashboard/EcommerceShop')));
const EcommerceProductDetails = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductDetails')));
const EcommerceProductUpdate = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductUpdate')));
const EcommerceProductCreate = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductCreate')));

// INVOICE
const InvoiceList = Loadable(lazy(() => import('../pages/dashboard/InvoiceList')));

// Sale
const SaleList = Loadable(lazy(() => import('../pages/dashboard/SaleList')));

// REVIEW
const ReviewList = Loadable(lazy(() => import('../pages/dashboard/ReviewList')));

// USER
const UserList = Loadable(lazy(() => import('../pages/dashboard/UserList')));
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));

// TEST RENDER PAGE BY ROLE
const PermissionDenied = Loadable(lazy(() => import('../pages/dashboard/PermissionDenied')));

// MAIN
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const Page403 = Loadable(lazy(() => import('../pages/Page403')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));

// ADMIN
const AdminShopList = Loadable(lazy(() => import('../pages/dashboard/AdminShopList')));
const AdminReviewList = Loadable(lazy(() => import('../pages/dashboard/AdminReviewList')));