import Button from 'react-bootstrap/Button'
import { Heart, HeartFill} from "react-bootstrap-icons";
import React, {useState} from 'react'

const LikedBtn = ({blogID, numLikes, initState}) =>{
    const [liked, setLiked] = useState(initState)
    const [num_likes, setNumLikes] = useState(numLikes)

    const handleClick = () =>{
        if (liked === true){
            setLiked(false)
            fetch("http://localhost:8000/socials/unlike_blog/"+blogID+"/", {
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
                alert("You have not liked this blog")
            })
        }
        else if(liked === false){
            setLiked(true)
            fetch("http://localhost:8000/socials/like_blog/"+blogID+"/", {
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
            .catch((error)=>{
                alert("You Liked this blog")
            })
        }
    }

    return <>
    <Button variant="light" onClick={handleClick}>
        {liked?<HeartFill></HeartFill>:<Heart></Heart>} {num_likes} Likes
    </Button>
    </>
}

export default LikedBtn