import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup'
import React, {useContext, useEffect, useState} from 'react';
import { notificationAPIContext } from "../../context/notificationAPIContext";

const Table = () =>{
    const { notifications } = useContext(notificationAPIContext)

    return <Card style={{textAlign: "center", width: "30rem"}}>
        <ListGroup as="ul">
            {notifications.map(notification => (
                <ListGroup.Item as="li" key={notification.id}>
                    {notification.user?notification.user:"An Anonymous"} {notification.action} your {notification.Target === "blog"?"blog":"restaurant"}
                </ListGroup.Item>
            ))}
        </ListGroup>

    </Card>
    
    
}

const MyAccount = () =>{
    const [firstName, setFirstName] = useState("Joe")
    const [lastName, setLastName] = useState("Doe")
    const [phoneNumber, setPhoneNumber] = useState("xxx-xxx-xxxx")
    const [email, setEmail] = useState("xxx@xxx.xxx")
    const [birthday, setBirthday] = useState("xxxx-xx-xx")
    const [restaurant, setRestaurant] = useState("xxxxxxx")
    const [following, setFollowing] = useState(0)
    const [follower, setFollower] = useState(0)
    const [numPost, setNumPost] = useState(0)
    const [avatar, setAvatar] = useState("https://media.geeksforgeeks.org/wp-content/uploads/20210425000233/test-300x297.png")

    const { setNotifications } = useContext(notificationAPIContext)

    const username = localStorage.getItem("username")

    useEffect(()=>{
        fetch("http://127.0.0.1:8000/accounts/user/"+username+"/details", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(json => {
            setFirstName(json.first_name);
            setLastName(json.last_name)
            setPhoneNumber(json.phone_number)
            setEmail(json.email)
            setBirthday(json.birthday)
            setFollowing(json.following)
            setRestaurant(json.restaurant_name)
            if (json.avatar){
                setAvatar(json.avatar)
            }
            return json.restaurant_name
        })
        .then(restaurant_name =>{
            if(restaurant_name){
                fetch("http://127.0.0.1:8000/restaurants/get/" +restaurant_name+"/", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => response.json())
                .then(json => {
                    setFollower(json.num_follower)
                    setNumPost(json.num_blog)
                })
            }
            

            fetch("http://127.0.0.1:8000/socials/get_notification/", {
                method: "GET",
                headers: {
                    'Authorization': "Token "+ localStorage.getItem("restifyToken"),
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(json => {
                setNotifications(json.results)
            })
        })
    }, [])

    return (<> 
    <Container fluid>
        <Row className="justify-content-start px-10">
            <h1 style={{marginLeft: '10%'}}>Home</h1>
        </Row>
        <Row className="justify-content-end px-10">
            <Col md="auto" style={{marginTop: "3%"}}>
                <Image src={avatar} roundedCircle width="297" height="300"/>
            </Col>

            <Col className="col-9" style = {{marginTop: "8%"}}>
                <Row className = "align-items-start ">
                    <Col className = "col-12 mt-20">
                        <div className="h4"> {username} </div>
                    </Col>
                </Row>
                <Row className="align-items-start pt-5">
                    <Col className="col-4">
                        <div className="h5">{numPost} Posts</div>
                    </Col>

                    <Col className="col-4">
                        <div className="h5">{follower} followers</div>
                    </Col>

                    <Col className="col-4">
                        <div className="h5">Following {following}</div>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Container className="pt-5" style={{marginLeft: '10%'}}>
            <Row>
            <Col className="col-sm">
                <h1 className="display-6"> Personal Information</h1>
                <Card style={{textAlign: "center", width: "30rem"}}>
                    <ListGroup as="ul">
                        <ListGroup.Item as="li">Full Name: {firstName} {lastName}</ListGroup.Item>
                        <ListGroup.Item as="li">Contract Number: {phoneNumber}</ListGroup.Item>
                        <ListGroup.Item as="li">Email: {email}</ListGroup.Item>
                        <ListGroup.Item as="li">Birthday: {birthday} </ListGroup.Item>
                        <ListGroup.Item as="li">Your Restaurant: {restaurant}</ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
            <Col>
                <h1 className="display-6"> Newest Notification</h1>
                <Table />
            </Col>
            </Row>
        </Container>   
    </Container>
    </>)
}

export default MyAccount;