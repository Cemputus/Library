import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import FooterComponent from "../components/FooterComponent";
import NavbarComponent from "../components/NavbarComponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import "../css/Register.css";
import { BASE_URL } from "../Constants";

function RegisterPage() {
    const [inputs, setInputs] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        coPassword: ""
    });
    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [validated, setValidated] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({
        hasMinLength: false,
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
        passwordsMatch: false
    });
    const navigate = useNavigate();

    let loggedIn = false;

    if (localStorage.getItem("user_id")) {
        loggedIn = true;
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });

        if (name === 'password') {
            setPasswordStrength({
                hasMinLength: value.length >= 8,
                hasUpperCase: /[A-Z]/.test(value),
                hasLowerCase: /[a-z]/.test(value),
                hasNumber: /[0-9]/.test(value),
                hasSpecialChar: /[!@#$%^&*]/.test(value),
                passwordsMatch: value === inputs.coPassword
            });
        } else if (name === 'coPassword') {
            setPasswordStrength(prev => ({
                ...prev,
                passwordsMatch: value === inputs.password
            }));
        }
    }

    function handleSubmit(e) {
        const form = e.currentTarget;

        setValidated(true);
        e.preventDefault();
        if (form.checkValidity()) {
            fetch(`${BASE_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: `${inputs.firstName} ${inputs.lastName}`,
                    username: inputs.username,
                    email: inputs.email,
                    password: inputs.password
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.message === "Successfully registered") {
                        // After successful registration, log in the user
                        fetch(`${BASE_URL}/auth/login`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                email: inputs.email,
                                password: inputs.password
                            })
                        })
                        .then((response) => response.json())
                        .then((loginData) => {
                            if (loginData.token) {
                                // Store user session information
                                localStorage.setItem("token", loginData.token);
                                localStorage.setItem("user_id", loginData.user.id);
                                localStorage.setItem("username", loginData.user.username);
                                localStorage.setItem("name", loginData.user.name);
                                localStorage.setItem("email", loginData.user.email);
                                localStorage.setItem("role", loginData.user.role);
                                
                                setError(false);
                                setShow(true);
                                setTimeout(() => {
                                    navigate("/");
                                }, 2000);
                            } else {
                                setError(true);
                                setErrorMessage("Registration successful but login failed. Please try logging in manually.");
                                setShow(true);
                            }
                        })
                        .catch((error) => {
                            console.error("Login error:", error);
                            setError(true);
                            setErrorMessage("Registration successful but login failed. Please try logging in manually.");
                            setShow(true);
                        });
                    } else {
                        setError(true);
                        setErrorMessage(data.message);
                        setInputs({
                            ...inputs,
                            password: "",
                            coPassword: ""
                        });
                        setShow(true);
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    setError(true);
                    setErrorMessage("An error occurred during registration. Please try again.");
                    setShow(true);
                });
        }
    }

    return (
        <>
            <NavbarComponent navStyle="simple" />
            <>
                <Container className="container register-main d-flex justify-content-center flex-column align-items-center my-5 pt-5">
                    {loggedIn ? (
                        <>
                            <h3 className="main-title">
                                You are already registered.
                            </h3>
                            <LinkContainer to="/">
                                <Button variant="outline-danger">
                                    Go back to Home page
                                </Button>
                            </LinkContainer>
                        </>
                    ) : (
                        <>
                            <h1 className="main-title">
                                Register a new account
                            </h1>
                            <Form
                                className="login-form mt-4"
                                noValidate
                                validated={validated}
                                onSubmit={handleSubmit}
                            >
                                <Form.Group
                                    as={Row}
                                    className="mb-3"
                                    controlId="validationCustom01"
                                >
                                    <Form.Label column sm="3">
                                        Username
                                    </Form.Label>
                                    <Col sm="9">
                                        <Form.Control
                                            type="text"
                                            placeholder="Username"
                                            name="username"
                                            value={inputs.username}
                                            onChange={handleChange}
                                            pattern="^[a-z0-9_-]{3,16}"
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid username.
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="4">
                                        First and last name
                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control
                                            aria-label="First name"
                                            type="text"
                                            name="firstName"
                                            placeholder="First name"
                                            value={inputs.firstName}
                                            onChange={handleChange}
                                            pattern="^[A-Za-z]{2,30}"
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid first name.
                                        </Form.Control.Feedback>
                                    </Col>
                                    <Col sm="4">
                                        <Form.Control
                                            aria-label="Last name"
                                            type="text"
                                            name="lastName"
                                            placeholder="Last name"
                                            value={inputs.lastName}
                                            onChange={handleChange}
                                            pattern="^[A-Za-z]{2,30}"
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid last name.
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group
                                    as={Row}
                                    className="mb-3"
                                    controlId="validationCustom02"
                                >
                                    <Form.Label column sm="3">
                                        Email address
                                    </Form.Label>
                                    <Col sm="9">
                                        <Form.Control
                                            type="email"
                                            placeholder="Email address"
                                            name="email"
                                            value={inputs.email}
                                            onChange={handleChange}
                                            pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}"
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid email
                                            address.
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group
                                    as={Row}
                                    className="mb-3"
                                    controlId="validationCustom03"
                                >
                                    <Form.Label column sm="3">
                                        Password
                                    </Form.Label>
                                    <Col sm="9">
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={inputs.password}
                                            onChange={handleChange}
                                            pattern="^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                                            required
                                        />
                                        <div className="password-strength mt-2">
                                            <small className="d-block">Password must contain:</small>
                                            <small className={`d-block ${passwordStrength.hasMinLength ? 'text-success' : 'text-danger'}`}>
                                                ✓ At least 8 characters
                                            </small>
                                            <small className={`d-block ${passwordStrength.hasUpperCase ? 'text-success' : 'text-danger'}`}>
                                                ✓ At least one uppercase letter
                                            </small>
                                            <small className={`d-block ${passwordStrength.hasLowerCase ? 'text-success' : 'text-danger'}`}>
                                                ✓ At least one lowercase letter
                                            </small>
                                            <small className={`d-block ${passwordStrength.hasNumber ? 'text-success' : 'text-danger'}`}>
                                                ✓ At least one number
                                            </small>
                                            <small className={`d-block ${passwordStrength.hasSpecialChar ? 'text-success' : 'text-danger'}`}>
                                                ✓ At least one special character (!@#$%^&*)
                                            </small>
                                        </div>
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid password that meets all requirements.
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group
                                    as={Row}
                                    className="mb-3"
                                    controlId="validationCustom04"
                                >
                                    <Form.Label column sm="3">
                                        Confirm password
                                    </Form.Label>
                                    <Col sm="9">
                                        <Form.Control
                                            type="password"
                                            name="coPassword"
                                            placeholder="Confirm password"
                                            value={inputs.coPassword}
                                            onChange={handleChange}
                                            pattern={inputs.password}
                                            required
                                        />
                                        <small className={`d-block mt-2 ${passwordStrength.passwordsMatch ? 'text-success' : 'text-danger'}`}>
                                            {passwordStrength.passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
                                        </small>
                                        <Form.Control.Feedback type="invalid">
                                            Passwords don't match.
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <div className="text-center">
                                    <Button
                                        type="submit"
                                        variant="outline-danger"
                                        className="w-50 mt-3"
                                    >
                                        Register
                                    </Button>
                                    <br />
                                    <Form.Text>
                                        Already have an account?{" "}
                                        <LinkContainer
                                            to="/auth/login"
                                            className="login-link text-danger"
                                        >
                                            <span>Login</span>
                                        </LinkContainer>
                                    </Form.Text>
                                </div>
                            </Form>
                        </>
                    )}
                </Container>
                <div className="register-footer">
                    <FooterComponent />
                </div>
            </>
            <ToastContainer className="p-3 top-0 end-0">
                <Toast
                    onClose={() => setShow(false)}
                    show={show}
                    delay={3000}
                    autohide
                >
                    {error ? (
                        <>
                            <Toast.Header>
                                <img
                                    src="holder.js/20x20?text=%20"
                                    className="rounded me-2"
                                    alt=""
                                />
                                <strong className="me-auto text-danger">
                                    Error!
                                </strong>
                            </Toast.Header>
                            <Toast.Body>{errorMessage}</Toast.Body>
                        </>
                    ) : (
                        <>
                            <Toast.Header>
                                <img
                                    src="holder.js/20x20?text=%20"
                                    className="rounded me-2"
                                    alt=""
                                />
                                <strong className="me-auto text-success">
                                    Success!
                                </strong>
                            </Toast.Header>
                            <Toast.Body>
                                Successfully registered! Please log in!
                            </Toast.Body>
                        </>
                    )}
                </Toast>
            </ToastContainer>
        </>
    );
}

export default RegisterPage;
