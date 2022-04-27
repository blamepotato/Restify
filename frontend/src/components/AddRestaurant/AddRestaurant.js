import React from "react";
import { useState } from "react";

import { Container, Grid, TextField, Button, Input } from "@material-ui/core";
// import Image from '../images/details.jpg';
import { useNavigate } from "react-router-dom";
import { width } from "@material-ui/system";
import MuiPhoneNumber from 'material-ui-phone-number';


const AddRestaurant = () => {
    const [nameState, setName] = useState("");
    const [addressState, setAddress] = useState("");
    const [postalCodeState, setPostalCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [nameNotification, setNameNotification] = useState(true);
    const [addressNotification, setAddressNotification] = useState(true);
    const [postalCodeNotification, setPostalCodeNotification] = useState(true);
    const [phoneNumberNotification, setPhoneNumberNotification] = useState(true);
    const navigate = useNavigate();
    const routeChange = () => {
        let path = "/restaurant/followup";
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
        if (nameState && addressState && postalCodeState && phoneNumber) {
            const formData = new FormData();
            formData.append("restaurant_name", nameState);
            formData.append("address", addressState);
            formData.append("postal_code", postalCodeState);
            formData.append("phone_number", phoneNumber);
            fetch("http://127.0.0.1:8000/restaurants/create/", {
                method: "POST",
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
        }  
        else{
            // check if name already exists from database
            fetch("http://127.0.0.1:8000/restaurants/get/" + restaurantName + "/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                if (response.ok) {
                    setName("");
                    setNameNotification(false);
                } else if (response.status === 404) {
                    setName(restaurantName.trim());
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

        <Container component="main" maxWidth="xs">
            <div>
                <h3>Creating Your Own Restaurant</h3>
                <form>
                    <Grid
                        container
                        spacing={1}
                        alignItems="center"
                        justifyContent="center"
                        style={{ minHeight: "50vh"}}
                    >
                        <Grid>
                            <TextField
                                error={!nameNotification}
                                placeholder="Your restaurant name"
                                label="Your restaurant name"
                                onBlur={(e) => validate_name(e.target.value)}
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
                                onBlur={(e) => validate_address(e.target.value)}
                                autoComplete="address"
                                fullWidth
                                helperText={
                                    !addressNotification
                                        ? "Address cannot be empty"
                                        : ""
                                }
                                style={{ marginTop: "4em" }}
                            />

                            <TextField
                                error={!postalCodeNotification}
                                placeholder="Postal code"
                                label="Postal code"
                                onBlur={(e) =>
                                    validate_postal_code(e.target.value)
                                }
                                autoComplete="postalCode"
                                fullWidth
                                helperText={
                                    !postalCodeNotification
                                        ? "Postal code cannot be empty"
                                        : ""
                                }
                                style={{ marginTop: "4em" }}
                            />

                            <MuiPhoneNumber defaultCountry={'us'}
                                error={!phoneNumberNotification}
                                placeholder="Phone number"
                                label= "Phone number"
                                onBlur={(e) =>
                                    validate_phone_number(e.target.value)
                                }
                                autoComplete="phoneNumber"
                                fullWidth
                                helperText={
                                    !phoneNumberNotification
                                        ? "Phone number is not complete"
                                        : ""
                                }
                                style={{ marginTop: "4em" }}
                            />

                            <Button
                                onClick={Submit}
                                type="submit"
                                size="large"
                                variant="contained"
                                color="primary"
                                style={{
                                    marginTop: "4em",
                                    position: "relative",
                                    left: "35%",
                                }}
                            >
                                Create your restaurant
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
        // </Paper>
    );
};

export default AddRestaurant;