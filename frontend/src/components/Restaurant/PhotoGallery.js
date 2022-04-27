import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import Gallery from 'react-photo-gallery';
import { useParams } from 'react-router';
import RestaurantSideBar from "./RestaurantSideBar";

const PhotoGalleryComp = () => {
  const {restaurantName} = useParams()
  const [images, setImages] = useState([])
  const [fetched, setFetched] = useState(false)

  useEffect(()=>{
    fetch("http://127.0.0.1:8000/restaurants/get_image/"+restaurantName+"/", {
      method: "GET",
      headers:{
        'Content-Type': 'application/json',
    }
    })
    .then(response=>response.json())
    .then(json=>{
      setFetched(true)
      json.forEach(element => {
        var img = element.image
        setImages((images)=>[...images, {src:img, width:4, height:4}])
      });
    })

  }, []);

  if(fetched ==true){
    console.log(images)
    return (
      <Container>
        <h1> PhotoGallery </h1>
        <Gallery photos={images}/>
      </Container>
    )
  }
  return (<div>still loading</div>)

}

const PhotoGallery = () => {
  return (
    <>
        <Container fluid>
            <div className = "row p-0 flex-nowrap" >
                <div className="col-3" style={{"paddingLeft": 0, "backgroundColor": "#415973"}}>
                    <RestaurantSideBar/>
                </div>
                <div className="col-9 pt-5 md-auto">
                    <PhotoGalleryComp />    
                </div>
            </div>
        </Container>
    </>
  )
}

export default PhotoGallery