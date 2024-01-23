import { useEffect } from 'react';
import Router from 'next/router';
import { removeCookieData } from '../../lib/utils';

const Signout = () => {
    const signoutAction = () => {
        removeCookieData();
        Router.push('/auth/signin');
    }

    useEffect(() => {
        signoutAction();
    }, []);

    return <div>Signing you out...</div>
};

export default Signout;