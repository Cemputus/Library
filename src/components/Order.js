import React, { useContext } from "react";
import {
  Accordion,
  Button,
  Card,
  AccordionContext,
  useAccordionButton,
  Badge,
  ProgressBar
} from "react-bootstrap";

function ContextAwareToggle({ eventKey, callback }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <Button 
      onClick={decoratedOnClick} 
      variant="outline-dark" 
      className="btn-collapse collapsed" 
      type="button" data-bs-toggle="collapse" 
      aria-expanded="false" 
      aria-controls="collapseExample"
    >
      {isCurrentEventKey ? (
        <i className="fas fa-chevron-circle-up"></i>
      ) : (
        <i className="fas fa-chevron-circle-down"></i>
      )}
    </Button>
  );
}

function getStatusBadge(status) {
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
}

function getProgressValue(status) {
  const statusValues = {
    'pending': 25,
    'processing': 50,
    'shipped': 75,
    'delivered': 100,
    'cancelled': 0
  };
  return statusValues[status] || 0;
}

function calculateDeliveryEstimate(orderDate, status) {
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
}

export default function Order({
  id,
  order,
  email,
  phone,
  date,
  total,
  deliveryAddress,
  billingAddress,
  status = 'pending'
}) {
  let count = 1;
  let dateTransformed = new Date(date);
  let dateParsed =
    dateTransformed.getDate() +
    "/" +
    (dateTransformed.getMonth() + 1) +
    "/" +
    dateTransformed.getFullYear() +
    " " +
    dateTransformed.getHours() +
    ":" +
    dateTransformed.getMinutes() +
    ":" +
    dateTransformed.getSeconds();

  return (
    <Accordion defaultActiveKey="1">
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div>
            <p className="fw-bold mb-0">
              Order <span className="text-success">{id}</span>
            </p>
            <div className="mt-2">
              {getStatusBadge(status)}
              <span className="ms-2 text-muted small">
                {calculateDeliveryEstimate(date, status)}
              </span>
            </div>
          </div>
          <ContextAwareToggle eventKey="0" />
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <div className="mb-4">
              <ProgressBar 
                now={getProgressValue(status)} 
                label={`${getProgressValue(status)}%`}
                className="mb-3"
              />
              <div className="d-flex justify-content-between text-muted small">
                <span>Ordered</span>
                <span>Processing</span>
                <span>Shipped</span>
                <span>Delivered</span>
              </div>
            </div>

            <h6>
              Email: <span className="fw-light fst-italic">{email}</span>
            </h6>
            <h6>
              Phone: <span className="fw-light fst-italic">{phone}</span>
            </h6>
            <h6>
              Delivery Address:
              <span className="fw-light fst-italic">
                {" "}
                {deliveryAddress.street} street, {deliveryAddress.suite},{" "}
                {deliveryAddress.zipcode}, {deliveryAddress.city}
              </span>
            </h6>
            <h6>
              Billing Address:
              <span className="fw-light fst-italic">
                {" "}
                {billingAddress.street} street, {billingAddress.suite},{" "}
                {billingAddress.zipcode}, {billingAddress.city}
              </span>
            </h6>
            <h6>
              Ordered on:
              <span className="fw-light fst-italic"> {dateParsed}</span>
            </h6>
            <h6>Order Items:</h6>
            {order.items.map((item) => (
              <div className="d-flex justify-content-between" key={count++}>
                <div className="order-name">- {item.name}</div>
                <div className="order-name">Price: SHS {item.price}</div>
                <div className="order-name">Qty: {item.quantity}</div>
              </div>
            ))}
            <br />
            <h6>Total price: SHS {total}</h6>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}
