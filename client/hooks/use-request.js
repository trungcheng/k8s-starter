import axios from 'axios';
import { buildClient } from '../api/build-client';
import { useState } from 'react';

const useRequest = ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try {
            setErrors(null);
            const client = buildClient();
            //const response = await axios[method](url, body);
            const response = await client[method](url, body);

            if (onSuccess != null) {
                onSuccess(response.data);
            }

            return response.data;
        } catch (error) {
            setErrors(
                <div className="alert alert-danger">
                    <h4>Oops...</h4>
                    <ul className="my-o">
                        {error.response.data.errors.map(err =>
                            <li key={err.message}>{err.message}</li>
                        )}
                    </ul>
                </div>
            );
        }
    };

    return { doRequest, errors };
};

export { useRequest };