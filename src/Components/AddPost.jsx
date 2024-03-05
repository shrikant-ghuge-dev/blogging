import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap'
import { getCategories } from '../Services/Category'
import JoditEditor from 'jodit-react';
import { toast } from 'react-toastify'
import { addBlogPost, imageUpload } from '../Services/PostService'
import { getCurrentUserDetails } from '../Auth'

function AddPost() {
    const editor = useRef(null);
    const [user, setUser] = useState(undefined);
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState(null)
    const [postData, setPostData] = useState({
        title: '',
        content: '',
        categoryId: 0
    })
    useEffect(() => {
        setUser(getCurrentUserDetails())
        getCategories().then(data => {
            setCategories(data)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const fieldChange = (event) => {
        setPostData({ ...postData, [event.target.name]: event.target.value })
    }

    const contentFieldChange = (data) => {
        setPostData({ ...postData, 'content': data });
    }

    const onAddPost = (e) => {
        e.preventDefault();

        if (postData.title.trim() === "") {
            toast.error("Post title required");
            return
        }
        if (postData.content.trim() === "") {
            toast.error("Post content required");
            return
        }
        if (postData.categoryId === 0) {
            toast.error("Post category required");
            return
        }

        postData['userId'] = user.id;
        addBlogPost(postData).then(res => {
            imageUpload(image, res?.postId).then(response => {
                toast.success("Image uploaded successfully!")
            }).catch(error => { toast.error("Image upload failed") })
            toast.success("Post created successfully!")
            setPostData({
                title: '',
                content: '',
                categoryId: ''
            })
        }).catch(error => {
            toast.error(error)
        })
    }

    const fileChangeHandler = (e) => {
        if (e.target.files[0].type === "image/png" || e.target.files[0].type === "image/jpg" || e.target.files[0].type === "image/jpeg") {
            setImage(e.target.files[0])
        } else {
            return
        }
        console.log(e.target.files[0])
    }
    return (
        <div className='wrapper'>
            <Card className='shadow'>
                <CardBody>
                    <h3>Post Blog</h3>
                    <Form onSubmit={onAddPost}>
                        <div className='my-3'>
                            <Label for="title">Post Title</Label>
                            <Input type='text' id='title' name='title' placeholder='Title' value={postData.title} onChange={(e) => fieldChange(e)}></Input>
                        </div>
                        <div className='my-3'>
                            <Label for="content">Post Content</Label>
                            <JoditEditor ref={editor} value={postData.content} onChange={contentFieldChange}></JoditEditor>
                        </div>
                        <div className="mt-">
                            <Label for="image">Select Banner Image</Label>
                            <Input id="image" type='file' onChange={fileChangeHandler} />
                        </div>
                        <div className='my-3'>
                            <Label for="catrgory">Post Category</Label>
                            <Input type='select' id='categoryId' name='categoryId' placeholder='Select Category' onChange={(e) => fieldChange(e)} defaultValue={0}>
                                <option value={0} disabled>--Select Category--</option>
                                {
                                    categories.map(category => {
                                        return <option key={category.categoryId} value={category.categoryId}>{category.categoryTitle}</option>

                                    })
                                }
                            </Input>
                        </div>
                        <Container className='text-center'>
                            <Button color='primary' type='submit'>Create Post</Button>
                        </Container>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default AddPost