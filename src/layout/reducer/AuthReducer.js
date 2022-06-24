// const AuthReducer = (state, actions) => {
//     switch (actions.type) {
//         case "LOGIN": {
//             return {
//                 currentUser: actions.payload
//             };
//         }
//         case "LOGOUT": {
//             return {
//                 currentUser: null
//             }
//         }
//         default: return state;

//     }
// };
// export default AuthReducer;



import { SET_AUTH } from '../context/Constants';
export const authReducer = (state,actions) => {
    const { 
        type, 
        payload: {isAutherticated,user}
    } = actions;
    switch (type) {
        case SET_AUTH:
            return { 
                ...state, 
                authLoading:false, 
                isAutherticated, 
                user
            }
        default: return state;
    }
}