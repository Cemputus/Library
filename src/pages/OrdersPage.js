import FooterComponent from "../components/FooterComponent";
import NavbarComponent from "../components/NavbarComponent";
import Order from "../components/Order";
import "../css/Orders.css";
import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../Constants";
import { Container, Row, Col, Card } from "react-bootstrap";

function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [cartItemsNumber, setCartItemsNumber] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const userId = localStorage.getItem("user_id");
    const isLoggedIn = !!userId;

    useEffect(() => {
        // Check authentication immediately
        if (!isLoggedIn) {
            navigate('/auth/login');
            return;
        }

        // Update cart items count
        const cartItems = JSON.parse(localStorage.getItem("items")) || [];
        const counter = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        setCartItemsNumber(counter);

        // Fetch orders for logged-in user
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${BASE_URL}/orders/user/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                // Sort orders by date in descending order (newest first)
                const sortedOrders = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setOrders(sortedOrders);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userId, isLoggedIn, navigate]);

    // If not logged in, show login prompt
    if (!isLoggedIn) {
        return (
            <>
                <NavbarComponent cartItemsNumber={cartItemsNumber} />
                <div className="text-center mt-5">
                    <h3>Please login to view your orders</h3>
                    <Link to="/auth/login" className="btn btn-primary mt-3">Go to Login page</Link>
                </div>
                <FooterComponent />
            </>
        );
    }

    // Show loading state
    if (loading) {
        return (
            <>
                <NavbarComponent cartItemsNumber={cartItemsNumber} />
                <div className="text-center mt-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <h3 className="mt-3">Loading your orders...</h3>
                </div>
                <FooterComponent />
            </>
        );
    }

    // Show error state
    if (error) {
        return (
            <>
                <NavbarComponent cartItemsNumber={cartItemsNumber} />
                <div className="text-center mt-5">
                    <h3 className="text-danger">{error}</h3>
                    <button className="btn btn-primary mt-3" onClick={() => window.location.reload()}>
                        Try Again
                    </button>
                </div>
                <FooterComponent />
            </>
        );
    }

    // Calculate order statistics
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(order => order.status === 'pending').length;
    const processingOrders = orders.filter(order => order.status === 'processing').length;
    const deliveredOrders = orders.filter(order => order.status === 'delivered').length;

    // Main content for logged-in users
    return (
        <>
            <NavbarComponent cartItemsNumber={cartItemsNumber} />
            <Container className="mt-5 pt-5">
                <h2 className="text-center mb-4">Your Order History</h2>
                
                {/* Order Statistics */}
                <Row className="mb-4">
                    <Col md={3}>
                        <Card className="text-center">
                            <Card.Body>
                                <h3>{totalOrders}</h3>
                                <p className="text-muted">Total Orders</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="text-center">
                            <Card.Body>
                                <h3>{pendingOrders}</h3>
                                <p className="text-muted">Pending Orders</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="text-center">
                            <Card.Body>
                                <h3>{processingOrders}</h3>
                                <p className="text-muted">Processing Orders</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="text-center">
                            <Card.Body>
                                <h3>{deliveredOrders}</h3>
                                <p className="text-muted">Delivered Orders</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Orders List */}
                <div className="order-main">
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <Order
                                key={order.id}
                                order={order}
                                id={order.id}
                                email={order.email}
                                name={order.name}
                                phone={order.phone}
                                date={order.date}
                                total={order.total}
                                deliveryAddress={order.delivery_address}
                                billingAddress={order.billing_address}
                                status={order.status}
                            />
                        ))
                    ) : (
                        <div className="text-center mt-5">
                            <h3>You don't have any orders yet</h3>
                            <Link to="/books" className="btn btn-primary mt-3">Start Shopping</Link>
                        </div>
                    )}
                </div>
            </Container>
            <FooterComponent />
        </>
    );
}

export default OrdersPage;
