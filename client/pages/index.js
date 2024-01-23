import { useState, useEffect } from "react";
import axios from 'axios';
import { buildClient } from '../api/build-client';
import { getTokenCookie } from '../lib/utils';

const LandingPage = ({ currentUser }) => {
    const [token, setToken] = useState(null);
    
    useEffect(() => {
        let tokenCookie = getTokenCookie();

        setToken(tokenCookie);
    }, []);

    return token ? (
        <h1>You are signed in</h1>
    ) : (
        <h1>You are NOT signed in</h1>
    );
}

LandingPage.getInitialProps = async (context) => {
    // Context includes things like the request, if this component is being rendered on the server.
    // const client = buildClient(context);
    // const { data } = await client.get(
    //     '/api/auth/current-user',
    // );
    // return data;
};

export default LandingPage;