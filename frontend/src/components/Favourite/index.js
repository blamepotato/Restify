import {Card} from 'react-bootstrap'
import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button'
import {MDBContainer} from "mdb-react-ui-kit";
import {Container} from "@material-ui/core";

const FavouritePage = () => {
    const [infos, setInfos] = useState([])
    const [followed, setFollowed] = useState(false)

    useEffect(() => {
        fetch("http://127.0.0.1:8000/accounts/user/" + localStorage.getItem("username") + "/details/", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + localStorage.getItem("restifyToken"),
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then(json =>
            {return json.followed_restaurant})
            .then((rest) => {
                rest.forEach(element => {
                    fetch("http://127.0.0.1:8000/restaurants/get/" + element, {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": "Token " + localStorage.getItem("restifyToken"),
                        }
                    }).then((response) => {
                        if (response.ok) {
                            return response.json()
                        }
                    })
                        .then(json => {setInfos(old => [...old, json])});
                })
            })
    }, [])

    const followunfollow = (e, rest_name) =>{
        e.preventDefault()
        if (followed){
            fetch('http://127.0.0.1:8000/socials/unfollow/' + rest_name+"/", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Token " + localStorage.getItem("restifyToken"),
                }
            }).then((response) =>{
                if (response.ok){
                    setFollowed(false)
                }
            })
        }
        else{
            fetch('http://127.0.0.1:8000/socials/follow/' + rest_name+"/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Token " + localStorage.getItem("restifyToken"),
                }
            }).then((response) =>{
                if (response.ok){
                    setFollowed(true)
                }
            })
        }
    }


    return <>
        <MDBContainer fluid style={{height: "100%", backgroundColor: "#e9ebed"}}>
            <Container className="justify-content-center" style={{paddingTop: "3%", paddingBottom: "10%", width: "60%"}}>
                {infos.map(info => (
                    <Card key={info.restaurant_name} style={{
                        width: '100%',
                        marginBottom: "3%",
                        marginTop: "3%",
                        marginRight: "auto",
                        marginLeft: "auto"
                    }}>
                        <Card.Img variant="top" src={info.logo}/>
                        <Card.Body>
                            <Card.Title>Name: {info.restaurant_name} </Card.Title>
                            <Card.Text> Address: {info.address} {info.postal_code}</Card.Text>
                            <Card.Text> Phone Number: {info.phone_number} </Card.Text>
                            <Button href={"../restaurant/" + info.restaurant_name} variant="light">Click to see more
                                information!</Button>
                            <Button variant="danger"
                                    onClick={(e) => followunfollow(e, info.restaurant_name)}>{followed? "Follow" : "Unfollow"}</Button>
                        </Card.Body>
                    </Card>))}
            </Container>
        </MDBContainer>
    </>
}

export default FavouritePage