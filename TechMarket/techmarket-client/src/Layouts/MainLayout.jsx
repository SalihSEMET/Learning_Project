import CustomNavbar from '../Components/CustomNavbar';
import Footer from '../Components/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {}
      <CustomNavbar />

      {}
      <main className="flex-grow-1">
        {children}
      </main>

      {}
      <Footer />
    </div>
  );
};

export default MainLayout;