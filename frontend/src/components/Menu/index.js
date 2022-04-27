/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from "@emotion/react";
import { useState } from "react";
import MenuItems from "./Components/MenuItems";
import Navbar from "./Components/Navbar";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

// From: https://github.com/hyamero/sorting-menu
function Menu() {
    const [all, setAll] = useState(true);
    const [breakfast, setBreakfast] = useState(false);
    const [lunch, setLunch] = useState(false);
    const [dinner, setDinner] = useState(false);
    const [MenuData, setMenuData] = useState([]);

    let { restaurantName } = useParams();
    
    

    useEffect(() => {
        fetch("http://127.0.0.1:8000/restaurants/get_menu/" + restaurantName +"/",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Token " + localStorage.getItem("restifyToken"),
                },
            })
        .then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    for (var i = 0; i < data.length; i++) {
                        data[i].id = data[i].get_id;
                        data[i].title = data[i].food_name;
                        data[i].category = data[i].category;
                        data[i].price = data[i].price;
                        data[i].desc = data[i].description;
                    }
                    setMenuData(data);
                });
            }
        });
    }, []);

    return (
        <div
            className="App"
            css={css`
                background: #f0eff1;
                height: 100%;
            `}
        >
            <Navbar
                setAll={setAll}
                setBreakfast={setBreakfast}
                setLunch={setLunch}
                setDinner={setDinner}
                restaurant_name={restaurantName}
            />

            <MenuItems
                items={MenuData}
                all={all}
                breakfast={breakfast}
                lunch={lunch}
                dinner={dinner}
            />

            <Global
                styles={css`
                    @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap");

                    ::selection {
                        background: #000;
                        color: #f0eff1;
                    }

                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        font-family: "Poppins", sans-serif;
                        --webkit-tap-highlight-color: transparent;
                    }

                    body::-webkit-scrollbar {
                        width: 12px; /* width of the entire scrollbar */
                    }

                    body::-webkit-scrollbar-track {
                        background: #f0eff1; /* color of the tracking area */
                    }

                    body::-webkit-scrollbar-thumb {
                        background-color: #444444; /* color of the scroll thumb */
                        border-radius: 20px; /* roundness of the scroll thumb */
                        border: 3px solid #f0eff1; /* creates padding around scroll thumb */
                    }

                    body {
                        background: #f0eff1;
                    }

                    .container {
                        width: 80%;
                        margin: auto;
                    }
                `}
            />
        </div>
    );
}

export default Menu;
