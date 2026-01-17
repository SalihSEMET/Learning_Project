import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { getProductById } from '../Services/productService';
import { useCart } from '../Context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error loading details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

  if (!product) return <Alert variant="danger" className="mt-5">Product not found!</Alert>;

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg">
            <Card.Header as="h5" className="bg-primary text-white">
              Product Details
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <img 
                    src="https://via.placeholder.com/400x300?text=Product+Image" 
                    alt="Product" 
                    className="img-fluid rounded mb-3"
                  />
                </Col>
                <Col md={6}>
                  <h3>{product.title || "Name Not Found"}</h3>
                  
                  <h4 className="text-success my-3">${product.price}</h4>
                  
                  <p className="text-muted">
                    {product.description || "No description available for this product."}
                  </p>
                  
                  <p><strong>Stock:</strong> {product.stock || product.stockQuantity || "N/A"}</p>

                  <div className="d-grid gap-2">
                    <Button variant="success" size="lg" onClick={() => addToCart(product)}>
                      Add to Cart 🛒
                    </Button>
                    <Link to="/products" className="btn btn-outline-secondary">
                      Back to Products
                    </Link>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;