import React from "react";
import { useState } from "react";

import { Grid, TextField, Button, Input } from "@material-ui/core";
// import Image from '../images/details.jpg';
import { useNavigate } from "react-router-dom";
import { width } from "@material-ui/system";
import MuiPhoneNumber from "material-ui-phone-number";
import FileUploadComponent from "../../FileUploads/FileUpload";
import { useEffect } from "react";
import RestaurantSideBar from "../RestaurantSideBar";
import Container from "react-bootstrap/Container";

const EditRestaurant = () => {
    const [nameState, setName] = useState("");
    const [addressState, setAddress] = useState("");
    const [postalCodeState, setPostalCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [nameNotification, setNameNotification] = useState(true);
    const [addressNotification, setAddressNotification] = useState(true);
    const [postalCodeNotification, setPostalCodeNotification] = useState(true);
    const [phoneNumberNotification, setPhoneNumberNotification] =
        useState(true);
    const [logo, setLogo] = React.useState([]);
    const [images, setImages] = React.useState([]);
    const navigate = useNavigate();

    console.log(logo);
    // fetch restaurant info
    useEffect(() => {
        fetch(
            "http://127.0.0.1:8000/restaurants/get/" +
                localStorage.getItem("restaurant") +
                "/",
            {
                method: "GET",
                headers: {
                    Authorization:
                        "Token " + localStorage.getItem("restifyToken"),
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    setName(data.restaurant_name);
                    setAddress(data.address);
                    setPostalCode(data.postal_code);
                    setPhoneNumber(data.phone_number);
                });
            } else {
                navigate("../../../notFound");
            }
        });
    }, []);

    const routeChange = () => {
        let path = "/restaurant/" + localStorage.getItem("restaurant");
        navigate(path, {
            state: {
                name: nameState,
                address: addressState,
                postalCode: postalCodeState,
                phoneNumber: phoneNumber,
            },
        });
    };
    // for continue event listener
    const Submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        // loop through images and upload each one
        for (let img of images) {
            formData.append("image", img);
            fetch("http://127.0.0.1:8000/restaurants/add_image/", {
                method: "POST",
                headers: {
                    Authorization:
                        "Token " + localStorage.getItem("restifyToken"),
                },
                body: formData,
            }).then((response) => {
                if (!response.ok) {
                    alert("Error");
                    console.log(response);
                } 
            });
        }

        if (nameState && addressState && postalCodeState && phoneNumber) {
            const formData = new FormData();
            formData.append("restaurant_name", nameState);
            formData.append("address", addressState);
            formData.append("postal_code", postalCodeState);
            formData.append("phone_number", phoneNumber);
            if (logo.length > 0) {
                formData.append("logo", logo[0]);
            }
            fetch("http://127.0.0.1:8000/restaurants/update/", {
                method: "PATCH",
                headers: {
                    Authorization:
                        "Token " + localStorage.getItem("restifyToken"),
                },
                body: formData,
            }).then((response) => {
                if (!response.ok) {
                    setNameNotification(false);
                    console.log(response);
                } else {
                    localStorage.setItem("restaurant", nameState);
                    routeChange();
                }
            });
        } else {
            if (!nameState) {
                setNameNotification(false);
            }
            if (!addressState) {
                setAddressNotification(false);
            }
            if (!postalCodeState) {
                setPostalCodeNotification(false);
            }
            if (!phoneNumber) {
                setPhoneNumberNotification(false);
            }
        }
    };

    const validate_name = (restaurantName) => {
        if (restaurantName.length < 1) {
            setName("");
            setNameNotification(false);
        } else {
            // check if name already exists from database
            fetch(
                "http://127.0.0.1:8000/restaurants/get/" + restaurantName + "/",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ).then((response) => {
                if (response.ok) {
                    setName("");
                    setNameNotification(false);
                } else if (response.status === 404) {
                    setName(restaurantName);
                    setNameNotification(true);
                } else {
                    alert("Error: " + response.status);
                    setName("");
                    setNameNotification(false);
                }
            });
        }
    };

    const validate_address = (address) => {
        if (address.length > 0) {
            setAddress(address);
            setAddressNotification(true);
        } else {
            setAddress("");
            setAddressNotification(false);
        }
    };

    const validate_postal_code = (postalCode) => {
        if (postalCode.length > 0) {
            setPostalCode(postalCode);
            setPostalCodeNotification(true);
        } else {
            setPostalCode("");
            setPostalCodeNotification(false);
        }
    };

    const validate_phone_number = (phoneNumber) => {
        if (phoneNumber.length > 7) {
            setPhoneNumber(phoneNumber);
            setPhoneNumberNotification(true);
        } else {
            setPhoneNumber("");
            setPhoneNumberNotification(false);
        }
    };

    return (
        // <Paper style={styles.paperContainer}>
        <Container fluid>
            <div className="row p-0 flex-nowrap">
                <div
                    className="col-3"
                    style={{ paddingLeft: 0, backgroundColor: "#415973" }}
                >
                    <RestaurantSideBar />
                </div>
                <div className="col-9 pt-5 md-auto">
                    <div>
                        <h3 style={{ textAlign: "center", color: "#415973" }}>
                            {" "}
                            Update Your Restaurant
                        </h3>
                        <form>
                            <Grid
                                container
                                spacing={1}
                                alignItems="center"
                                justifyContent="center"
                                style={{ minHeight: "50vh" }}
                            >
                                <Grid>
                                    <TextField
                                        error={!nameNotification}
                                        placeholder="Your restaurant name"
                                        label="Your restaurant name"
                                        value={nameState}
                                        onChange={(e) =>
                                            validate_name(e.target.value)
                                        }
                                        autoComplete="email"
                                        helperText={
                                            !nameNotification
                                                ? "A restaurant with this name already exists"
                                                : ""
                                        }
                                        fullWidth
                                    />

                                    <TextField
                                        error={!addressNotification}
                                        placeholder="Your restaurant's address"
                                        label="Your restaurant's address"
                                        value={addressState}
                                        onChange={(e) =>
                                            validate_address(e.target.value)
                                        }
                                        autoComplete="address"
                                        fullWidth
                                        helperText={
                                            !addressNotification
                                                ? "Address cannot be empty"
                                                : ""
                                        }
                                        style={{ marginTop: "2em" }}
                                    />

                                    <TextField
                                        error={!postalCodeNotification}
                                        placeholder="Postal code"
                                        label="Postal code"
                                        value={postalCodeState}
                                        onChange={(e) =>
                                            validate_postal_code(e.target.value)
                                        }
                                        autoComplete="postalCode"
                                        fullWidth
                                        helperText={
                                            !postalCodeNotification
                                                ? "Postal code cannot be empty"
                                                : ""
                                        }
                                        style={{ marginTop: "2em" }}
                                    />

                                    <MuiPhoneNumber
                                        defaultCountry={"us"}
                                        error={!phoneNumberNotification}
                                        placeholder="Phone number"
                                        value={phoneNumber}
                                        label="Phone number"
                                        onChange={(e) =>
                                            validate_phone_number(
                                                e.target.value
                                            )
                                        }
                                        autoComplete="phoneNumber"
                                        fullWidth
                                        helperText={
                                            !phoneNumberNotification
                                                ? "Phone number is not complete"
                                                : ""
                                        }
                                        style={{ marginTop: "2em" }}
                                    />

                                    <h2
                                        style={{
                                            textAlign: "center",
                                            marginBottom: "5%",
                                            marginTop: "5%",
                                        }}
                                    >
                                        <b>Upload a new logo</b>
                                    </h2>

                                    <FileUploadComponent
                                        allowed={1}
                                        setState={setLogo}
                                    />

                                    <h2
                                        style={{
                                            textAlign: "center",
                                            marginBottom: "5%",
                                            marginTop: "5%",
                                        }}
                                    >
                                        <b>Expend your gallery!</b>
                                    </h2>
                                    <FileUploadComponent
                                        allowed={5}
                                        setState={setImages}
                                    />

                                    <Button
                                        onClick={Submit}
                                        type="submit"
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        style={{
                                            marginTop: "2em",
                                            position: "relative",
                                            left: "35%",
                                        }}
                                    >
                                        Update
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </div>
            </div>
        </Container>

        // </Paper>
    );
};

export default EditRestaurant;
