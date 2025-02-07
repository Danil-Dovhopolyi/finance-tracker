import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Link } from 'react-router-dom'
import { Fragment } from "react/jsx-runtime";
import { useAuthStore } from "../store/useAuthStore";

function Home() {
  const { user, logout } = useAuthStore();
  console.log(user)
  return (
    <Fragment>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            {user ? (user.displayName || user.email) : "Auth"}
          </MenubarTrigger>
          <MenubarContent>
            {user ? (
              <MenubarItem onClick={logout}>Logout</MenubarItem>
            ) : (
              <Fragment>
                <Link to="/auth/signin">
                  <MenubarItem>Sign In</MenubarItem>
                </Link>
                <MenubarSeparator />
                <Link to="/auth/signup">
                  <MenubarItem>Sign Up</MenubarItem>
                </Link>
              </Fragment>
            )}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </Fragment>
  );
}

export default Home;

