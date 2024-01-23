import { useEffect } from "react";

export const getTokenCookie = () => {
    try {
        return document.cookie.split('; ').find(row => row.startsWith('node_k8s_token')).split('=')[1];
    } catch (e) {
        return null;
    }
};

export const getNameCookie = () => {
    try {
        return document.cookie.split('; ').find(row => row.startsWith('name')).split('=')[1];
    } catch (e) {
        return null;
    }
};

export const setCookieData = (token, name) => {
    document.cookie = `node_k8s_token=${token}; path=/; max-age=31536000; name=${name}`;
};

export const removeCookieData = () => {
    document.cookie = `node_k8s_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; name=`;
};

export const loadScript = (url, className, innerContent) => {
    useEffect(() => {
        const script = document.createElement('script');
  
        script.className = className || '';
        script.type = 'text/javascript';
        script.src = url;
        script.async = true;
        script.innerHTML = innerContent || '';
  
        document.body.appendChild(script);
  
        return () => {
            document.body.removeChild(script);
        }
    }, [url]);
}
