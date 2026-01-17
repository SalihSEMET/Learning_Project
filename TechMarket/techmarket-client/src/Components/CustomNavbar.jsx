import { useEffect, useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllCategories } from '../Services/categoryService';
import { useCart } from '../Context/CartContext';

const CustomNavbar = () => {
  const [categories, setCategories] = useState([]);
  const { cart } = useCart();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">TechMarket 🚀</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              {categories.length === 0 ? (
                <NavDropdown.Item disabled>Loading...</NavDropdown.Item>
              ) : (
                categories.map((cat) => (
                  <NavDropdown.Item key={cat.id} as={Link} to={`/category/${cat.id}`}>
                    {cat.categoryName}
                  </NavDropdown.Item>
                ))
              )}
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/cart" className="btn btn-primary text-white px-3 me-2">
              Cart 🛒 <span className="badge bg-danger ms-1">{cart.length}</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/register" className="btn btn-outline-light ms-2">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;