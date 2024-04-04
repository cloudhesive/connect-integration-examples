import { errors } from "../nodejs/errors.mjs";

function parseBody(event) {
    try {
        const parsedBody = JSON.parse(event.body);
        return parsedBody;
    } catch (error) {
        if (event.Details && event.Details.Parameters) {
            return event.Details.Parameters;
        }
        throw new Error(JSON.stringify(errors.BODY_PARSE_ERROR));
    }
}

export { parseBody };