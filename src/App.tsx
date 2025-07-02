import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ui/ErrorBoundary.tsx';
import Sidebar from './components/shared/Sidebar.tsx';
import Header from './components/shared/Header.tsx';
import Footer from './components/shared/Footer.tsx';
import Home from './pages/Home.tsx';
import Destinations from './pages/Destinations.tsx';
import Packages from './pages/Packages.tsx';
import Booking from './pages/Booking.tsx';
import About from './pages/About.tsx';
import Contact from './pages/Contact.tsx';
import Terms from './pages/Terms.tsx';
import NotFound from './pages/NotFound.tsx';
import AllDeals from './pages/AllDeals.tsx';
import DomesticDeals from './pages/DomesticDeals.tsx';
import InternationalDeals from './pages/InternationalDeals.tsx'
import Test from './pages/Test.tsx'
import CartPage from './pages/CartPage.tsx';
import CheckoutPage from './pages/CheckoutPage.tsx';
import ConfirmationPage from './pages/ConfirmationPage.tsx';
import MyBookingsPage from './pages/MyBookingsPage.tsx';

const App: React.FC = () => {
  // State to manage sidebar visibility
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen">
        <Header toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/alldeals" element={<AllDeals />} />
            <Route path="/domestic-deals" element={<DomesticDeals />} />
             <Route path="/international-deals" element={<InternationalDeals />} />
            <Route path="/booking/:packageId" element={<Booking />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
             <Route path="/test" element={<Test />} />
             <Route path="/cart" element={<CartPage />} />
             <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/my-bookings" element={<MyBookingsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default App;