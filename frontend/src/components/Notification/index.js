import React, {useContext, useEffect, useState} from 'react';
import {ListGroup, ListGroupItem, Pagination} from 'react-bootstrap';
import {notificationAPIContext} from "../../context/notificationAPIContext";
import {Container} from "@material-ui/core";
import {MDBContainer} from "mdb-react-ui-kit";

// https://react-bootstrap.github.io/components/list-group/
const Notification = () =>{
    const { notifications } = useContext(notificationAPIContext)
    const { setNotifications } = useContext(notificationAPIContext)
    const [page, setPage] = useState(1)
    const [pagenotification, setPageNotification] = useState("")
    const [next, setNext] = useState(true)
    const [prev, setPrev] = useState(true)

    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/socials/get_notification?page=${page}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + localStorage.getItem("restifyToken"),
            }
        })
            .then((response) => {
                if (response.ok){
                    setPageNotification("")
                    response.json().then((data) =>{
                        setNotifications(data.results)
                        if (data.next === null){
                            setNext(false)
                        }
                        else{
                            setNext(true)
                        }

                        if (data.previous === null){
                            setPrev(false)
                        }
                        else {
                            setPrev(true)
                        }
                    })
                }
                else if (response.status === 404){
                    setPageNotification("No more pages")
                }})
    }, [page, next, prev])

    const NextPagination = () => {
        if (next){
            return <>
                <Pagination.Next onClick={()=>setPage(page + 1)}/>
            </>
        }
        else {
            return <>
                <Pagination.Next disabled/>
            </>
        }
    }

    const PrevPagination = () => {
        if (prev){
            return <>
                <Pagination.Prev onClick={()=>setPage(page - 1)}/>
            </>
        }
        else {
            return <>
                <Pagination.Prev disabled/>
            </>
        }
    }

    return <>
    <MDBContainer fluid style={{height: "100%", backgroundColor: "#e9ebed"}}>
            <Container className="justify-content-center" style={{paddingTop: "3%", paddingBottom: "10%", width: "60%"}}>
                <h5 style={{textAlign: "center", marginBottom: "3%", marginTop: "3%"}}><b>Your Notifications:</b></h5>
                <ListGroup>
                    {notifications.map(notification => (
                        <ListGroupItem key={notification.id} style={{textAlign: "center"}}>
                            {notification.action==="like" ?
                                `${notification.name} Liked your ${notification.Target} at ${notification.created_at}` : notification.action==="comment" ?
                                    `${notification.name} Commented your ${notification.Target} at ${notification.created_at}`: notification.action==="follow" ?
                                        `${notification.name} followed your ${notification.Target} at ${notification.created_at}` : notification.action==="make" ?
                                            `${notification.name} made a ${notification.Target} at ${notification.created_at}` : `${notification.name}  updated their ${notification.Target} at ${notification.created_at}`}
                        </ListGroupItem>
                    ))}
                </ListGroup>

                <div style={{color: "red"}}>{pagenotification}</div>
                <Pagination style={{ marginBottom: "3%", marginTop: "3%", marginRight: "auto", marginLeft: "auto"}} className="justify-content-center">
                    <PrevPagination/>
                    <NextPagination/>
                </Pagination>

            </Container>
        </MDBContainer>
    </>
}

export default Notification
