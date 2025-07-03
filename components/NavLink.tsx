'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, ButtonProps } from './ui/button';

type NavLinkProps = ButtonProps & {
    href: string;
    activeClassName?: string;
};

const NavLink = ({ children, href, className, activeClassName, ...props }: NavLinkProps) => {
    const pathname = usePathname();
    return (
        <Button
            asChild
            className={cn(
                className,
                `${(pathname === href && href === '/') || (href !== '/' && pathname.startsWith(href)) ? activeClassName : ''}`,
            )}
            {...props}
        >
            <Link href={href}>{children}</Link>
        </Button>
    );
};

NavLink.displayName = 'NavLink';
export default NavLink;
