const authorizationHandler = {
    Bearer: ({ AccessToken }) => {
        return {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Bearer ${AccessToken}`
        }
    }
};

export {
    authorizationHandler
};