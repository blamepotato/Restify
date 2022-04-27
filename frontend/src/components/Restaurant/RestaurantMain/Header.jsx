import "./header.css";
import React from "react";

// https://www.youtube.com/watch?v=tlTdbc5byAs&ab_channel=LamaDev
export default function Header({ restaurantName }) {
    const [images, setImages] = React.useState([]);

    // fetch restaurant Image
    React.useEffect(() => {
        fetch(
            "http://127.0.0.1:8000/restaurants/get_image/" +
                restaurantName +
                "/",
            {
                method: "GET",
                headers: {
                    Authorization:
                        "Token " + localStorage.getItem("restifyToken"),
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    setImages(data);
                });
            } else {
                // return 404 page
                console.log("404");
            }
        });
    }, []);

    // get the source of the first image
    let imageSource = "";
    if (images.length > 0) {
        imageSource = images[0].image;
    }
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleLg">{restaurantName}</span>
            </div>
            <img className="headerImg" src={imageSource} />
        </div>
    );
}
