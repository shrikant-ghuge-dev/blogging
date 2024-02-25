import React, { useState } from 'react'
import { useEffect } from 'react';
import { NavLink as Link, useNavigate } from 'react-router-dom';
import { Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap';
import { getCurrentUserDetails, isLoggedIn, logout } from '../Auth';

function CustomNavbar() {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        setIsLogin(isLoggedIn());
        setUser(getCurrentUserDetails());
        console.log("called")
    }, [isLogin])

    const doLogout = () => {
        logout(() => {
            setIsLogin(false);
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

                        <UncontrolledDropdown nav inNavbar>
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
                        </UncontrolledDropdown>
                    </Nav>
                    <Nav navbar>
                        {isLogin ? <>
                            <NavItem>
                                <NavLink tag={Link} to="/signup">Profile</NavLink>
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
