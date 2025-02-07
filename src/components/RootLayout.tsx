import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import AuthObserver from "../components/AuthObserver";

export function RootLayout() {
  return (
    <>
      <AuthObserver />
      <div>
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}
