import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
} from '@/components/ui/menubar.tsx';
import { useAuthStore } from '@/store/useAuthStore.ts';
import { GuestMenu } from '@/components/menu/GuestMenu.tsx';
import { AuthenticatedMenu } from '@/components/menu/AuthentificatedMenu.tsx';
import { Link } from 'react-router-dom';

export function Menu() {
    const { user } = useAuthStore();

    return (
        <Menubar>
            <MenubarMenu>
                <Link
                    to="/"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    <MenubarTrigger>
                        {user ? user.displayName || user.email : 'Auth'}
                    </MenubarTrigger>
                </Link>
            </MenubarMenu>

            {user ? <AuthenticatedMenu /> : <GuestMenu />}
        </Menubar>
    );
}
