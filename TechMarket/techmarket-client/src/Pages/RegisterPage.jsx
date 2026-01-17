import { useState } from 'react';
import { Container, Form, Button, Card, Alert, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { register } from '../Services/authService';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      await register(formData);
      setSuccess(true);
      setFormData({ 
        firstName: '', lastName: '', email: '', password: '', confirmPassword: '', phoneNumber: ''
      });
    } catch (err) {
      
      setError(err.response?.data?.description || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card style={{ width: '500px' }} className="shadow-lg">
        <Card.Header className="bg-primary text-white text-center">
          <h3>Register 🚀</h3>
        </Card.Header>
        <Card.Body>
          {success && (
            <Alert variant="success">
              ✅ Registration successful! Please check your email to verify your account.
            </Alert>
          )}

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control 
                    type="text" name="firstName" required 
                    value={formData.firstName} onChange={handleChange} 
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control 
                    type="text" name="lastName" required 
                    value={formData.lastName} onChange={handleChange} 
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control 
                type="email" name="email" required 
                value={formData.email} onChange={handleChange} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control 
                type="tel" name="phoneNumber" 
                value={formData.phoneNumber} onChange={handleChange} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" name="password" required 
                value={formData.password} onChange={handleChange} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control 
                type="password" name="confirmPassword" required 
                value={formData.confirmPassword} onChange={handleChange} 
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" size="lg" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Register'}
              </Button>
            </div>
          </Form>
        </Card.Body>
        <Card.Footer className="text-center">
            Already have an account? <Link to="/login">Login here</Link>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default RegisterPage;