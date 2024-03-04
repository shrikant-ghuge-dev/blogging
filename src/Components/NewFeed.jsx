import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Col, Container, Pagination, PaginationItem, PaginationLink, Row } from 'reactstrap'
import { getAllPost } from '../Services/PostService'
import Post from './Post'
import InfiniteScroll from 'react-infinite-scroll-component';

function NewFeed() {
    const [posts, setPosts] = useState({
        content: [],
        totalPages: '',
        totalElements: '',
        pageSize: '',
        lastPage: false,
        pageNumber: ''
    })

    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        changePage(currentPage)
    }, [currentPage])

    const changePage = (pageNumber = 0, pageSize = 5) => {
        if (pageNumber > posts?.pageNumber && posts?.lastPage) {
            return
        }
        if (pageNumber < posts?.pageNumber && posts?.pageNumber === 0) {
            return
        }
        getAllPost(pageNumber, pageSize).then(data => {
            setPosts({
                content: [...posts.content, ...data.content],
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                pageSize: data.pageSize,
                lastPage: data.lastPage,
                pageNumber: data.pageNumber
            })
        }).catch(error => {
            toast.error(error);
        })
    }

    const changePageInfinite = () => {
        setCurrentPage(currentPage + 1)
    }
    return (
        <div className="container-fluid">
            <Row>
                <Col md={{
                    size: 10,
                    offset: 1
                }}>
                    <h1>Blogs Count ({posts?.totalElements})</h1>

                    <InfiniteScroll
                        dataLength={posts?.content.length} next={changePageInfinite} hasMore={!posts?.lastPage} loader={<h4>Loading...</h4>}>
                        {posts?.content?.map(post => (
                            <Post key={post.postId} post={post} />
                        ))}
                    </InfiniteScroll>

                    {/* <Container className="m-3">
                        <Pagination>
                            <PaginationItem onClick={() => changePage(posts.pageNumber - 1)} disabled={posts.pageNumber === 0}>
                                <PaginationLink previous>

                                </PaginationLink>
                            </PaginationItem>
                            {
                                [...Array(posts?.totalPages)].map((item, index) => (
                                    < PaginationItem active={index === posts.pageNumber} key={index} onClick={() => changePage(index)}>
                                        <PaginationLink>
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))

                            }
                            <PaginationItem onClick={() => changePage(posts.pageNumber + 1)} disabled={posts.lastPage}>
                                <PaginationLink next>
                                </PaginationLink>
                            </PaginationItem>
                        </Pagination>
                    </Container> */}
                </Col>
            </Row>
        </div >
    )
}

export default NewFeed