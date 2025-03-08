import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export function RootLayout() {
    return (
        <>
            <div>
                <Suspense fallback={<LoadingSpinner />}>
                    <Outlet />
                </Suspense>
            </div>
        </>
    );
}
