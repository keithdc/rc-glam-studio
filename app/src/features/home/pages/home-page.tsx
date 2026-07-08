/**
 * @file home-page.tsx — Main landing page assembling all portfolio sections
 * @feature home
 * @dependencies All section components
 */
import { Box } from "@mui/material";
import Navbar from "../components/navbar";
import HeroSection from "../components/hero-section";
import AboutSection from "../components/about-section";
import ServicesSection from "../components/services-section";
import GallerySection from "../components/gallery-section";
import TestimonialsSection from "../components/testimonials-section";
import ContactSection from "../components/contact-section";
import Footer from "../components/footer";

/** Full single-page portfolio layout with all sections. */
function HomePage(): React.JSX.Element {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        overflowX: "hidden",
      }}
    >
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </Box>
  );
}

export default HomePage;
