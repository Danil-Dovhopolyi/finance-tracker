import { Outlet } from 'react-router-dom';

function Auth() {
  return (
    <div className="auth-container">
      <Outlet />
    </div>
  );
}

export default Auth;
