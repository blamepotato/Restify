import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Tooltip } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { useNavigate } from "react-router";

const EditMyAccount = () => {
    const [name_notification, setNameNotification] = useState("");
    const [email_notification, setEmailNotification] = useState("");
    const [phone_number_notification, setPhoneNumberNotification] =
        useState("");
    const [submit_notification, setSubmitNotification] = useState("");
    const [nameState, setNameState] = useState(true);
    const [emailState, setEmailState] = useState(true);
    const [phone_number_State, setPhoneNumberState] = useState(true);
    const [buttonState, setButtonState] = useState(false);
    const [user, setUser] = useState({});
    const [avatar, setAvatar] = useState(
        "https://media.geeksforgeeks.org/wp-content/uploads/20210425000233/test-300x297.png"
    );

    var username = localStorage.getItem("username");
    const navigate = useNavigate();
    const validateName = (name) => {
        var message = "Name should only contain alphbets";
        var reg = /^[A-Za-z]+$/;

        if (reg.test(name) === false) {
            setNameState(false);
            setNameNotification(message);
        } else {
            setNameState(true);
            setNameNotification("");
        }
    };

    const validateEmail = (email) => {
        var message = "Email is invalid";
        var reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})$/;
        if (reg.test(email) === false) {
            setEmailState(false);
            setEmailNotification(message);
        } else {
            setEmailState(true);
            setEmailNotification("");
        }
    };

    const validatePhoneNumber = (phone_number) => {
        var message = "Phone Number is invalid";
        const reg = /^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-/\s.]?[0-9]{4}$/;
        console.log(phone_number);
        if (phone_number.length >= 1) {
            if (reg.test(phone_number) === false) {
                setPhoneNumberState(false);
                setPhoneNumberNotification(message);
            } else {
                setPhoneNumberState(true);
                setPhoneNumberNotification("");
            }
        } else {
            setPhoneNumberState(true);
            setPhoneNumberNotification("");
        }
    };
    useEffect(() => {
        if (!nameState || !emailState || !phone_number_State) {
            setButtonState(true);
        } else {
            setButtonState(false);
        }
    }, [nameState, emailState, phone_number_State]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/accounts/user/" + username + "/details/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((json) => {
                setUser(json);
                return json;
            })
            .then((json) => {
                if (json.avatar) {
                    setAvatar(json.avatar);
                }
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        var { firstname, lastname, email, phone_number, birthday } =
            document.forms[0];
        const formData = new FormData();
        formData.append("first_name", firstname.value);
        formData.append("last_name", lastname.value);
        formData.append("email", email.value);
        formData.append("birthday", birthday.value);
        formData.append("phone_number", phone_number.value);
        fetch("http://127.0.0.1:8000/accounts/user/update/", {
            method: "PATCH",
            headers: {
                Authorization: "Token " + localStorage.getItem("restifyToken"),
            },
            body: formData,
        }).then((response) => {
            if (response.ok) {
                navigate("../../../profile");
            } else if (response.status === 404) {
                navigate("../../../notFound");
            } else if (response.status === 400) {
                navigate("../../../badRequest");
            }
        });
    };

    const handleChange = (e) => {
        if (e.target.value) {
            setAvatar(URL.createObjectURL(e.target.files[0]));
            const formData = new FormData();
            formData.append("avatar", e.target.files[0]);
            fetch("http://127.0.0.1:8000/accounts/user/update/", {
                method: "PATCH",
                headers: {
                    Authorization:
                        "Token " + localStorage.getItem("restifyToken"),
                },
                body: formData,
            });
        }
    };

    return (
        <>
            <h1 style={{ marginLeft: "10%" }}>Edit Profile</h1>
            <Form className="form-inline" onSubmit={(e) => handleSubmit(e)}>
                <div className="submit_notification" style={{ color: "red" }}>
                    {submit_notification}
                </div>
                <div
                    className="bg-white p-3"
                    style={{ margin: "3% 20% 10% 5%" }}
                >
                    <Container>
                        <Form.Group className="input-group mb-4">
                            <Form.Control
                                name="avatar"
                                type="file"
                                hidden
                                id="avatar"
                                accept="image/*"
                                onChange={(e) => handleChange(e)}
                            ></Form.Control>
                            <OverlayTrigger
                                placement="auto"
                                overlay={<Tooltip>Change Your Avatar</Tooltip>}
                            >
                                <Form.Label
                                    htmlFor="avatar"
                                    onMouseEnter={(e) =>
                                        (e.target.style = { opacity: "0.5" })
                                    }
                                >
                                    {" "}
                                    <Image
                                        src={avatar}
                                        roundedCircle
                                        width="297"
                                        height="300"
                                        htmlFor="avatar"
                                        id="avatarImg"
                                    />{" "}
                                </Form.Label>
                            </OverlayTrigger>
                        </Form.Group>
                    </Container>
                    <div className="name_notification" style={{ color: "red" }}>
                        {name_notification}
                    </div>
                    <Row>
                        <Col>
                            <Form.Group
                                className="input-group mb-4"
                                controlId="firstname"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="First Name"
                                    defaultValue={user.first_name}
                                    onChange={(e) =>
                                        validateName(e.target.value)
                                    }
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group
                                className="input-group mb-4"
                                controlId="lastname"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Last Name"
                                    defaultValue={user.last_name}
                                    onChange={(e) =>
                                        validateName(e.target.value)
                                    }
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <div
                        className="email_notification"
                        style={{ color: "red" }}
                    >
                        {email_notification}
                    </div>
                    <Form.Group className="input-group mb-4" controlId="email">
                        <Form.Control
                            type="text"
                            placeholder="Email"
                            defaultValue={user.email}
                            onChange={(e) => validateEmail(e.target.value)}
                        />
                    </Form.Group>

                    <div
                        className="phone_number_notification"
                        style={{ color: "red" }}
                    >
                        {phone_number_notification}
                    </div>
                    <Form.Group
                        className="input-group mb-4"
                        controlId="phone_number"
                    >
                        <Form.Control
                            type="text"
                            placeholder="phone_number(123-456-7890)"
                            defaultValue={user.phone_number}
                            onChange={(e) =>
                                validatePhoneNumber(e.target.value)
                            }
                        />
                    </Form.Group>

                    <Form.Group
                        className="input-group mb-4"
                        controlId="birthday"
                    >
                        <Form.Control
                            name="birthday"
                            type="text"
                            placeholder="birthday"
                            defaultValue={user.birthday}
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => (e.target.type = "text")}
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        className="w-50 btn btn-lg btn-success"
                        style={{ marginLeft: "50%" }}
                        disabled={buttonState}
                    >
                        Submit
                    </Button>
                </div>
            </Form>
        </>
    );
};

export default EditMyAccount;
