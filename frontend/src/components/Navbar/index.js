import { Outlet, useNavigate } from "react-router-dom";
import React, {useEffect} from 'react';
import logo from "../images/Resify-logo-new.png";
import {Navbar, NavDropdown, Container, Nav, Tooltip, OverlayTrigger, NavLink} from 'react-bootstrap';
import { Plus, Search, House, Bell, Book, Heart, People} from 'react-bootstrap-icons';

// https://react-bootstrap.github.io/components/navbar/
// https://stackoverflow.com/questions/51235582/how-to-add-req-user-to-fetch-request
// https://stackoverflow.com/questions/50664632/remove-an-item-from-local-storage-in-reactjs
// https://react-bootstrap.github.io/components/modal/

const RenderNavbar = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        if (!(localStorage.getItem("restifyToken"))){
            navigate("../../notLogIn")
        }
    }, [])

    const LogOut = (e) => {
        e.preventDefault()
        localStorage.removeItem('restifyToken')
        localStorage.removeItem('username')
        navigate("../../signIn");
    }

    return <>
    <Navbar bg="light" expand="lg" sticky="top">
            <Container fluid>
                <img
                    src={logo}
                    width="50"
                    height="50"
                    className="d-inline-block align-top"
                    style={{marginLeft: "5%"}}
                />

                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" style={{marginLeft: "62%"}}>
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <OverlayTrigger placement='bottom' overlay={<Tooltip><div>Search</div></Tooltip>}>
                            <NavLink onClick={()=>navigate("../../../socials/search")}><Search size={25}></Search></NavLink>
                        </OverlayTrigger>

                        <OverlayTrigger placement='bottom' overlay={<Tooltip><div>Home Page</div></Tooltip>}>
                            <NavLink onClick={()=>navigate("../../../home")}><House size={25}></House></NavLink>
                        </OverlayTrigger>

                        <OverlayTrigger placement='bottom' overlay={<Tooltip><div>Create A Blog</div></Tooltip>}>
                            <NavLink onClick={()=>navigate("../../../socials/createBlog")}><Plus size={25}></Plus></NavLink>
                        </OverlayTrigger>

                        <OverlayTrigger placement='bottom' overlay={<Tooltip><div>Notifications</div></Tooltip>}>
                            <NavLink onClick={()=>navigate("../../../socials/notifications")}><Bell size={25}></Bell></NavLink>
                        </OverlayTrigger>

                        <OverlayTrigger placement='bottom' overlay={<Tooltip><div>Feed</div></Tooltip>}>
                            <NavLink onClick={()=>navigate("../../../socials/feed")}><Book size={25}></Book></NavLink>
                        </OverlayTrigger>

                        <OverlayTrigger placement='bottom' overlay={<Tooltip><div>Favourite</div></Tooltip>}>
                            <Nav.Link onClick={()=>navigate("../../../socials/favourite")}><Heart size={25}></Heart></Nav.Link>
                        </OverlayTrigger>

                        <NavDropdown title="Account" id="account">
                            <NavDropdown.Item onClick={()=>navigate("../../../profile")}>My Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>navigate("../../../profile/edit")}>Edit Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={event => LogOut(event)}>Log Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <h5 style={{marginTop:"1%"}}><b>Welcome, {localStorage.getItem("username")}</b></h5>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Outlet />
    </>
}

export default RenderNavbar