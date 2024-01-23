import axios from 'axios';
import { getTokenCookie } from '../lib/utils';

const buildClient = ({ req }) => {
    const onServer = typeof window === 'undefined';

    let axiosInstance = axios.create({ 
        baseURL: 'http://node-k8s.local',
        headers: req.headers || {}
    });

    if (!onServer) {
        axiosInstance.interceptors.request.use(
            function (request) {
                let token = getTokenCookie();
    
                request.headers = {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                    'access-token': token ? token : "",
                    ...request.headers,
                }
    
                return request;
            }
        )
    }

    return axiosInstance;
};

export { buildClient };