import {Row, Col, ListGroup, Card} from 'react-bootstrap'
import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button'
import {Link, Outlet} from "react-router-dom";
import welcome from "../images/welcome.jpeg";
import {MDBContainer} from "mdb-react-ui-kit";
import {Container} from "@material-ui/core";
import Image from "react-bootstrap/Image";
import LikedBtn from "../LikeBtn";
import SimpleImageSlider from "react-simple-image-slider";

// https://www.sololearn.com/Discuss/226630/how-to-make-font-bigger-than-h1-tag
// https://react-bootstrap.netlify.app/components/carousel/#carousels
// https://react-bootstrap.github.io/components/overlays/

const ImageSlide = ({ blogID }) =>{
    const [images, setImages] = useState([])

    useEffect(()=>{
        fetch("http://localhost:8000/socials/get_blog_image/"+blogID+"/", {
            method:"GET",
            headers:{
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(json =>{
                json.map(image=>{
                    var url = image.image
                    setImages(images=>[...images, {url}])
                })
            })

    }, [])

    return <Container className="align-items-center">
        {images.length>0?<SimpleImageSlider
            width={500}
            height={250}
            images = {images}
            showNavs = {true}
            showBullets = {true}
            navStyle = {2}
            style={{marginLeft:"125px"}}>
        </SimpleImageSlider>:<div/>}
    </Container>
}

const HomePage = () => {
    const [rest, setRest] = useState([])
    const [blogs, setBlogs] = useState([])
    const [notification, setNotification] = useState("")
    const [notification1, setNotification1] = useState("")

    useEffect(() => {
        fetch("http://127.0.0.1:8000/restaurants/get_random_rests/", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + localStorage.getItem("restifyToken"),
            }
        })
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setRest(data.results)
                        if (data.count === 0) {
                            setNotification("Waiting for more restaurants...")
                        } else {
                            setNotification("")
                        }
                    })
                }
            });
        fetch("http://127.0.0.1:8000/socials/get_random_blogs/", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + localStorage.getItem("restifyToken"),
            }
        })
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setBlogs(data.results)
                        if (data.count === 0) {
                            setNotification1("Waiting for more blogs...")
                        } else {
                            setNotification1("")
                        }
                    })
                }
            });
    }, [])


    return <>
        <MDBContainer fluid style={{height: "100%", backgroundColor: "#e9ebed"}}>
            <h1 style={{textAlign: "center"}}>Home</h1>
            <h3 style={{marginLeft: "30%"}}> Recommend Restaurants </h3>
            <h3 style={{marginLeft: "80%"}}> Recommend Blogs </h3>
            <h3 style={{marginLeft: "30%"}}> { notification } </h3>
            <h3 style={{marginLeft: "80%"}}> { notification1 } </h3>
            <Row>
                <Col style={{marginLeft: "1%"}}>
                    {rest.map((r, index) => {
                        if (index % 2 === 0){
                            return <>
                                <Card key={r.id} style={{ width: '100%', marginBottom: "3%", marginTop: "3%", marginRight: "auto", marginLeft: "auto"}}>
                                    <Card.Img variant="top" src={"http://127.0.0.1:8000"+r.logo} />
                                    <Card.Body>
                                        <Card.Title>Name: {r.restaurant_name} </Card.Title>
                                        <Card.Text> Description: {r.description} </Card.Text>
                                        <Card.Text> Address: {r.address} {r.postal_code}</Card.Text>
                                        <Card.Text> Phone Number: {r.phone_number} </Card.Text>
                                        <Button href={"../restaurant/" + r.restaurant_name} variant="light">Click to see more information!</Button>
                                    </Card.Body>
                                </Card>
                            </>
                        }
                    })}
                </Col>
                <Col style={{marginTop: "2%"}}>
                    {rest.map((r, index) => {
                        if (index % 2 === 1){
                            return <>
                                <Card key={r.id} style={{ width: '100%', marginBottom: "3%", marginTop: "3%", marginRight: "auto", marginLeft: "auto"}}>
                                    <Card.Img variant="top" src={"http://127.0.0.1:8000"+r.logo} />
                                    <Card.Body>
                                        <Card.Title>Name: {r.restaurant_name} </Card.Title>
                                        <Card.Text> Description: {r.description} </Card.Text>
                                        <Card.Text> Address: {r.address} {r.postal_code}</Card.Text>
                                        <Card.Text> Phone Number: {r.phone_number} </Card.Text>
                                        <Button href={"../restaurant/" + r.restaurant_name} variant="light">Click to see more information!</Button>
                                    </Card.Body>
                                </Card>
                            </>
                        }
                    })}
                </Col>
                <Col style={{marginTop: "2%"}}>
                    {blogs.map(blog=>(
                        <Card style={{width:"100%"}} key={blog.id} id={blog.id}>
                            <Card.Header key={blog.id + " header"}>
                                <Image src={"http://127.0.0.1:8000"+blog.logo} width={"100"} height="100"></Image>
                                <span style={{marginLeft:"1%", fontSize:"25px"}}>{blog.restaurant}</span>
                                <h3 style={{marginLeft:"40%"}}>{blog.title}</h3>
                            </Card.Header>
                            <ListGroup as="ul" >
                                <ListGroup.Item key={blog.id+ " images"}>
                                    <ImageSlide blogID={blog.id}></ImageSlide>
                                </ListGroup.Item>
                                <ListGroup.Item key={blog.id +" content"}>
                                    <h6>{blog.content}</h6>
                                </ListGroup.Item>
                            </ListGroup>
                            <Card.Footer>
                                <LikedBtn blogID={blog.id} numLikes={blog.num_likes} initState={blog.liked_users.indexOf(localStorage.getItem("username")) > -1?true:false}>
                                </LikedBtn>
                            </Card.Footer>
                        </Card>
                    ))}
                </Col>
            </Row>
        </MDBContainer>
    </>
}

export default HomePage