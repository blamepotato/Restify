import {createContext} from "react"

export const feedAPIContext = createContext({
    blogs: [],
    setBlogs: () => {}
})