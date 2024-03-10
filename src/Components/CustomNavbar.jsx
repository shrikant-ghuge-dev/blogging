import React, { useState } from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { NavLink as Link, useNavigate } from 'react-router-dom';
import { Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap';
import { getCurrentUserDetails, isLoggedIn, logout } from '../Auth';
import userContext from '../Context/UserContext';

function CustomNavbar() {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(undefined);
    const userContextData = useContext(userContext)

    useEffect(() => {
        setIsLogin(isLoggedIn());
        setUser(getCurrentUserDetails());
    }, [isLogin])

    const doLogout = () => {
        logout(() => {
            setIsLogin(false);
            userContextData.setUser({
                data: null,
                isLogin: false
            })
            navigate("/")
        })
    }

    const toggle = () => setIsOpen(!isOpen);
    return (
        <div>
            <Navbar color="dark" dark expand="md" className='px-4'>
                <NavbarBrand tag={Link} to="/">MyBlog</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink li tag={Link} to="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink li tag={Link} to="/user/add-blog">Post Blog</NavLink>
                        </NavItem>

                        {/* <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Options
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>
                                    Option 1
                                </DropdownItem>
                                <DropdownItem>
                                    Option 2
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Reset
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown> */}
                    </Nav>
                    <Nav navbar>
                        {userContextData?.user?.isLogin ? <>
                            <NavItem>
                                <NavLink tag={Link} to={`/user/profile/${user?.id}`}>{userContextData.user.data?.name}</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={doLogout}>Logout</NavLink>
                            </NavItem>
                        </> :
                            <>
                                <NavItem>
                                    <NavLink tag={Link} to="/login">Login</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to="/signup">Signup</NavLink>
                                </NavItem>
                            </>}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default CustomNavbar;
