import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
} from '@/components/ui/menubar.tsx';
import { useAuthStore } from '@/store/useAuthStore.ts';
import { GuestMenu } from '@/components/menu/GuestMenu.tsx';
import { AuthenticatedMenu } from '@/components/menu/AuthentificatedMenu.tsx';

export function Menu() {
    const { user } = useAuthStore();

    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>
                    {user ? user.displayName || user.email : 'Auth'}
                </MenubarTrigger>
            </MenubarMenu>

            {user ? <AuthenticatedMenu /> : <GuestMenu />}
        </Menubar>
    );
}
