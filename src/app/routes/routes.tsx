import type { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { RootLayout } from '../../components/RootLayout';

const Home = lazy(() => import('../../pages/Home'));
const Auth = lazy(() => import('../../pages/Auth'));
const SignIn = lazy(() => import('../../pages/SignIn'));
const SignUp = lazy(() => import('../../pages/SignUp'));
const Transactions = lazy(() => import('../../pages/Transanction'));

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <LoadingSpinner />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'transactions',
                element: <Transactions />,
            },
            {
                path: 'auth',
                element: <Auth />,
                children: [
                    {
                        path: 'signin',
                        element: <SignIn />,
                    },
                    {
                        path: 'signup',
                        element: <SignUp />,
                    },
                ],
            },
        ],
    },
];
