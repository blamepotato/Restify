import React, {useState, useEffect} from "react";
import { Route, useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import RestaurantSideBar from "./RestaurantSideBar";
import Header from "./RestaurantMain/Header.jsx";
import { Heart, HeartFill} from "react-bootstrap-icons";
import {Card, Form, Pagination} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {MDBContainer} from "mdb-react-ui-kit";
import {useNavigate} from "react-router-dom";


const RestaurantLike = ({restaurantName, numLikes, initState}) =>{
    const [liked, setLiked] = useState(initState)
    const [num_likes, setNumLikes] = useState(numLikes)

    const handleClick = () =>{
        if (liked === true){
            setLiked(false)
            fetch("http://localhost:8000/socials/unlike_restaurant/"+restaurantName+"/", {
                method:"DELETE",
                headers:{
                    'Authorization': "Token "+localStorage.getItem("restifyToken"),
                    'Content-Type': 'application/json',
                }
            })
            .then(response =>{
                if (response.ok){
                    setNumLikes((liked)=>liked-1)
                    return response.json()
                }
                else{
                    throw new Error("oops, Something went wrong")
                }
            })
            .catch((error)=>{
                alert("You have not liked this restaurant yet")
            })
        }
        else if(liked === false){
            setLiked(true)
            fetch("http://localhost:8000/socials/like_restaurant/"+restaurantName+"/", {
                method:"POST",
                headers:{
                    'Authorization': "Token "+localStorage.getItem("restifyToken"),
                    'Content-Type': 'application/json',
                }
            })
            .then(response =>{
                if (response.ok){
                    return response.json()
                }
                else{
                    throw new Error("oops, Something went wrong")
                }
            })
            .then(json=>{
                setNumLikes(json.num_likes)
            })
            .then(()=>console.log(num_likes))
            .catch((error)=>{
                alert("You Liked this restaurant")
            })
        }
    }

    return 
}

const RestaurantPage = () => {
    const navigate = useNavigate()
    let { restaurantName } = useParams();
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [description, setDescription] = useState("");
    const [logo, setLogo] = useState("");
    const [numFollower, setNumFollower] = useState(0);
    const [numLike, setNumLike] = useState(0);
    const [liked_users, setLikedUsers] = useState([]);
    const [numBlogs, setNumBlogs] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState("")
    const [followed, setFollowed] = useState(false)
    const [followed_users, setFollowedUsers] = useState([])
    const [fetched, setFetched] = useState(false)
    const [liked, setLiked] = useState(false)
    const [comments, setComments] = useState([])
    const [input, setInput] = useState("")
    const [notification, setNotification] = useState("")
    const [error, setError] = useState("")
    const [check, setCheck] = useState(true)
    const [page, setPage] = useState(1)
    const [pagenotification, setPageNotification] = useState("")
    const [next, setNext] = useState(true)
    const [prev, setPrev] = useState(true)

    function getComment() {
        fetch("http://127.0.0.1:8000/socials/get_comments/"+restaurantName+"/"+"?page="+page, {
            method: "GET",
            headers: {
                'Authorization': "Token "+localStorage.getItem("restifyToken"),
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setComments(data.results);
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
                    });
                }
                else if (response.status === 404){
                    navigate("../../../notFound")
                }
            })
    }


    function getData() {
        fetch("http://127.0.0.1:8000/restaurants/get/"+restaurantName+"/", {
            method: "GET",
            headers: {
                'Authorization': "Token "+localStorage.getItem("restifyToken"),
                "Content-Type": "application/json",
                
            },
        })
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        console.log(data)
                        setFetched(true)
                        setAddress(data.address);
                        setPostalCode(data.postal_code);
                        setDescription(data.description);
                        setLogo(data.logo);
                        setNumFollower(data.num_follower);
                        setNumLike(data.num_like);
                        setLikedUsers(()=>[...data.liked_users]);
                        setNumBlogs(data.num_blog);
                        setPhoneNumber(data.phone_number)
                        setFollowedUsers(data.followed_users)
                        if (data.followed_users.indexOf(localStorage.getItem("username"))>-1){
                            setFollowed(true)
                        }
                        if (data.liked_users.indexOf(localStorage.getItem("username"))>-1){
                            setLiked(true)
                        }
                    });
                }
                else {
                    navigate("../../../notFound")
                }
            })
        }

    useEffect(() => {
        getData()
        getComment()
    }, [followed, liked, page, next, prev]);

    const handleClick = () =>{
        if (liked === true){
            setLiked(false)
            fetch("http://localhost:8000/socials/unlike_restaurant/"+restaurantName+"/", {
                method:"DELETE",
                headers:{
                    'Authorization': "Token "+localStorage.getItem("restifyToken"),
                    'Content-Type': 'application/json',
                }
            })
            .then(response =>{
                if (response.ok){
                    setNumLike((liked)=>liked-1)
                    return response.json()
                }
                else{
                    throw new Error("oops, Something went wrong")
                }
            })
            .catch((error)=>{
                alert("You have not liked this restaurant yet")
            })
        }
        else if(liked === false){
            setLiked(true)
            fetch("http://localhost:8000/socials/like_restaurant/"+restaurantName+"/", {
                method:"POST",
                headers:{
                    'Authorization': "Token "+localStorage.getItem("restifyToken"),
                    'Content-Type': 'application/json',
                }
            })
            .then(response =>{
                if (response.ok){
                    return response.json()
                }
                else{
                    throw new Error("oops, Something went wrong")
                }
            })
            .then(json=>{
                setNumLike((liked)=>liked+1)
            })
            .catch((error)=>{
                alert("You Liked this restaurant")
            })
        }
    }

    const submit = (e) => {
        e.preventDefault()
        fetch("http://localhost:8000/socials/comment/"+restaurantName+"/", {
            method:"POST",
            headers:{
                'Authorization': "Token "+localStorage.getItem("restifyToken"),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    "content":input
                }
            )
        }).then((response) => {
            if (response.ok) {
               setNotification("You have added a comment!")
            }
            else if (response.status === 404){
                navigate("../../../notFound")
            }
            else if (response.status === 400){
                navigate("../../../badRequest")
            }
            else{
                setNotification("Something goes wrong...")
            }
        })
    }

    const Checkcontent = (content) => {
        var notification = "Comment cannot be empty or only spaces!";
        var regex = /^(?=.*\S).+$/
        if(regex.test(content)){
            setInput(content);
            setCheck(false);
            setError("");
        }
        else{
            setCheck(true);
            setError(notification);
        }
    }

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


    const render = (
        <Container fluid>
            <div className = "row p-0 flex-nowrap" >
                <div className="col-3" style={{"paddingLeft": 0, "backgroundColor": "#415973"}}>
                    <RestaurantSideBar/>
                </div>

                <MDBContainer fluid style={{height: "100%", backgroundColor: "#e9ebed"}}>
                    <div className="col-9 md-auto">
                        <Header restaurantName={restaurantName} pass_logo={logo}/>
                        <Button variant="light" onClick={handleClick}>
                            {liked?<HeartFill></HeartFill>:<Heart></Heart>} {numLike} Likes
                        </Button>
                    </div>
                    <></>
                    <Container className="justify-content-center" style={{paddingTop: "2%", paddingBottom: "10%", width: "60%"}}>
                        <Card.Body> <h1> Number of Followers: {numFollower}  |  Number of Likes: {numLike} </h1></Card.Body>
                        <Card.Body> <h2> Address: {address} </h2> </Card.Body>
                        <Card.Body> <h2> Phone Number: {phoneNumber} </h2> </Card.Body>
                        <Card.Body> <h2> Postal Code: {postalCode} </h2> </Card.Body>
                        <Card.Body> <h2> Number of Blogs: {numBlogs} </h2> </Card.Body>
                        <Card.Body> <h2> Description: {description} </h2> </Card.Body>
                        <Button variant="danger"
                                onClick={(e) => followunfollow(e)}>{followed? "Unfollow" : "Follow"}</Button>
                    </Container>

                    <h1> Comments </h1>
                    <Container className="align-items-start" style={{paddingTop: "2%", paddingBottom: "10%", width: "60%", marginLeft:"0%"}}>
                        {comments.map(comment => 
                            <h2> {comment.user}: {comment.content} </h2>
                        )}

                        <Pagination style={{ marginBottom: "3%", marginTop: "3%", marginRight: "auto", marginLeft: "auto"}} className="justify-content-center">
                            <PrevPagination/>
                            <NextPagination/>
                        </Pagination>

                    </Container>

                    <Container className="justify-content-center" style={{paddingTop: "2%", paddingBottom: "10%", width: "60%", marginLeft:"0%"}}>
                    <h2
                        style={{textAlign: "center", marginBottom: "5%"}}
                    ><b>Add A Comment!</b></h2>
                    <Form className="bg-white shadow-lg p-5 rounded" onSubmit={submit}>
                        <h4 style={{color:"red"}}> {error} </h4>
                        <Form.Group>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                placeholder="Comment"
                                onChange={(e) => Checkcontent(e.target.value)}/>
                        </Form.Group>
                        <Button
                            type="submit"
                            size="large"
                            variant="contained"
                            color="primary"
                            style={{
                                marginTop: "4em",
                                position: "relative",
                                left: "85%",
                            }}
                            disabled={check}
                        >
                            Submit
                        </Button>
                    </Form>
                    <h3 style={{color:"red"}}> {notification} </h3>
                    </Container>
                </MDBContainer>
            </div>
        </Container>
    )

    const followunfollow = (e) =>{
        e.preventDefault()
        if (!followed){
            fetch('http://127.0.0.1:8000/socials/follow/' + restaurantName +"/", {
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
        else{
            fetch('http://127.0.0.1:8000/socials/unfollow/' + restaurantName +"/", {
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
    }


    return <>
        {fetched?render:<div>Still loading</div>}
    </>
};

export default RestaurantPage;
