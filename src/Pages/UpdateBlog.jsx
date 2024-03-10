import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import userContext from '../Context/UserContext'
import { loadPostDetails, updateBlogPost } from '../Services/PostService'
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap'
import JoditEditor from 'jodit-react';
import { getCategories } from '../Services/Category'

const UpdateBlog = () => {
    const editor = useRef(null);
    const { blogId } = useParams()
    const obj = useContext(userContext)
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then(data => {
            setCategories(data)
        }).catch(error => {
            console.log(error)
        })

        loadPostDetails(blogId).then(data => {
            setPost({ ...data, categoryId: data.category.categoryId })
        }).catch(error => console.log(error))
    }, [])

    const onUpdatePost = (e) => {
        e.preventDefault()
        updateBlogPost({ ...post, category: { categoryId: post.categoryId } }, post.postId).then(res => toast.success("Post updated successfully!")).catch(error => toast.error(error))
    }

    const fieldChange = (event) => {
        setPost({ ...post, [event.target.name]: event.target.value })
    }

    const updateHtml = () => {
        return (
            <div className='wrapper'>
                <Card className='shadow'>
                    <CardBody>
                        <h3>Update Blog</h3>
                        <Form onSubmit={onUpdatePost}>
                            <div className='my-3'>
                                <Label for="title">Post Title</Label>
                                <Input type='text' id='title' name='title' placeholder='Title' value={post.title} onChange={(e) => fieldChange(e)}></Input>
                            </div>
                            <div className='my-3'>
                                <Label for="content">Post Content</Label>
                                <JoditEditor ref={editor} value={post.content} onChange={newContent => setPost({ ...post, content: newContent })}></JoditEditor>
                            </div>
                            <div className="mt-">
                                <Label for="image">Select Banner Image</Label>
                                <Input id="image" type='file' />
                            </div>
                            <div className='my-3'>
                                <Label for="catrgory">Post Category</Label>
                                <Input type='select' id='categoryId' name='categoryId' placeholder='Select Category' onChange={(e) => fieldChange(e)} value={post.categoryId}>
                                    <option value={0} disabled>--Select Category--</option>
                                    {
                                        categories.map(category => {
                                            return <option key={category.categoryId} value={category.categoryId}>{category.categoryTitle}</option>

                                        })
                                    }
                                </Input>
                            </div>
                            <Container className='text-center'>
                                <Button color='primary' type='submit'>Update Post</Button>
                            </Container>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        )
    }

    useEffect(() => {
        if (post) {
            if (post?.user?.id !== obj?.user?.data?.id) {
                toast.error("This is not your post!")
                navigate("/")
            }
        }
    }, [post])
    return (
        <Container>{post && updateHtml()}</Container>
    )
}

export default UpdateBlog