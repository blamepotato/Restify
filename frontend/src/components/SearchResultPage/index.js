import React, {useEffect, useState} from 'react';
import {Card, Pagination} from 'react-bootstrap';
import {Grid, Input, TextField, Container, Button, FormControl} from "@material-ui/core";
import {MDBContainer} from "mdb-react-ui-kit";

// https://reactnavigation.org/docs/params/
// https://react-bootstrap.github.io/components/pagination/

const Search = () =>{
    const [notification, setNotification] = useState("")
    const [input, setInput] = useState("")
    const [result, setResult] = useState([])
    const [page, setPage] = useState(1)
    const [next, setNext] = useState(true)
    const [prev, setPrev] = useState(true)

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/restaurants/search/?search=${input}&page=${page}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + localStorage.getItem("restifyToken"),
            }
        })
            .then((response) => {
                if (response.ok){
                    response.json().then((data) =>{
                        setResult(data.results)
                        if (data.next === null){
                            setNext(false)
                        }
                        else{
                            setNext(true)
                        }

                        if (data.previous === null){
                            setPrev(false)
                        }
                        else{
                            setPrev(true)
                        }

                        if (data.count === 0){
                            setNotification("Nothing found! Try something else!")
                        }
                        else{
                            setNotification("")
                        }
                    })
                }})
    }, [page, next, prev, input, notification])

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
                <TextField
                    placeholder="Your search input"
                    label="Your search input"
                    onChange={(e) => setInput(e.target.value)}
                    fullWidth
                />
                <h4 style={{textAlign: "center", marginTop: "3%"}}><b>Your Search Results:</b></h4>
                <div style={{textAlign: "center"}}>All restaurants are loaded at first!</div>
                <div style={{textAlign: "center"}}>You can search through them by their name, foods, or address</div>
                <h6 style={{textAlign: "center", marginBottom: "3%", marginTop: "3%"}}>{notification}</h6>

                <div>
                    {result.map(r => (
                        <Card key={r.id} style={{ width: '50%', marginBottom: "3%", marginTop: "3%", marginRight: "auto", marginLeft: "auto"}}>
                            <Card.Img variant="top" src={r.logo} />
                            <Card.Body>
                                <Card.Title>Name: {r.restaurant_name} </Card.Title>
                                <Card.Text> Description: {r.description} </Card.Text>
                                <Card.Text> Address: {r.address} {r.postal_code}</Card.Text>
                                <Card.Text> Phone Number: {r.phone_number} </Card.Text>
                                <Button href={"../restaurant/" + r.restaurant_name}>Click to see more information!</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>

                <Pagination style={{ marginBottom: "3%", marginTop: "3%", marginRight: "auto", marginLeft: "auto"}} className="justify-content-center">
                    <PrevPagination />
                    <NextPagination />
                </Pagination>
            </Container>
        </MDBContainer>
    </>
}


export default Search