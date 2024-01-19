import axios from 'axios';

const buildClient = ({ req }) => {
    let axiosInstance = axios.create({ baseURL: '/' });
    const onServer = typeof window === 'undefined';

    if (onServer) {
        axiosInstance = axios.create({
            baseURL: 'http://node-k8s.local',
        });
    }

    axiosInstance.interceptors.request.use(
        function (request) {
            let token = document.cookie.split('; ').find(row => row.startsWith('node_k8s_token')).split('=')[1];

            request.headers = {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'access-token': token ? token : "",
                ...request.headers,
            }

            return request;
        }
    )

    return axiosInstance;
};

export { buildClient };