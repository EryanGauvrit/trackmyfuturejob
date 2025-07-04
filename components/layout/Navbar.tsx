import NavLink from '../NavLink';

const Navbar = () => {
    const pages = [
        {
            name: 'Tableau de bord',
            href: '/dashboard',
        },
        {
            name: 'Mon profil',
            href: '/profile',
        },
    ];

    return (
        <nav className="w-full flex flex-col md:flex-row items-center grow pl-4">
            {pages.map((page) => (
                <NavLink
                    key={page.name}
                    href={page.href}
                    className="text-lg font-bold"
                    activeClassName="text-primary"
                    variant="ghost"
                    size={'sm'}
                >
                    {page.name}
                </NavLink>
            ))}
        </nav>
    );
};

export default Navbar;
