/* eslint-disable react-refresh/only-export-components */
import paths, { rootPaths } from './paths';
import { Suspense, lazy } from 'react';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import MainLayout from 'layouts/main-layout';
import Splash from 'components/loader/Splash';
import PageLoader from 'components/loader/PageLoader';
import AuthLayout from 'layouts/auth-layout';
import HomepageLayout from 'layouts/homepage-layout';
import MainPageLayout from 'layouts/mainpage-layout';
import Contact from 'pages/contact/Contact';
import ProtectedRoute from './ProtectedRoute';

const App = lazy(() => import('App'));
const Dashboard = lazy(() => import('pages/dashboard/Dashbaord'));
const Events = lazy(() => import('pages/events/Events'));
const AddEvent = lazy(() => import('pages/addEvent/AddEvent'));
const Department = lazy(() => import('pages/Department/Department'));
const Calendar = lazy(() => import('pages/calendar/Calendar'));
const UploadPhoto = lazy(() => import('pages/uploadPhoto/UploadPhoto'));
const AccountSettings = lazy(() => import('pages/admin-account-settings/AccountSettings'))
const Notification = lazy(() => import('pages/notification/Notification'));

const ManageEvents = lazy(() => import('pages/events/ManageEvents'));
const ManageAdmin = lazy(() => import('pages/manage-admin/ManageAdmin'));

const Rejected = lazy(() => import('pages/events/Rejected'));
const Cancelled = lazy(() => import('pages/events/Cancelled'));

const Homepage = lazy(() => import('pages/home/Homepage'));
const Aboutpage = lazy(() => import('pages/about/AboutUs'));
const Photos = lazy(() => import('pages/photos'));
const Profile = lazy(() => import('pages/profile/Profile'));
const NotificationUser = lazy(() => import('pages/notification/UserNotification'));

const Signin = lazy(() => import('pages/authentication/Signin'));
const Signup = lazy(() => import('pages/authentication/Signup'));
const MainPage = lazy(() => import('layouts/mainpage/Main'));

const router = createBrowserRouter(
  [
    {
      element: (
        <Suspense fallback={<Splash />}>
          <App />
        </Suspense>
      ),
      children: [
        {
          path: '/',
          element: (
            <ProtectedRoute>
              <MainLayout>
                <Suspense fallback={<PageLoader />}>
                  <Outlet />
                </Suspense>
            </MainLayout>
            </ProtectedRoute>
          ),
          children: [
            {
              index: true,
              element: <Dashboard />,
            },
            {
              path: '/events',
              element: <Events />,
            },
            {
              path: 'uploadPhoto',
              element: <UploadPhoto />
            },
            {
              path: 'calendar',
              element: <Calendar />
            },
            {
              path: 'account-settings',
              element: <AccountSettings />
            },
            {
              path: 'addEvent',
              element: <AddEvent />,
            },
            {
              path: 'manageEvents',
              element: <ManageEvents />,
            },
            {
              path: 'manageAdmin',
              element: <ManageAdmin />,
            },
            {
              path: 'department',
              element: <Department />
            },
            {
              path: 'notification',
              element: <Notification />
            },
            {
              path: 'cancelled-events',
              element: <Cancelled />
            },
            {
              path: 'rejected-events',
              element: <Rejected />
            },
          ],
        },
        {
          path: rootPaths.authRoot,
          element: (
            <AuthLayout>
              <Outlet />
            </AuthLayout>
          ),
          children: [
            {
              path: paths.signin,
              element: <Signin />,
            },
            {
              path: paths.signup,
              element: <Signup />,
            },
          ],
        },{
          path: rootPaths.userRoot,
          element: (
            <ProtectedRoute>
              <HomepageLayout>
                <Outlet />
              </HomepageLayout>
            </ProtectedRoute>
          ),
          children: [            
            {
              path: 'home',
              element: <Homepage />,
            },
            {
              path: 'about',
              element: <Aboutpage />,
            },
            {
              path: 'contact',
              element: <Contact />,
            },
            {
              path: 'profile',
              element: <Profile />
            },
            {
              path: 'notifications',
              element: <NotificationUser />
            },
            {
              path: 'photos',
              element: <Photos />
            },
          ],
        },
        {
          path: rootPaths.mainRoot,
          element: (
            <MainPageLayout>
              <Outlet />
            </MainPageLayout>
          ),
          children: [
            {
              path: '/mainpage',
              element: <MainPage />,
            },
          ],
        },
      ],
    },
  ],
  {
    basename: '/event-organizer',
  },
);

export default router;
