import Link from 'next/link';

const Header = ({ currentUser }) => {
    const links = [
        !currentUser && { label: 'Sign Up', href: '/auth/signup' },
        !currentUser && { label: 'Sign In', href: '/auth/signin' },
        currentUser && { label: 'Sign Out', href: '/auth/signout' },
        currentUser && { label: 'My Products', href: '/products' },
        currentUser && { label: 'My Orders', href: '/orders' }
    ]
        .filter(linkConfig => linkConfig)
        .map(({ label, href }) => {
            return (
                <li key={href}>
                    <Link href={href} className="nav-link">
                        {label}
                    </Link>
                </li>
            )
        });

    return (
        <nav className="navbar navbar-light bg-light">
            <Link href="/" className="navbar-brand">
                Node K8s Client
            </Link>
            <div className="d-flex justify-content-end">
                {currentUser && (
                    <span className="nav d-flex align-items-center">
                        Logged in as {currentUser.email}
                    </span>
                )}
                <ul className="nav d-flex align-items-center">{links}</ul>
            </div>
        </nav>
    );
};

export { Header };