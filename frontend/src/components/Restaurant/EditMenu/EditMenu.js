import React from "react";
import Card from "./Card";
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from "react-bootstrap/Container";
import RestaurantSideBar from "../RestaurantSideBar";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const useStyles = makeStyles({
    gridContainer: {
        paddingLeft: "40px",
        paddingRight: "40px",
        textAlign: "center",
    },
});

export default function EditMenu() {
    const [menu, setMenu] = React.useState([]);

    const navigate = useNavigate();
    const routeChange = () => {
        let path = "/restaurant/" + localStorage.getItem("restaurant") + "/menu/";
        navigate(path);
    };

    // fetch menu
    useEffect(() => {
        fetch(
            "http://127.0.0.1:8000/restaurants/get_menu/" +
                localStorage.getItem("restaurant") +
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
                    setMenu(data);
                });
            }
        });
    }, []);

    useEffect(() => {
        console.log(menu);
    }, [menu]);

    const list = menu.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
            {console.log(item)}
            <Card
                name1={item.food_name}
                price1={item.price}
                description1={item.description}
                category1={item.category}
                menu={menu}
                setMenu={setMenu}
                isNew={false}
            />
        </Grid>
    ));

    // submit menu
    const submitMenu = () => {
        
        fetch(
            "http://127.0.0.1:8000/restaurants/edit_menu/",
            {
                method: "PUT",
                headers: {
                    Authorization:
                        "Token " + localStorage.getItem("restifyToken"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(menu),
            }
        ).then((response) => {
            if (!response.ok) {
                console.log("error");
            } else {
                console.log("success");
                routeChange();
            }
        });
    };

    const classes = useStyles();
    return (
        <Container fluid>
            <div className="row p-0 flex-nowrap">
                <div
                    className="col-3"
                    style={{ paddingLeft: 0, backgroundColor: "#415973" }}
                >
                    <RestaurantSideBar />
                </div>
                <div className="col-9 md-auto">
                    <Grid
                        container
                        spacing={4}
                        className={classes.gridContainer}
                        justify="center"
                    >
                        {list}

                        <Grid item xs={12} sm={6} md={4}>
                            <Card
                                name1={""}
                                price1={""}
                                description1={""}
                                category1={"Breakfast"}
                                menu={menu}
                                setMenu={setMenu}
                                isNew={true}
                            />
                        </Grid>
                    </Grid>

                    <Button
                        onClick={submitMenu}
                        type="submit"
                        size="large"
                        variant="contained"
                        color="primary"
                        style={{
                            marginTop: "4em",
                            position: "relative",
                            left: "35%",
                        }}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </Container>
    );
}
