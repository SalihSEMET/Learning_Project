import { Container, Table, Button, Alert } from 'react-bootstrap';
import { useCart } from '../Context/CartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cart, removeFromCart, calculateTotal } = useCart();

  if (cart.length === 0) {
    return (
      <Container className="mt-5 text-center">
        <Alert variant="warning">Your cart is empty! 😔</Alert>
        <Link to="/products" className="btn btn-primary">Start Shopping</Link>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2>Shopping Cart ({cart.length} items)</h2>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>${item.price}</td>
              <td>{item.quantity}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>
                  Remove 🗑️
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-end">
        <h3>Total Price: <span className="text-success">${calculateTotal()}</span></h3>
        <Button variant="success" size="lg" className="mt-2">Checkout 💳</Button>
      </div>
    </Container>
  );
};

export default CartPage;