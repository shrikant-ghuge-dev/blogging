import { myAxios, privateAxios } from "./Helper"

export const addBlogPost = (postData) => {
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

export const imageUpload = (image, postId) => {
    let formData = new FormData();
    formData.append("image", image)
    return privateAxios.post(`/post/image/upload/${postId}`, formData).then(res => res.data)
}

export const getPostsByCategory = (catId) => {
    return myAxios.get(`/category/${catId}/posts`).then(res => res.data)
}

export const getPostsByUser = (userId) => {
    return myAxios.get(`/user/${userId}/posts`).then(res => res.data)
}

export const deletePost = (postId) => {
    return privateAxios.delete(`/posts/${postId}`).then(res => res.data)
}

export const updateBlogPost = (postData, postId) => {
    console.log(postData)
    return privateAxios.put(`/posts/${postId}`, postData).then(res => res.data)
}