import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { getCategories } from '../Services/Category'

const CategorySideMenu = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        getCategories().then(cat => {
            setCategories([...cat])
        }).catch(err => toast.error(err))
    }, [])
    return (
        <div className='mt-5'>
            <ListGroup className='shadow' tag={Link} to="/">
                <ListGroupItem action={true} >
                    All Blogs
                </ListGroupItem>
                {
                    categories && categories.map(cat => (
                        <ListGroupItem key={cat.categoryId} action={true} tag={Link} to={`/category/${cat.categoryId}`}>
                            {cat.categoryTitle}
                        </ListGroupItem>
                    ))
                }
            </ListGroup>
        </div>
    )
}

export default CategorySideMenu