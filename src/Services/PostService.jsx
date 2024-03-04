import { myAxios, privateAxios } from "./Helper"

export const addPost = (postData) => {
    return privateAxios.post(`/user/${postData.userId}/category/${postData.categoryId}/posts`, postData).then(res => res.data)
}

export const getAllPost = (pageNumber, pageSize) => {
    return myAxios.get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`).then(res => res.data)
}

export const loadPostDetails = (postId) => {
    return myAxios.get(`/posts/${postId}`).then(res => res.data)
}

export const addComment = (comment, postId) => {
    return privateAxios.post(`/post/${postId}/comments`, comment).then(res => res.data)
}