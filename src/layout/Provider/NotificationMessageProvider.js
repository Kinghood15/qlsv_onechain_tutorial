import  NotificationMessage  from '../js/NotificationMessage';
import '../css/notificationmessage.css';
import { useReducer,createContext,useContext,useState } from 'react';
const NotificationContext = createContext();
const NotificationMessageProvider = (props)=>{
    const [state,dispatch] = useReducer((state,action)=>{
        switch (action.type){
            case "ADD_NOTIFICATION":
                return [...state,{ ...action.payload}];
            case "REMOVE_NOTIFICATION":
                return state.filter(el => el.id  !== action.id);
            default: return state;
        }
    },[]);
    return (
        <NotificationContext.Provider value={dispatch}>
            <div className="notification-wrapper">
                {state.map((note) => {
                    return <NotificationMessage dispatch={dispatch} {...note} />
                })}
            </div>
            {props.children}
        </NotificationContext.Provider>
    )

};

export const useNotification = () =>{
    const dispatch = useContext(NotificationContext);
    return (props) => {
        dispatch({
            type:"ADD_NOTIFICATION",
            payload:{
                ...props,
            }
        })
    }
}
export default NotificationMessageProvider;