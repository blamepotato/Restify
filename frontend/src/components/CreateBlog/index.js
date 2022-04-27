//import { Container } from "react-bootstrap";
import React, {useEffect, useState} from 'react';
import { Form } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import {Grid, Input, TextField, Container, Button} from "@material-ui/core";
import FileUploadComponent from "../FileUploads/FileUpload";
import { MDBContainer } from 'mdb-react-ui-kit';
import {useLocation} from 'react-router-dom';

// https://react-bootstrap.github.io/forms/overview/
// https://stackoverflow.com/questions/51913522/reactjs-multiple-lines-of-input-using-form
// https://reactgo.com/check-local-storage-key-exists-js/#:~:text=To%20check%20if%20a%20key,and%20returns%20the%20key's%20value.

const CreateBlog = () =>{
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [titlenotification, setTitleNotification] = useState("")
    const [contentnotification, setContentNotification] = useState("")
    const [titlecheck, setTitleCheck] = useState(false)
    const [contentcheck, setContentCheck] = useState(false)
    const [check, setCheck] = useState(false)
    const [checkall, setCheckall] = useState(true)
    const [submitnotification, setSubmitNotification] = useState("")
    const [uploadnotification, setUploadNotification] = useState("")
    const [images, setImages] = useState([])
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate();

    // https://stackoverflow.com/questions/5599934/regular-expression-that-allows-spaces-in-a-string-but-not-only-blank-spaces
    const Checktitle = (title) => {
        var notification = "Title cannot be empty or only spaces!";
        var regex = /^(?=.*\S).{1,100}$/
        if(regex.test(title)){
            setTitle(title);
            setTitleCheck(true);
            setTitleNotification("");
        }
        else{
            setTitleCheck(false);
            setTitleNotification(notification);
        }
    }

    const Checkcontent = (content) => {
        var notification = "Content cannot be empty or only spaces!";
        var regex = /^(?=.*\S).+$/
        if(regex.test(content)){
            setContent(content);
            setContentCheck(true);
            setContentNotification("");
        }
        else{
            setContentCheck(false);
            setContentNotification(notification);
        }
    }

    const submit = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:8000/socials/add_blog/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + localStorage.getItem("restifyToken"),
            },
            body: JSON.stringify({
                "title": title,
                "content": content
            })
        })
            .then((response) => {
                if (response.ok) {
                    setSuccess(true)
                    setSubmitNotification("You have made a blog successfully! Congrats!");
                    response.json().then((data) => {
                        const formData = new FormData();
                        formData.append("blog", data.id);

                        for(let img of images){
                            formData.append("image", img);
                            fetch('http://127.0.0.1:8000/socials/add_blog_image/', {
                                method: 'POST',
                                headers: {
                                    'Authorization': "Token "+ localStorage.getItem("restifyToken"),
                                },
                                body: formData,
                            }).then((response) => {
                                    if (!response.ok) {
                                        setSubmitNotification("Something wrong with uploading images")
                                    } else {
                                        setUploadNotification("You have uploaded images successfully")
                                        navigate("../../profile/myBlogs")
                                    }
                                }
                            );
                        }
                    })
                }
                else if (response.status === 400) {
                    setSuccess(false)
                    setSubmitNotification("You need to have a restaurant before making a post!");
                } else if (response.status === 404){
                    setSuccess(false)
                    setSubmitNotification("Something goes wrong!");
                }
            })
    }

    useEffect(()=>{
        if (localStorage.getItem("restifyToken")){
            if (titlecheck && contentcheck && check){
                setCheckall(false);
            }
            else{
                setCheckall(true);
            }
        }
        else{
            navigate("/notLogIn");
        }
    }, [titlecheck && contentcheck && check])

    const submitButton = () => {
        if (success){
            return <>
                <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    color="primary"
                    style={{
                        marginTop: "4em",
                        position: "relative",
                        left: "85%",
                    }}
                    disabled={checkall}
                    onClick={()=>(navigate("../../../profile/myBlogs"))}
                >
                    Submit
                </Button>
            </>
        }
        else{
            return <>
                <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    color="primary"
                    style={{
                        marginTop: "4em",
                        position: "relative",
                        left: "85%",
                    }}
                    disabled={checkall}
                >
                    Submit
                </Button>
            </>
        }
    }

    return <>
        <MDBContainer
            fluid
            style={{height: "100%", backgroundColor: "#e9ebed"}}
        >

            <Container
                className="justify-content-center"
                style={{paddingTop: "3%", paddingBottom: "10%", width: "60%"}}
            >
                <h1
                    style={{textAlign: "center", marginBottom: "5%"}}
                ><b>Create A Blog!</b></h1>

                <Form
                    className="bg-white shadow-lg p-5 rounded" onSubmit={submit}
                >
                    <h5
                        style={{textAlign: "center", marginBottom: "5%"}}
                    >What is your blog's title?</h5>
                    <div style={{color: "red"}}>{titlenotification}</div>
                    <Form.Group
                        xs={5}
                        className="mb-3"
                    >
                        <Form.Control
                            as="textarea"
                            rows={1}
                            placeholder="Title"
                            onChange={(e) => Checktitle(e.target.value)}
                        />
                    </Form.Group>

                    <h5
                        style={{textAlign: "center", marginBottom: "5%"}}
                    >What is your blog's content?</h5>
                    <div style={{color: "red"}}>{contentnotification}</div>
                    <Form.Group
                        xs={5}
                        className="mb-3"
                    >
                        <Form.Control
                            as="textarea"
                            rows={10}
                            placeholder="Content"
                            onChange={(e) => Checkcontent(e.target.value)}
                        />
                    </Form.Group>

                    <h5
                        style={{textAlign: "center", marginBottom: "5%", marginTop: "5%"}}
                    >Add some images to your blogs (optional)!</h5>
                    <FileUploadComponent allowed={5} setState={setImages}/>

                    <Form.Check type="checkbox" label="Your blog's title and content must be polite."
                                onClick={(e) => setCheck(e.target.checked)}/>

                    {submitButton()}

                    <div style={{color: "red"}}>{submitnotification}</div>
                    <div style={{color: "red"}}>{uploadnotification}</div>
                </Form>
            </Container>
        </MDBContainer>
    </>
}

export default CreateBlog