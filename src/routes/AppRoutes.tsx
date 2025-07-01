import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Loading from '../components/ui/Loading';

const Home = lazy(() => import('../pages/Home'));
const Destinations = lazy(() => import('../pages/Destinations'));
const Packages = lazy(() => import('../pages/Packages'));
const Booking = lazy(() => import('../pages/Booking'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const Terms = lazy(() => import('../pages/Terms'));
const NotFound = lazy(() => import('../pages/NotFound'));
const AllDeals = lazy(() => import('../pages/AllDeals'));
const DomesticDeals = lazy(() => import('../pages/DomesticDeals'));
const InternationalDeals = lazy(() => import('../pages/InternationalDeals'));
const Test = lazy(() => import('../pages/Test'));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="all-deals" element={<AllDeals />} />
          <Route path="domestic-deals" element={<DomesticDeals />} />
          <Route path="international-deals" element={<InternationalDeals />} />
          <Route path="destinations" element={<Destinations />} />
          <Route path="packages" element={<Packages />} />
          <Route path="booking/:id" element={<Booking />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
          <Route path="test" element={<Test />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;