import {
    Navbar,
    NavDropdown,
    Container,
    Nav,
    Tooltip,
    OverlayTrigger,
    NavLink,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Route, useParams } from "react-router-dom";
import { HouseFill, CameraFill } from "react-bootstrap-icons";
import React from "react";
import { Outlet } from "react-router-dom";

const RestaurantSideBar = () => {
    const navigate = useNavigate();
    let { restaurantName } = useParams();
    let baseurl = "../../../restaurant/" + restaurantName + "/";
    return (
        <>
            <div
                className="align-items-end align-items-sm-end px-4 text-white min-vh-100"
                sticky="top"
                style={{ width: "100%", paddingTop: "7em", height: "100%"}}
            >
                <Navbar id="About Us">
                    <Container className="fs-4" bg="primary">
                        <NavLink onClick={() => navigate(baseurl)}>
                            {" "}
                            <HouseFill className="text-white"> </HouseFill>
                            <span className="ms-1 d-none d-sm-inline text-white">
                                {" "}
                                About Us{" "}
                            </span>{" "}
                        </NavLink>
                    </Container>
                </Navbar>

                <Navbar id="Menu">
                    <Container className="fs-4">
                        <NavLink onClick={() => navigate(baseurl + "menu")}>
                            {" "}
                            <HouseFill className="text-white"> </HouseFill>{" "}
                            <span className="ms-1 d-none d-sm-inline text-white">
                                {" "}
                                Menu{" "}
                            </span>{" "}
                        </NavLink>
                    </Container>
                </Navbar>

                <Navbar id="Gallery">
                    <Container className="fs-4">
                        <NavLink onClick={() => navigate(baseurl + "gallery")}>
                            {" "}
                            <CameraFill className="text-white"></CameraFill>{" "}
                            <span className="ms-1 d-none d-sm-inline text-white">
                                {" "}
                                Gallery{" "}
                            </span>{" "}
                        </NavLink>
                    </Container>
                </Navbar>

                <Navbar id="Blogs">
                    <Container className="fs-4">
                        <NavLink onClick={() => navigate(baseurl + "blog")}>
                            {" "}
                            <CameraFill className="text-white"></CameraFill>{" "}
                            <span className="ms-1 d-none d-sm-inline text-white">
                                {" "}
                                Our Blogs{" "}
                            </span>
                        </NavLink>
                    </Container>
                </Navbar>

                {localStorage.getItem("restaurant") === restaurantName ? (
                    <>
                        <Navbar id="Blogs">
                            <Container className="fs-4">
                                <NavLink
                                    onClick={() =>
                                        navigate(baseurl + "edit-menu")
                                    }
                                >
                                    <CameraFill className="text-white"></CameraFill>
                                    <span className="ms-1 d-none d-sm-inline text-white">
                                        Edit Menu
                                    </span>
                                </NavLink>
                            </Container>
                        </Navbar>
                        <Navbar id="Blogs">
                            <Container className="fs-4">
                                <NavLink
                                    onClick={() =>
                                        navigate(baseurl + "edit-restaurant")
                                    }
                                >
                                    <CameraFill className="text-white"></CameraFill>
                                    <span className="ms-1 d-none d-sm-inline text-white">
                                        Edit Restaurant
                                    </span>
                                </NavLink>
                            </Container>
                        </Navbar>
                    </>
                ) : (
                    ""
                )}
            </div>
            <Outlet />
        </>
    );
};

export default RestaurantSideBar;
