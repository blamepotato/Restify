import React from "react";
import {
    Container,
} from "@material-ui/core";
import FileUploadComponent from "../FileUploads/FileUpload";
import { Form, Row, Col } from "react-bootstrap";
import { MDBContainer } from 'mdb-react-ui-kit';
import { Button} from "@material-ui/core";
import { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom";


function Description() {
    const location = useLocation();
    const [name, setName] = useState("");
    const [logo, setLogo] = React.useState([]);
    const [images, setImages] = React.useState([]);
    const [valid, setValid] = React.useState(false);

    const navigate = useNavigate();
    const routeChange = () => {
        let path = "../../../profile";
        navigate(path);
    };

    const Submit = (e) => {
        e.preventDefault();
        console.log(logo)
        console.log(logo[0])
        const formData = new FormData();
        formData.append("restaurant_name", location.state.name);
        formData.append("address", location.state.address);
        formData.append("description", name);
        formData.append("postal_code", location.state.postalCode);
        formData.append("phone_number", location.state.phoneNumber);
        formData.append("logo", logo[0]);
        fetch('http://127.0.0.1:8000/restaurants/update/', {
            method: 'PATCH',
            headers: {
                'Authorization': "Token "+ localStorage.getItem("restifyToken"),
            },
            body: formData,
        }).then((response) => {
            if (!response.ok) {
                alert("Error");
                console.log(response);
            } 
        }
        );
        // loop through images and upload each one
        for(let img of images){
            formData.append("image", img);
            fetch('http://127.0.0.1:8000/restaurants/add_image/', {
                method: 'POST',
                headers: {
                    'Authorization': "Token "+ localStorage.getItem("restifyToken"),
                },
                body: formData,
            }).then((response) => {
                if (!response.ok) {
                    alert("Error");
                    console.log(response);
                } else {
                    routeChange();
                }
            }
        );
        }
    }
    
    const setStory = (story) => {
        setName(story);
    }

    useEffect(() => {
        setValid(name.length > 0 && logo.length > 0 && images.length > 0);
    }, [name, logo, images]);

    return (
        <MDBContainer 
        fluid
        style={{height: "100%", backgroundColor: "#e9ebed"}}
        > 
         
            <Container 
            className="justify-content-center"
            style={{paddingTop: "3%", paddingBottom: "10%", width: "60%"}}
            >

                <Form 
                className="bg-white shadow-lg p-5 rounded"
               >
                   <h2 
                   style={{textAlign: "center", marginBottom: "5%"}}
                   ><b>Tell us about your restaurant</b></h2>
                    <Form.Group
                        xs={5}
                        className="mb-3"
                        
                    >
                        <Form.Control 
                        as="textarea" 
                        rows={11}
                        placeholder="What is your story?"
                        onBlur={(e)=>setStory(e.target.value)}
                        />
                    </Form.Group>

                    <h2 
                   style={{textAlign: "center", marginBottom: "5%", marginTop: "5%"}}
                   ><b>Pick a logo for {location.state.name}</b></h2>
                    <FileUploadComponent allowed={1} setState={setLogo}/>

                    <h2 
                   style={{textAlign: "center", marginBottom: "5%", marginTop: "5%"}}
                   ><b>Finally, add some images to your restaurant</b></h2>
                    <FileUploadComponent allowed={3} setState={setImages}/>
                    
                    <Button
                                onClick={Submit}
                                type="submit"
                                size="large"
                                variant="contained"
                                color="primary"
                                disabled={!valid}
                                style={{
                                    marginTop: "4em",   
                                    position: "relative",
                                    left: "85%",
                                }}
                            >
                                Submit
                            </Button>
                </Form>

            </Container>
        </MDBContainer>
    );

   
}

export default Description;
