import axios from "axios";

const execute = async ({ method, url, headers, data }) => {
    let config = {
        method,
        maxBodyLength: Infinity,
        url,
        headers,
        data
    };

    try {
        const response = await axios.request(config);
        return response
    } catch (error) {
        throw error
    }
}

export { execute }