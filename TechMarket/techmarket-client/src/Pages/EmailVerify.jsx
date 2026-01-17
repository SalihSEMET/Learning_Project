import { useEffect, useState, useRef } from 'react'; // 1. useRef EKLENDİ
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Card, Spinner, Alert, Button } from 'react-bootstrap';
import { verifyEmail } from '../Services/authService';

const EmailVerify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('Verifying your email...');
  
  // 2. Kilidi oluşturuyoruz (Başlangıçta false)
  const ranOnce = useRef(false);

  useEffect(() => {
    // 3. Eğer kilit açıksa (daha önce çalıştıysa) DUR!
    if (ranOnce.current) return;
    
    // İlk kez çalışıyorsa kilidi kapat (true yap)
    ranOnce.current = true;

    const confirm = async () => {
      const userId = searchParams.get('userId');
      const token = searchParams.get('token');

      if (!userId || !token) {
        setStatus('error');
        setMessage('Invalid verification link.');
        return;
      }

      try {
        await verifyEmail(userId, token);
        setStatus('success');
        setMessage('Your email has been successfully verified! 🎉');
        
        setTimeout(() => navigate('/login'), 3000); 

      } catch (error) {
        // Backend'den hata gelse bile, eğer "zaten onaylı" diyorsa başarılı sayabiliriz
        // Ama şimdilik useRef sorunu kökten çözecektir.
        setStatus('error');
        setMessage('Verification failed. The link might be expired or invalid.');
      }
    };

    confirm();
  }, []); // Bağımlılık dizisi boş

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <Card className="text-center p-4 shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
        <Card.Body>
          {status === 'loading' && (
            <>
              <Spinner animation="border" variant="primary" className="mb-3" />
              <h4>Verifying...</h4>
              <p className="text-muted">Please wait while we confirm your email.</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="display-4 text-success mb-3">✅</div>
              <h4 className="text-success">Verified!</h4>
              <p>{message}</p>
              <p className="text-muted small">Redirecting to login...</p>
              <Button variant="primary" onClick={() => navigate('/login')}>Go to Login</Button>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="display-4 text-danger mb-3">❌</div>
              <h4 className="text-danger">Failed</h4>
              <Alert variant="danger">{message}</Alert>
              <Button variant="secondary" onClick={() => navigate('/')}>Go Home</Button>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EmailVerify;