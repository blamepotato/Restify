import Form from 'react-bootstrap/Form'
import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button'
import {Link, Outlet} from "react-router-dom";
import logo from "../images/Resify-logo-new.png";
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


const SignUpForm = () => {
    const [name_notification, setNameNotification] = useState("")
    const [username_notification, setUsernameNotification] = useState("")
    const [email_notification, setEmailNotification] = useState("")
    const [password_notification, setPasswordNotification] = useState("")
    const [password2_notification, setPassword2Notification] = useState("")
    const [submit_notification, setSubmitNotification] = useState("")
    const [nameState, setNameState]  =useState(false);
    const [usernameState, setUsernameState]  =useState(false);
    const [emailState, setEmailState]  =useState(false);
    const [passwordState, setPasswordState]  =useState(false);
    const [password2State, setPassword2State]  =useState(false);
    const [checkBoxState, setCheckboxState]  =useState(false);
    const [buttonState, setButtonState] = useState(true)
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const navigate = useNavigate();

    const validateName = (name) => {
        var message = "Name should only contain alphbets";
        var reg = /^[A-Za-z]+$/;

        if(reg.test(name) === false){
            setNameState(false);
            setNameNotification(message);
        }
        else{
            setNameState(true);
            setNameNotification("");
        }
    }
    const validateUsername = (username)=>{
        var message = "Username is invalid";
        var reg = /^(\w|_)+$/;
        if (username.length < 6 || reg.test(username) === false){
            setUsernameState(false);
            setUsernameNotification(message);
        }
        else{
            setUsernameState(true);
            setUsernameNotification("");
        }
        
    }

    const validateEmail = (email) =>{
        var message = "Email is invalid";
        var reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})$/;
        if (reg.test(email) === false){
            setEmailState(false);
            setEmailNotification(message);
        }
        else{
            setEmailState(true);
            setEmailNotification("");
        }
        
    }

    const validatePassword = (password) =>{
        var message = "Password is invalid";
        var reg = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
        if (reg.test(password) === false){
            setPasswordState(false);
            setPasswordNotification(message);
        }
        else{
            setPasswordState(true);
            setPasswordNotification("");
        }
        
    }

    const validatePassword2 = (password2) =>{
        var password = document.getElementById("password").value;
        var message = "Passwords don't match";
        if (password !== password2){
            setPassword2State(false);
            setPassword2Notification(message);
        }
        else{
            setPassword2State(true);
            setPassword2Notification("");
        }
        
    }

    useEffect(()=>{
        if (nameState && usernameState && emailState && passwordState && password2State && checkBoxState){
            
            setButtonState(false);
        }
        else{
            setButtonState(true);
        }
    }, [nameState, usernameState, emailState, passwordState, password2State, checkBoxState])

    const handleSubmit = (e) =>{
        e.preventDefault();
        var {firstname, lastname, username, email, birthday, password} = document.forms[0];
        fetch('http://127.0.0.1:8000/accounts/user/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": username.value,
                "password": password.value,
                "password1": password.value,
                "first_name": firstname.value,
                "last_name": lastname.value,
                "email": email.value,
                "birthday": birthday.value,
                "phone_number": null
            })
        })
        .then((response) => {
            if (response.ok) {
                setIsSubmitted(true);
            }
            throw new Error('Something went wrong');
        })
        .catch((error)=>{
            setSubmitNotification("Username is Already Taken");
        })

    }

    const renderForm = (
        <div id = "Signin-form" className = "col-sm column align-items-center g-lg-5 py-5">
            <Form onSubmit={handleSubmit}>
                <div className="submit_notification" style={{color:"red"}}>{submit_notification}</div>
                <div className = "bg-white p-5" style={{margin:"10% 20% 10% -5%"}}>
                    <div className="name_notification" style={{color:"red"}}>{name_notification}</div>
                    <Row>
                        <Col>
                            <Form.Group className="input-group mb-4" controlId= "firstname">
                                <Form.Label></Form.Label>
                                <Form.Control type="text" placeholder="First Name"  onChange={(e)=>validateName(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="input-group mb-4" controlId= "lastname">
                                <Form.Label ></Form.Label>
                                <Form.Control type="text" placeholder="Last Name"  onChange={(e)=>validateName(e.target.value)}/>
                            </Form.Group>

                        </Col>
                    </Row>
                    <div className="username_notification" style={{color:"red"}}>{username_notification}</div>
                    <Form.Group className="input-group mb-4" controlId="username">
                        <Form.Label></Form.Label>
                        <Form.Control type="text" placeholder="Username" onChange={(e)=>validateUsername(e.target.value)}/>
                    </Form.Group>
                    
                    <div className="email_notification" style={{color:"red"}}>{email_notification}</div>
                    <Form.Group className="input-group mb-4" controlId="email">
                        <Form.Label></Form.Label>
                        <Form.Control type="text" placeholder="Email" onChange={(e)=>validateEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="input-group mb-4" controlId="birthday">
                        {<Form.Label></Form.Label>}
                        <Form.Control name="birthday" type="text" placeholder='birthday' onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} />
                    </Form.Group>

                    <div className="password_notification" style={{color:"red"}}>{password_notification}</div>
                    <Form.Group className="input-group mb-4" controlId="password">
                        <Form.Label></Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=>validatePassword(e.target.value)}/>
                    </Form.Group>

                    <div className="password2_notification" style={{color:"red"}}>{password2_notification}</div>
                    <Form.Group className="input-group mb-4" controlId="password2">
                        <Form.Label></Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" onChange={(e)=>validatePassword2(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="input-group mb-4" controlId="checkbox">
                        <Form.Check type="checkbox" label="I agree to the Restify Privacy Policy" onClick={(e)=>setCheckboxState(e.target.checked)}/>
                    </Form.Group>
                    <nav>
                        <Link to = "/signIn" className='w-100 mb-3 mx-auto'> Sign In Instead</Link>
                        <Button variant="primary" type="submit" className='w-50 btn btn-lg btn-success' style={{marginLeft: "13.5%"}} disabled={buttonState}>
                            Sign up!
                        </Button>
                    </nav>

                    
                </div>
            </Form>
        </div>
    )

    return <>
    <div className='container'>
        <div className="row align-items-center">
            <div className='col-sm' style={{marginLeft: "7%"}}>
                <div className="row align-items-center g-lg-5 py-5">
                    <div className="col-md-3">
                        <img src = {logo} id = "logo-image"></img>
                    </div>
                    <h1 className='font-weight-bold mt-4' style={{ fontFamily: "Roboto, sans-serif"}}>
                        <span className='row'>The go-to place for</span>
                        <span className='row'>restaurant owners and foodies</span>
                    </h1>
                </div>
            </div>
            {isSubmitted ? navigate("/signIn") : renderForm}
        </div>
        
    </div>
</>
}

export default SignUpForm
