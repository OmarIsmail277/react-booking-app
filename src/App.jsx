import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./components/Layout";
const HomePage = lazy(() => import("./pages/HomePage"));
const HotelDetailsPage = lazy(() => import("./pages/HotelDetailsPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const HotelSearchPage = lazy(() => import("./pages/HotelSearchPage"));
const HotelBookingOverviewPage = lazy(() =>
  import("./pages/HotelBookingOverviewPage")
);

const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const Summary = lazy(() => import("./pages/MyBookingsPage"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/booking" element={<HotelBookingOverviewPage />} />
            <Route path="/search" element={<HotelSearchPage />} />
            <Route path="/hotel/:id" element={<HotelDetailsPage />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
