import React, { useState, useEffect } from 'react';
import { Container, Table, Badge, Spinner } from 'react-bootstrap';
import NavbarComponent from '../components/NavbarComponent';
import FooterComponent from '../components/FooterComponent';
import { BASE_URL } from '../Constants';

function OrderHistoryPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('user_id');

    useEffect(() => {
        if (!userId) {
            setError('Please login to view your order history');
            setLoading(false);
            return;
        }

        const fetchOrders = async () => {
            try {
                const response = await fetch(`${BASE_URL}/orders/user/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                setOrders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userId]);

    const getOrderStatusBadge = (status) => {
        const statusColors = {
            'pending': 'warning',
            'processing': 'info',
            'shipped': 'primary',
            'delivered': 'success',
            'cancelled': 'danger'
        };

        return (
            <Badge bg={statusColors[status] || 'secondary'}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    const calculateDeliveryEstimate = (orderDate, status) => {
        if (status === 'delivered') return 'Delivered';
        
        const orderDateTime = new Date(orderDate);
        const now = new Date();
        const daysPassed = Math.floor((now - orderDateTime) / (1000 * 60 * 60 * 24));
        
        if (status === 'pending') {
            return `Estimated delivery: ${daysPassed + 5} days`;
        } else if (status === 'processing') {
            return `Estimated delivery: ${daysPassed + 3} days`;
        } else if (status === 'shipped') {
            return `Estimated delivery: ${daysPassed + 2} days`;
        }
        
        return 'Calculating...';
    };

    if (!userId) {
        return (
            <>
                <NavbarComponent />
                <Container className="mt-5 pt-5 text-center">
                    <h3>Please login to view your order history</h3>
                </Container>
                <FooterComponent />
            </>
        );
    }

    if (loading) {
        return (
            <>
                <NavbarComponent />
                <Container className="mt-5 pt-5 text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Container>
                <FooterComponent />
            </>
        );
    }

    if (error) {
        return (
            <>
                <NavbarComponent />
                <Container className="mt-5 pt-5 text-center">
                    <h3 className="text-danger">{error}</h3>
                </Container>
                <FooterComponent />
            </>
        );
    }

    return (
        <>
            <NavbarComponent />
            <Container className="mt-5 pt-5">
                <h2 className="mb-4">Order History</h2>
                {orders.length === 0 ? (
                    <p>You haven't placed any orders yet.</p>
                ) : (
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Delivery Estimate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <ul className="list-unstyled">
                                            {order.items.map((item, index) => (
                                                <li key={index}>
                                                    {item.quantity}x {item.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>${order.total.toFixed(2)}</td>
                                    <td>{getOrderStatusBadge(order.status)}</td>
                                    <td>{calculateDeliveryEstimate(order.created_at, order.status)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Container>
            <FooterComponent />
        </>
    );
}

export default OrderHistoryPage; 