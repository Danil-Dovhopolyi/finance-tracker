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

function Home() {
  return (
    <Fragment>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Auth</MenubarTrigger>
          <MenubarContent>
            <Link to="/auth/signin">
              <MenubarItem>Sign In</MenubarItem>
            </Link>
            <MenubarSeparator />
            <Link to="/auth/signup">
              <MenubarItem>Sign Up</MenubarItem>
            </Link>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </Fragment>
  );
}

export default Home;

