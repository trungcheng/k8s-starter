import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getTokenCookie, getNameCookie } from '../lib/utils';

const Header = ({ currentUser }) => {
    const [token, setToken] = useState(null);
    const [authName, setAuthName] = useState(null);
    
    useEffect(() => {
        let tokenCookie = getTokenCookie();
        let authNameCookie = getNameCookie();

        setToken(tokenCookie);
        setAuthName(authNameCookie);
    }, []);

    const links = [
        !token && { label: 'Sign Up', href: '/auth/signup' },
        !token && { label: 'Sign In', href: '/auth/signin' },
        token && { label: 'Sign Out', href: '/auth/signout' },
        token && { label: 'My Products', href: '/products' },
        token && { label: 'My Orders', href: '/orders' }
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
                {authName && (
                    <span className="nav d-flex align-items-center">
                        Logged in as {authName}
                    </span>
                )}
                <ul className="nav d-flex align-items-center">{links}</ul>
            </div>
        </nav>
    );
};

export { Header };