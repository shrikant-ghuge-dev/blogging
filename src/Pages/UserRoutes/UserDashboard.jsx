import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Container } from 'reactstrap'
import { getCurrentUserDetails } from '../../Auth'
import AddPost from '../../Components/AddPost'
import Post from '../../Components/Post'
import { deletePost, getPostsByUser } from '../../Services/PostService'

function UserDashboard() {
    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])

    useEffect(() => {
        setUser(getCurrentUserDetails())
        loadPOstData()
    }, [])

    function loadPOstData() {
        getPostsByUser(getCurrentUserDetails().id).then(res => {
            setPosts([...res])
        }).catch(error => console.log(error))
    }

    function deleteHandlers(post) {
        console.log(post)
        deletePost(post.postId).then(res => {
            loadPOstData()
            toast.success("Post Deleted Successfully!!")
        }).catch(error => {
            console.log(error)
            toast.error("Error deleting post!")
        })
    }
    return (
        <Container>
            <AddPost />

            <h1 className='my-3'>Posts Count: ({posts.length})</h1>
            {posts.map(post => {
                return <Post post={post} key={post.postId} deleteHandler={deleteHandlers} />
            })}
        </Container>
    )
}

export default UserDashboard