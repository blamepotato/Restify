import React from 'react'
import Menu from '../Menu'
import Container from 'react-bootstrap/Container'
import RestaurantSideBar from "./RestaurantSideBar";

const MenuPage = () => {
  return (
    <>
        <Container fluid>
            <div className = "row p-0 flex-nowrap" >
                <div className="col-3" style={{"paddingLeft": 0, "backgroundColor": "#415973"}}>
                    <RestaurantSideBar/>
                </div>
                <div className="col-9 pt-5 md-auto">
                    <Menu />    
                </div>
            </div>
        </Container>
    </>
  )
}

export default MenuPage