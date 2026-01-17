import { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';
import { getAllProducts, getProductsByCategoryId } from '../Services/productService';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams(); 

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); 
      try {
        let data;
        if (categoryId) {
          data = await getProductsByCategoryId(categoryId);
        } else {
          data = await getAllProducts();
        }
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" variant="primary" /></div>;

  return (
    <Container className="mt-4">
      {}
      <h2 className="mb-4">{categoryId ? 'Category Products' : 'All Products'}</h2>
      
      {products.length === 0 ? (
        <Alert variant="info">No products found in this category.</Alert>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ProductList;