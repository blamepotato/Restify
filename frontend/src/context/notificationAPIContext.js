import {createContext} from "react"

export const notificationAPIContext = createContext({
    notifications: [],
    setNotifications: () => {}
})