import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardText } from 'reactstrap'

function Post({ post }) {
    console.log(post)
    return (
        <Card className='border-0 shadow mt-3'>
            <CardBody>
                <h2>{post?.title}</h2>
                <CardText>
                    <p dangerouslySetInnerHTML={{ __html: post?.content.substring(0, 60) + "..." }}></p>
                </CardText>
                <div>
                    <Link className='btn btn-secondary' to={`/post/${post?.postId}`}>Read More</Link>
                </div>
            </CardBody>
        </Card>
    )
}

export default Post