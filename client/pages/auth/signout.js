import { useEffect } from 'react';
import Router from 'next/router';

const Signout = () => {
    const signoutAction = () => {
        document.cookie = `node_k8s_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        Router.push('/auth/signin');
    }

    useEffect(() => {
        signoutAction();
    }, []);

    return <div>Signing you out...</div>
};

export default Signout;