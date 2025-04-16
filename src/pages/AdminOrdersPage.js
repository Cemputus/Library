import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Spinner, Form } from 'react-bootstrap';
import NavbarComponent from '../components/NavbarComponent';
import FooterComponent from '../components/FooterComponent';
import { BASE_URL } from '../Constants';
import Order from '../components/Order';
import '../css/Orders.css';

function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${BASE_URL}/orders`);
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
    }, []);

    const filteredOrders = orders
        .filter(order => {
            const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
            const matchesSearch = searchTerm === '' || 
                order.id.toString().includes(searchTerm) ||
                order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.phone.includes(searchTerm);
            return matchesStatus && matchesSearch;
        })
        .sort((a, b) => {
            if (sortBy === 'date') {
                return sortOrder === 'asc' 
                    ? new Date(a.date) - new Date(b.date)
                    : new Date(b.date) - new Date(a.date);
            }
            if (sortBy === 'total') {
                return sortOrder === 'asc'
                    ? a.total - b.total
                    : b.total - a.total;
            }
            return 0;
        });

    const orderStats = {
        total: orders.length,
        pending: orders.filter(order => order.status === 'pending').length,
        processing: orders.filter(order => order.status === 'processing').length,
        delivered: orders.filter(order => order.status === 'delivered').length,
        cancelled: orders.filter(order => order.status === 'cancelled').length
    };

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
                <h2 className="mb-4">All Orders</h2>
                
                {/* Order Statistics */}
                <Row className="mb-4">
                    <Col md={2}>
                        <Card className="text-center">
                            <Card.Body>
                                <h3>{orderStats.total}</h3>
                                <p className="text-muted">Total Orders</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={2}>
                        <Card className="text-center">
                            <Card.Body>
                                <h3>{orderStats.pending}</h3>
                                <p className="text-muted">Pending</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={2}>
                        <Card className="text-center">
                            <Card.Body>
                                <h3>{orderStats.processing}</h3>
                                <p className="text-muted">Processing</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={2}>
                        <Card className="text-center">
                            <Card.Body>
                                <h3>{orderStats.delivered}</h3>
                                <p className="text-muted">Delivered</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={2}>
                        <Card className="text-center">
                            <Card.Body>
                                <h3>{orderStats.cancelled}</h3>
                                <p className="text-muted">Cancelled</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Filters */}
                <Row className="mb-4">
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Filter by Status</Form.Label>
                            <Form.Select 
                                value={filterStatus} 
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="all">All Statuses</option>
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Search</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Search by Order ID, Email, or Phone"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Sort By</Form.Label>
                            <Form.Select 
                                value={sortBy} 
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="date">Order Date</option>
                                <option value="total">Total Amount</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                {/* Orders List */}
                <div className="order-main">
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => (
                            <Order
                                key={order.id}
                                order={order}
                                id={order.id}
                                email={order.email}
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
                            <h3>No orders found</h3>
                        </div>
                    )}
                </div>
            </Container>
            <FooterComponent />
        </>
    );
}

export default AdminOrdersPage; 