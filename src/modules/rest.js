import axios from "axios";
import { errors } from "../layers/utils/nodejs/errors"

const execute = async (request) => {
    try {
        const response = await axios.request(request);
        console.log("🚀 ~ execute ~ response:", response)
        return response
    } catch (error) {
        console.log("🚀 ~ execute ~ error:", error.message)
        throw new Error(JSON.stringify(errors.CUSTOM_API_ERROR))
    }
}

export { execute }