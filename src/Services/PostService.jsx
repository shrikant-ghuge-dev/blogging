import { privateAxios } from "./Helper"

export const addPost = (postData) => {
    return privateAxios.post(`/user/${postData.userId}/category/${postData.categoryId}/posts`, postData).then(res => res.data)
}