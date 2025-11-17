//import needed functions
import { createContext, useContext, useState } from "react";
//import icon
import { FiBell } from "react-icons/fi";

//define context
const NotificationContext =  createContext(null);

export function NotificationProvider({children}){
    //define state to manage
    const [notificationState, setNotificationState] = useState(
        {
            notification: {
                title: "Hello bro",
                message: "we are just testing your application, pray it works my nigga"
            }, 
            type: "medium", 
            icon: FiBell 
        }
    );

    //set provider value to state
    const value = {
        notificationState,
        setNotificationState
    }

    //return a context with a provider value 
    return <NotificationContext.Provider value={value}>
        {children}
    </NotificationContext.Provider>
}

export function useNotification() {
    const ctx = useContext(NotificationContext);

    if(!ctx) throw new Error("Access is restricted, must be called within scope");

    return ctx;
}