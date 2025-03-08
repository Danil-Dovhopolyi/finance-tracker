import {
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from '@/components/ui/menubar';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { BarChart3, CreditCard, Settings } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore.ts';

const authenticatedMenuItems = [
    { label: 'Cards', icon: CreditCard, path: '/dashboard' },
    { label: 'Transactions', icon: BarChart3, path: '/transactions' },
];

export function AuthenticatedMenu() {
    const { logout } = useAuthStore();

    return useMemo(
        () => (
            <>
                {authenticatedMenuItems.map(({ label, icon: Icon, path }) => (
                    <MenubarMenu key={label}>
                        <MenubarTrigger>
                            <Icon className="mr-2 h-4 w-4" />
                            {label}
                        </MenubarTrigger>
                        <MenubarContent>
                            <Link to={path}>
                                <MenubarItem>View {label}</MenubarItem>
                            </Link>
                        </MenubarContent>
                    </MenubarMenu>
                ))}

                <MenubarMenu>
                    <MenubarTrigger>
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </MenubarTrigger>
                    <MenubarContent>
                        <Link to="/settings">
                            <MenubarItem>View Settings</MenubarItem>
                        </Link>
                        <MenubarSeparator />
                        <MenubarItem onClick={logout}>Logout</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </>
        ),
        [logout]
    );
}
