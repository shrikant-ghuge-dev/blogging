import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Button, Card, CardBody, CardText, Col, Container, Input, Row } from 'reactstrap';
import { isLoggedIn } from '../../Auth';
import { BASE_URL } from '../../Services/Helper';
import { addComment, loadPostDetails } from '../../Services/PostService';

function PostDetails() {
    const { postId } = useParams();
    const [postDetails, setPostDetails] = useState(null)
    const [comment, setComment] = useState({
        content: ''
    })
    useEffect(() => {
        loadPostDetails(postId).then(res => {
            setPostDetails(res)
        }).catch(error => toast.error(error))
    }, [])

    const getDate = (date) => {
        console.log(date)
        console.log(new Date(date).toString())
        return new Date(date).toLocaleDateString()
    }

    const submitComment = () => {
        if (!comment.content.trim()) {
            return
        }

        if (!isLoggedIn()) {
            toast.error("Login to add comment!")
            return
        }
        addComment(comment, postDetails.postId).then(res => {
            setPostDetails({ ...postDetails, comments: [...postDetails.comments, res] })
            toast.success("Added comment successfully!")
            setComment({ comment: '' })
        }).catch(error => {
            toast.error(error)
        })
    }
    return (
        <Container>
            <Link to="/">Home</Link> / <Link to="">{postDetails?.title}</Link>

            <Row>
                <Col md={{ size: 12 }}>
                    <Card className='mt-3 p-4'>
                        <CardText>
                            <i>Posted By <b>{postDetails?.user?.name}</b> on <b>{getDate(postDetails?.addedDate)}</b></i>
                        </CardText>
                        <CardText className='text-muted'>
                            {postDetails?.category?.categoryTitle}
                        </CardText>
                        <CardText>
                            <h3>{postDetails?.title}</h3>
                        </CardText>
                        <div className="image-container">
                            <img className='img-fluid' src={`${BASE_URL}/post/image/${postDetails?.imageName}`} alt="" />
                        </div>
                        <CardText className='mt-4' dangerouslySetInnerHTML={{ __html: postDetails?.content }}>
                        </CardText>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={{ size: 8, offset: 2 }}>
                    <h3>Comments({postDetails?.comments.length})</h3>

                    {
                        postDetails?.comments && postDetails?.comments.map((c, index) => (
                            <Card key={index}>
                                <CardBody>
                                    <CardText>
                                        {c.content}
                                    </CardText>
                                </CardBody>
                            </Card>
                        ))
                    }

                    <Card className='border-0'>
                        <CardBody>
                            <Input type='textarea' onChange={(e) => setComment({ content: e.target.value })} value={comment.comment} placeholder='Enter comment here' />
                            {/* <CardText>
                                {c.content}
                            </CardText> */}
                            <Button onClick={submitComment} className='mt-2' color='primary'>Submit</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default PostDetails