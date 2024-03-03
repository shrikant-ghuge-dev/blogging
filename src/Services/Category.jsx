import { myAxios } from "./Helper"


export const getCategories = () => {
    return myAxios.get('/categories/').then(res => res.data)
}