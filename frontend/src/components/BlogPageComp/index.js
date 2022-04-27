import React, {useRef, useCallback, useContext, useState, useEffect} from "react"
import Card from 'react-bootstrap/Card'
import { Container, Row, Col, Tooltip, ListGroup } from 'react-bootstrap';
import { feedAPIContext } from "../../context/feedAPIContext";
import Image from 'react-bootstrap/Image'
import SimpleImageSlider from "react-simple-image-slider"
import LikedBtn from "../LikeBtn";
import { useParams } from "react-router-dom";

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
        <Col className="col-12 col-sm-6 col-md-8 ">
            {blogs.map(blog=>(
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
            ))}
        </Col>
    </Row>
}

const BlogPageComp = () => {
    const [hasMore, setHasMore] = useState(true)
    const [start, setStart] = useState(1)
    const [loading, setLoading] = useState(false)

    const { blogs, setBlogs } = useContext(feedAPIContext)

    const loader = useRef(null);

    const {restaurantName} = useParams()

    const getBlog = () =>{
        setLoading(true)
        fetch("http://localhost:8000/socials/get_blog/"+restaurantName+"/?page="+start, {
            method: "GET",
            headers: {
                'Authorization': "Token "+localStorage.getItem("restifyToken"),
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if(response.ok){
                return response.json()
            }
            else{
                setHasMore(false)
                throw new Error("something went wrong")
            }
        })
        .then(json =>{
            if (json.results.length>0){
                setBlogs(blogs=>[...blogs, ...json.results])
            }
            if (!json.next){
                setHasMore(false)
            }
        })
        .catch((error)=>{
            console.log(error)
        })
        setTimeout(()=>{
            setLoading(false)
        }, 50)
    }


    useEffect(()=>{
        if (loading==false && hasMore==true){
            getBlog()
        }
    }, [start, loading])

    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        
        if (target.isIntersecting && hasMore == true && loading==false){
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
            {blogs.length>0?<Table />:<div>This restaurant does not have any blog</div>}
            <div ref={loader} />
        </Container>
    </>
}

export default BlogPageComp;