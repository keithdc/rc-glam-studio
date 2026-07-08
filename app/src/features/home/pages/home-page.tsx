/**
 * @file home-page.tsx — Main landing page assembling all portfolio sections
 * @feature home
 * @dependencies All section components
 */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../components/navbar";
import HeroSection from "../components/hero-section";
import AboutSection from "../components/about-section";
import ServicesSection from "../components/services-section";
import PricingSection from "../components/pricing-section";
import GallerySection from "../components/gallery-section";
import TestimonialsSection from "../components/testimonials-section";
import ContactSection from "../components/contact-section";
import Footer from "../components/footer";

/** Full single-page portfolio layout with all sections. */
function HomePage(): React.JSX.Element {
  const location = useLocation();

  // Scroll to the correct section when navigating back with a hash (e.g. /#portfolio)
  useEffect(() => {
    if (location.hash) {
      // Handle #contact-bloom, #contact-luxe, #contact-prestige → scroll to #contact
      const targetId = location.hash.startsWith("#contact-")
        ? "#contact"
        : location.hash;
      const el = document.querySelector(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location.hash]);

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
      <PricingSection />
      <GallerySection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </Box>
  );
}

export default HomePage;
