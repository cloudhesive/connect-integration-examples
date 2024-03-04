
function parseBody(event) {
    try {
        const parsedBody = JSON.parse(event.body);
        return parsedBody;
    } catch (error) {
        if (event.Details && event.Details.Parameters) {
            return event.Details.Parameters;
        }
        throw new Error('Body format is not correct');
    }
}

export { parseBody };