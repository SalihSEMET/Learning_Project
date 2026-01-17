import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Card className="h-100 shadow-sm">
      {/* Temsili Resim */}
      <Card.Img 
        variant="top" 
        src="https://via.placeholder.com/300x200?text=Product+Image" 
        style={{ objectFit: 'cover', height: '200px' }}
      />
      <Card.Body className="d-flex flex-column">
        {/* Ürün İsmi (Backend'den 'name' veya 'productName' gelebilir, kontrol edeceğiz) */}
        <Card.Title>{product.title || product.productName}</Card.Title>
        
        <Card.Text className="fs-5 fw-bold text-primary">
           ${product.price}
        </Card.Text>
        
        <div className="mt-auto">
          <Link to={`/product/${product.id}`} className="btn btn-outline-primary w-100">
            View Details
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;