const AuthReducer = (state, actions) => {
    switch (actions.type) {
        case "LOGIN": {
            return {
                currentUser: actions.payload
            };
        }
        case "LOGOUT": {
            return {
                currentUser: null
            }
        }
        default: return state;

    }
};
export default AuthReducer;
