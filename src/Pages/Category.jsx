import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Col, Container, Row } from 'reactstrap'
import CategorySideMenu from '../Components/CategorySideMenu'
import Post from '../Components/Post'
import { getPostsByCategory } from '../Services/PostService'

const Category = () => {
    const catId = useParams()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        getPostsByCategory(catId.catId).then(data => {
            setPosts([...data])
        }).catch(error => toast.error(error))
    }, [catId])
    return (
        <Container>
            <Row>
                <Col md={3}>
                    <CategorySideMenu />
                </Col>
                <Col md={9}>
                    <h1>Blogs Count({posts.length})</h1>
                    {
                        posts && posts.map(post => (
                            <Post post={post} />
                        ))
                    }
                    {posts.length <= 0 ? <h1>No posts in this category</h1> : ''}
                </Col>
            </Row>
        </Container>
    )
}

export default Category