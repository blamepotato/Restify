import { Container } from "react-bootstrap";
import MyAccount from "../MyAccount";
import ProfileNavBar from "../ProfileNavBar";
import RenderNavbar from "../Navbar";
import React from 'react'
const Profile = () =>{
    return <>
        
        <Container fluid>
            <div className = "row flex-nowrap">
                <div className="col-3 px-sm-2 px-0 bg-light md-auto">
                    <ProfileNavBar>
                    </ProfileNavBar>
                </div>
                <div className="col py-3 md-auto">
                    <MyAccount>
                    </MyAccount>
                </div>
            </div>
        </Container>
    </>
}





export default Profile