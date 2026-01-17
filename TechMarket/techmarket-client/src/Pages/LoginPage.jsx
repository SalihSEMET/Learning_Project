import { useState } from 'react';
import { Container, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../Services/authService';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await login({ email, password });
      
      console.log("Login Response:", response);
      
      navigate('/');
      
    } catch (err) {
      setError(err.response?.data || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card style={{ width: '400px' }} className="shadow-lg">
        <Card.Header className="bg-primary text-white text-center">
          <h3>Login 🔑</h3>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{typeof error === 'string' ? error : 'Login failed'}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" size="lg" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
              </Button>
            </div>
          </Form>
        </Card.Body>
        <Card.Footer className="text-center">
          <p className="mb-1">Don't have an account? <Link to="/register">Register</Link></p>
          <p className="mb-0"><Link to="/forgot-password" style={{fontSize: '0.9rem'}}>Forgot Password?</Link></p>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default LoginPage;