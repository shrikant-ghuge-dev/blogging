import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardText } from 'reactstrap'
import { getCurrentUserDetails, isLoggedIn } from '../Auth'
import userContext from '../Context/UserContext'

function Post({ post = { id: -1, title: "Default Title", content: "Default post content" }, deleteHandler }) {
    const [user, setUser] = useState(null)
    const [login, setLogin] = useState(null)
    const userContextData = useContext(userContext)

    useEffect(() => {
        setUser(getCurrentUserDetails())
        setLogin(isLoggedIn())
    }, [])


    return (
        <Card className='border-0 shadow mt-3'>
            <CardBody>
                <h2>{post?.title}</h2>
                <CardText>
                    <p dangerouslySetInnerHTML={{ __html: post?.content.substring(0, 60) + "..." }}></p>
                </CardText>
                <div>
                    <Link className='btn btn-secondary' to={`/post/${post?.postId}`}>Read More</Link>
                    {userContextData.user.isLogin && (user && user?.id == post?.user?.id ? <Button color='danger' className='ms-2' onClick={(event) => deleteHandler(post)}>Delete</Button> : '')}
                    {userContextData.user.isLogin && (user && user?.id == post?.user?.id ? <Button color='warning' className='ms-2' tag={Link} to={`/user/update-blog/${post.postId}`} onClick={(event) => updatePost(post)}>Update</Button> : '')}
                </div>
            </CardBody>
        </Card>
    )
}

export default Post