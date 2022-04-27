import React from 'react';
import {Link} from "react-router-dom";
import {Container} from "@material-ui/core";
import {MDBContainer} from "mdb-react-ui-kit";

const NotLogInPage= () => {
    return <>
        <MDBContainer fluid style={{height: "100%", backgroundColor: "#e9ebed"}}>
            <Container className="justify-content-center" style={{paddingTop: "3%", paddingBottom: "10%", width: "60%"}}>
                <h1>You need to Log In before accessing this page!</h1>
                <Link to="/signIn">Click Here to Log In</Link>
            </Container>
        </MDBContainer>
    </>
}

export default NotLogInPage