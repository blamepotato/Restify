import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Container, Grid, TextField, Button, Input } from "@material-ui/core";
import { useState, useEffect } from "react";

const useStyles = makeStyles({
    root: {
        marginTop: 40,
        minWidth: 200,
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 20,
    },
    text: {
        color: "red",
    },
});

export default function OutlinedCard({
    name1,
    price1,
    description1,
    category1,
    menu,
    setMenu,
}) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    const [name, setName] = useState(name1);
    const [price, setPrice] = useState(price1);
    const [description, setDescription] = useState(description1);
    const [category, setCategory] = useState(category1);

    const nameHandler = (e) => {
        setName(e.target.value);
    };

    const priceHandler = (e) => {
        setPrice(e.target.value);
    };

    const descriptionHandler = (e) => {
        setDescription(e.target.value);
    };

    const categoryHandler = (e) => {
        setCategory(e.target.value);
    };

    useEffect(() => {
        console.log(1);
        console.log(menu);
        const food = menu.find((food) => food.food_name === name);
        console.log(food);
        if (food) {
            food.food_name = name;
            food.price = price;
            food.description = description;
            food.category = category;
            setMenu([...menu]);
        } else {
            // if name1 is not empty, then it is an edit
            if (name1) {
                // detele previous food
                const newMenu = menu.filter((food) => food.food_name !== name1);
                // add new food
                if (name && price && description && category) {
                    newMenu.push({
                        food_name: name,
                        price: price,
                        description: description,
                        category: category,
                    });
                    setMenu([...newMenu]);
                }
            } else {
                if (name && price && description && category) {
                    setMenu([
                        ...menu,
                        {
                            food_name: name,
                            price: price,
                            description: description,
                            category: category,
                        },
                    ]);
                }
            }
        }
    }, [name, price, description, category]);

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Grid container direction={"column"} spacing={2}>
                    <TextField
                        className={classes.title}
                        value={name}
                        label="Name"
                        onChange={nameHandler}
                    >
                        {name}
                    </TextField>
                    <br />
                    <TextField
                        value={price}
                        label="Price"
                        onChange={priceHandler}
                    >
                        {"$" + price}
                    </TextField>
                    <br />
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={category}
                        onChange={categoryHandler}
                        label="Category"
                    >
                        <MenuItem value={"Breakfast"}>Breakfast</MenuItem>
                        <MenuItem value={"Lunch"}>Lunch</MenuItem>
                        <MenuItem value={"Dinner"}>Dinner</MenuItem>
                    </Select>

                    <TextField
                        label="Description"
                        onChange={descriptionHandler}
                        value={description}
                        style={{ textAlign: "left" }}
                        multiline
                        rows={2}
                    >
                        {description}
                    </TextField>

                    <CardActions className={classes.text}>
                        <Button
                            size="small"
                            onClick={() => {
                                setMenu([
                                    ...menu.filter(
                                        (food) => food.food_name !== name
                                    ),
                                ]);
                            }}
                        >
                            Delete
                        </Button>
                    </CardActions>
                </Grid>
            </CardContent>
        </Card>
    );
}
