import Button from "react-bootstrap/esm/Button";
import { LinkContainer } from "react-router-bootstrap";
import FooterComponent from "../components/FooterComponent";
import NavbarComponent from "../components/NavbarComponent";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { FaBook, FaShippingFast, FaHeadset, FaStar, FaTruck } from "react-icons/fa";
import "../css/HomePage.css";

function HomePage() {
    const [cartItemsNumber, setCartItemsNumber] = useState(0);

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem("items"));
        let counter = 0;
        if (cartItems) {
            for (let i = 0; i < cartItems.length; i++) {
                counter = counter + cartItems[i].quantity;
            }
            setCartItemsNumber(counter);
        }
    }, []);

    const features = [
        {
            icon: <FaBook />,
            title: "Extensive Collection",
            description: "Access thousands of books across various genres and categories, carefully curated for your reading pleasure."
        },
        {
            icon: <FaShippingFast />,
            title: "Fast Delivery",
            description: "Experience lightning-fast delivery with our efficient shipping system, ensuring your books reach you promptly."
        },
        {
            icon: <FaHeadset />,
            title: "24/7 Support",
            description: "Our dedicated support team is always ready to assist you with any queries or concerns you may have."
        }
    ];

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Book Enthusiast",
            avatar: "https://randomuser.me/api/portraits/women/1.jpg",
            text: "TECHNOVA has transformed my reading experience. The collection is amazing and the delivery is super fast!"
        },
        {
            name: "Michael Chen",
            role: "Student",
            avatar: "https://randomuser.me/api/portraits/men/1.jpg",
            text: "As a student, I love the affordable prices and the wide range of academic books available."
        },
        {
            name: "Isaac kafumisi",
            role: "Teacher",
            avatar: "https://randomuser.me/api/portraits/women/2.jpg",
            text: "The customer service is exceptional, and I always find what I'm looking for."
        }
    ];

    return (
        <>
            <NavbarComponent cartItemsNumber={cartItemsNumber} />
            <main className="main-homepage">
                {/* Hero Section */}
                <section className="hero-section">
                    <Container>
                        <Row className="align-items-center">
                            <Col md={6} className="hero-content">
                                <h1>Welcome to TECHNOVA</h1>
                                <h4>
                                    "Until the lion learns how to write, every story will glorify the hunter."
                                </h4>
                                <h6>- Chinua Achebe</h6>
                                <h3>
                                    Discover a world of knowledge at your fingertips. 
                                    Explore our curated collection of books and find your next adventure.
                                </h3>
                                <div className="d-flex gap-3">
                                    <LinkContainer to="/books">
                                        <Button variant="outline-dark" size="lg">
                                            Browse Books
                                        </Button>
                                    </LinkContainer>
                                    <LinkContainer to="/auth/register">
                                        <Button variant="dark" size="lg">
                                            Join Now
                                        </Button>
                                    </LinkContainer>
                                </div>
                            </Col>
                            <Col md={6} className="d-none d-md-block">
                                <div className="text-center">
                                    <img 
                                        src="/images/books-hero.png" 
                                        alt="Books Collection" 
                                        className="img-fluid"
                                        style={{ maxWidth: '100%', height: 'auto' }}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* Features Section */}
                <section className="features-section py-5">
                    <Container>
                        <h2 className="section-title text-center mb-5">Why Choose Us</h2>
                        <Row>
                            <Col md={4} className="mb-4">
                                <div className="feature-card text-center">
                                    <FaBook className="feature-icon" />
                                    <h3>Wide Selection</h3>
                                    <p>Browse through thousands of books across various genres</p>
                                </div>
                            </Col>
                            <Col md={4} className="mb-4">
                                <div className="feature-card text-center">
                                    <FaTruck className="feature-icon" />
                                    <h3>Fast Delivery</h3>
                                    <p>Get your books delivered to your doorstep quickly</p>
                                </div>
                            </Col>
                            <Col md={4} className="mb-4">
                                <div className="feature-card text-center">
                                    <FaHeadset className="feature-icon" />
                                    <h3>24/7 Support</h3>
                                    <p>Our customer support team is always here to help</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* Testimonials Section */}
                <section className="testimonials-section py-5">
                    <Container>
                        <h2 className="section-title text-center mb-5">What Our Readers Say</h2>
                        <Row>
                            {testimonials.map((testimonial, index) => (
                                <Col md={4} key={index} className="mb-4">
                                    <div className="testimonial-card text-center">
                                        <img 
                                            src={testimonial.avatar} 
                                            alt={testimonial.name}
                                            className="testimonial-avatar mb-3"
                                        />
                                        <h4>{testimonial.name}</h4>
                                        <p className="text-muted">{testimonial.role}</p>
                                        <p className="testimonial-text">"{testimonial.text}"</p>
                                        <div className="testimonial-rating">
                                            <FaStar className="text-warning" />
                                            <FaStar className="text-warning" />
                                            <FaStar className="text-warning" />
                                            <FaStar className="text-warning" />
                                            <FaStar className="text-warning" />
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </section>
            </main>
            <FooterComponent />
        </>
    );
}

export default HomePage;