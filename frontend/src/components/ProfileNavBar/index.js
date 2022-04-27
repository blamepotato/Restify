import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { House, Award, Bootstrap, PencilSquare} from 'react-bootstrap-icons';
import React from 'react'
import {useNavigate} from "react-router-dom";


const ProfileNavBar = ({id}) => {
    const navigate = useNavigate()
    var restaurantName = localStorage.getItem("restaurant")
    if (restaurantName.length === 0){
        restaurantName = "fwafdsafdasfdawdawsdfwafasdf"
    }
    return <>
        <div className="align-items-end align-items-sm-end px-4 pt-5 text-white min-vh-100 position-fixed"> 
            <Navbar bg="light" id='home'>
                <Container className='fs-4' bg="primary">
                    <Navbar.Brand onClick={()=>navigate("../../../profile")}> <House className="text-primary"> </House><span className="ms-1 d-none d-sm-inline text-primary"> Home </span> </Navbar.Brand>
                </Container>
            </Navbar>

            <Navbar bg="light" id='My Restaurant'>
                <Container className='fs-4'>
                    <Navbar.Brand onClick={()=>navigate("../../../restaurant/"+restaurantName+"/")}> <Award className="text-primary"> </Award> <span className="ms-1 d-none d-sm-inline text-primary"> My Restaurant </span> </Navbar.Brand>
                </Container>
            </Navbar>

            <Navbar bg="light" id = 'Blogs'>
                <Container className='fs-4'>
                    <Navbar.Brand onClick={()=>navigate("../../../profile/myBlogs")}> <Bootstrap className="text-primary"></Bootstrap> <span className ="ms-1 d-none d-sm-inline text-primary"> Blogs </span> </Navbar.Brand>
                </Container>
            </Navbar>

            <Navbar bg="light" id = 'Edit Profile'>
                <Container className='fs-4'>
                    <Navbar.Brand onClick={() => navigate("../../../profile/edit")} > <PencilSquare className="text-primary"></PencilSquare> <span className ="ms-1 d-none d-sm-inline text-primary"> Edit Profile </span></Navbar.Brand>
                </Container>
            </Navbar>

            <Navbar bg="light" id = 'Add Restaurant'>
                <Container className='fs-4'>
                    <Navbar.Brand onClick={() => navigate("../../../restaurant/register")}> <PencilSquare className="text-primary"></PencilSquare> <span className ="ms-1 d-none d-sm-inline text-primary"> Add Restaurant </span></Navbar.Brand>
                </Container>
            </Navbar>

            <Navbar bg="light" id = 'Edit Restaurant' >
                <Container className='fs-4'>
                    <Navbar.Brand onClick={()=>navigate("../../../restaurant/"+restaurantName+"/edit-restaurant/")}> <PencilSquare className="text-primary"></PencilSquare> <span className ="ms-1 d-none d-sm-inline text-primary">Edit Restaurant </span></Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    </>
}


export default ProfileNavBar