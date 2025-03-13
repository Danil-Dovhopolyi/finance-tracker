import {
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from '@/components/ui/menubar';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';

const guestMenuItems = [
    { label: 'Sign In', path: '/auth/signin' },
    { label: 'Sign Up', path: '/auth/signup', separator: true },
];

export function GuestMenu() {
    return (
        <MenubarMenu>
            <MenubarTrigger>Account</MenubarTrigger>
            <MenubarContent>
                {guestMenuItems.map(({ label, path, separator }) => (
                    <Fragment key={label}>
                        <Link to={path}>
                            <MenubarItem>{label}</MenubarItem>
                        </Link>
                        {separator && <MenubarSeparator />}
                    </Fragment>
                ))}
            </MenubarContent>
        </MenubarMenu>
    );
}
