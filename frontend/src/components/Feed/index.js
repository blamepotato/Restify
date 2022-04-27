import React, {useRef, useCallback, useContext, useState, useEffect} from "react"
import Card from 'react-bootstrap/Card'
import { Container, Row, Col, Tooltip, ListGroup } from 'react-bootstrap';
import { feedAPIContext } from "../../context/feedAPIContext";
import Image from 'react-bootstrap/Image'
import SimpleImageSlider from "react-simple-image-slider"
import "./style.css"
import LikedBtn from "../LikeBtn";

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

const Table = () =>{
    const { blogs } = useContext(feedAPIContext)

    return <Row style= {{marginTop: "8%"}} className="align-items-center">
        <h1 style={{textAlign: "center"}}> Feed </h1>
        <Col className="col-12 col-sm-6 col-md-8 ">
            {blogs.length>0?blogs.map(blog=>(
                <Card style={{width:"95%", marginTop: "3%", marginLeft: "25%"}} key={blog.id} id={blog.id}>
                    <Card.Header key={blog.id + " header"}>
                        <Image src={blog.logo} width={"100"} height="100"></Image>
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
            )):<h2 style={{paddingLeft: "50%"}}>You have not followed a restaurant/Your followed restaurant(s) have not posted a blog yet</h2>}
        </Col>
    </Row>
}

const Feed = () => {
    const [hasMore, setHasMore] = useState(true)
    const [start, setStart] = useState(1)
    const [loading, setLoading] = useState(false)
    const { setBlogs } = useContext(feedAPIContext)
    const loader = useRef(null);

    const getBlog = () =>{
        setLoading(true)
        fetch("http://localhost:8000/socials/feed/?page="+start, {
            method: "GET",
            headers: {
                'Authorization': "Token "+localStorage.getItem("restifyToken"),
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(json =>{
            if (json.results) {
                setBlogs(blogs => [...blogs, ...json.results])
            }
            if (!json.next){
                setHasMore(false)
            }
        })
        setTimeout(()=>{
            setLoading(false)
        }, 50)
    }


    useEffect(()=>{
        if (loading===false && hasMore===true){
            getBlog()
        }
    }, [start, loading])

    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        
        if (target.isIntersecting && hasMore === true && loading===false){
            setStart(start+1)
        }
        
    }, []);

    useEffect(() => {
        const option = {
          root: null,
          rootMargin: "20px",
          threshold: 0
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (loader.current) observer.observe(loader.current);
      }, [handleObserver]);
    

    return <>
        <Container className="align-items-center">
            <Table />
            <div ref={loader} />
        </Container>
    </>
}

export default Feed;