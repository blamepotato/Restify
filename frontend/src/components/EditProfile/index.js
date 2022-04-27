import { Container } from "react-bootstrap";
import EditMyAccount from "../EditMyAccount";
import ProfileNavBar from "../ProfileNavBar";
import RenderNavbar from "../Navbar";
import React from 'react';


const EditProfile = () =>{
    

    return <>
        <Container fluid>
            <div className = "row flex-nowrap">
                <div className="col-3 px-sm-2 px-0 bg-light md-auto">
                    <ProfileNavBar>
                    </ProfileNavBar>
                </div>
                <div className="col-6 pt-5 md-auto">
                    <EditMyAccount>
                    </EditMyAccount>
                </div>
            </div>
        </Container>
    </>

}

export default EditProfile