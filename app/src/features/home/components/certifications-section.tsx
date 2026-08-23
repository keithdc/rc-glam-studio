/**
 * @file certifications-section.tsx — Nix Institute mentorship certificates gallery
 * @feature home
 * @dependencies @mui/material, magicui components
 */
import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Dialog,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ScrollReveal } from "@/components/magicui/scroll-reveal";
import { BoxReveal } from "@/components/magicui/box-reveal";
import ProtectedImage from "@/shared/components/protected-image";
import CertificateCard, {
  type CertificateItem,
} from "./certificate-card";
import { useSnapCarousel } from "../hooks/use-snap-carousel";

const CERTIFICATES: CertificateItem[] = [
  {
    src: "/certifications/fundamentals-of-makeup.jpg",
    course: "Fundamentals of Makeup",
    hours: "7 hours",
    date: "July 26, 2026",
    alt: "Certificate of Mentorship for Rhoda Cordova — Fundamentals of Makeup Class, Nix Institute of Beauty, July 26, 2026",
  },
  {
    src: "/certifications/eye-masterclass.jpg",
    course: "Eye Masterclass",
    hours: "8 hours",
    date: "August 12, 2026",
    alt: "Certificate of Mentorship for Rhoda Cordova — Eye Masterclass, Nix Institute of Beauty, August 12, 2026",
  },
  {
    src: "/certifications/hair-master-fundamentals.jpg",
    course: "Hair Master Fundamentals",
    hours: "5 hours",
    date: "August 16, 2026",
    alt: "Certificate of Mentorship for Rhoda Cordova — Hair Master Fundamentals Class, Nix Institute of Beauty, August 16, 2026",
  },
  {
    src: "/certifications/braiding-hair-masterclass.jpg",
    course: "Braiding Hair Masterclass",
    hours: "5 hours",
    date: "August 16, 2026",
    alt: "Certificate of Mentorship for Rhoda Cordova — Braiding Hair Masterclass, Nix Institute of Beauty, August 16, 2026",
  },
  {
    src: "/certifications/curling-hair-masterclass.jpg",
    course: "Curling Hair Masterclass",
    hours: "5 hours",
    date: "August 22, 2026",
    alt: "Certificate of Mentorship for Rhoda Cordova — Curling Hair Masterclass, Nix Institute of Beauty, August 22, 2026",
  },
  {
    src: "/certifications/updos-hair-masterclass.jpg",
    course: "Updos Hair Masterclass",
    hours: "5 hours",
    date: "August 22, 2026",
    alt: "Certificate of Mentorship for Rhoda Cordova — Updos Hair Masterclass, Nix Institute of Beauty, August 22, 2026",
  },
  {
    src: "/certifications/vintage-hair-masterclass.jpg?v=2",
    course: "Vintage Hair Masterclass",
    hours: "5 hours",
    date: "August 23, 2026",
    alt: "Certificate of Mentorship for Rhoda Cordova — Vintage Hair Masterclass, Nix Institute of Beauty, August 23, 2026",
  },
  {
    src: "/certifications/classic-hair-masterclass.jpg",
    course: "Classic Hair Masterclass",
    hours: "5 hours",
    date: "August 23, 2026",
    alt: "Certificate of Mentorship for Rhoda Cordova — Classic Hair Masterclass, Nix Institute of Beauty, August 23, 2026",
  },
];

const LAST_INDEX = CERTIFICATES.length - 1;

/** Mentorship certificates from Nix Institute of Beauty. */
function CertificationsSection(): React.JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeCert = activeIndex != null ? CERTIFICATES[activeIndex] : undefined;
  const carousel = useSnapCarousel();

  const openCert = (index: number): void => {
    setActiveIndex(index);
  };

  return (
    <Box
      component="section"
      id="certifications"
      sx={{ py: { xs: 6, sm: 8, md: 16 } }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: { xs: 4, sm: 5, md: 8 } }}>
          <ScrollReveal direction="up">
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                letterSpacing: 3,
                mb: 2,
                display: "block",
              }}
            >
              Credentials
            </Typography>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <BoxReveal boxColor="#B76E79" duration={0.6}>
              <Typography
                variant="h2"
                sx={{ fontSize: { xs: "1.75rem", md: "3rem" } }}
              >
                Certifications
              </Typography>
            </BoxReveal>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                mt: 2,
                maxWidth: 560,
                mx: "auto",
              }}
            >
              Certificates of Mentorship from Nix Institute of Beauty — makeup
              and hair masterclasses completed under professional guidance.
            </Typography>
          </ScrollReveal>
        </Box>

        <Box
          aria-roledescription="carousel"
          aria-label="Certification gallery"
          sx={{ display: { xs: "block", md: "none" } }}
        >
            <Typography
              variant="caption"
              sx={{
                display: "block",
                textAlign: "center",
                color: "text.secondary",
                mb: 1.5,
              }}
            >
              Swipe to see more
            </Typography>
            <Box
              ref={carousel.scrollerRef}
              onScroll={carousel.handleScroll}
              sx={{
                display: "flex",
                gap: 2,
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                scrollPaddingInline: 24,
                px: 1,
                pb: 1,
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              {CERTIFICATES.map((cert, index) => (
                <Box
                  key={cert.src}
                  ref={carousel.setSlideRef(index)}
                  sx={{
                    flex: "0 0 82%",
                    maxWidth: 420,
                    scrollSnapAlign: "center",
                  }}
                >
                  <CertificateCard
                    cert={cert}
                    onOpen={() => {
                      openCert(index);
                    }}
                  />
                </Box>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                mt: 2,
              }}
            >
              <IconButton
                aria-label="Previous certificate"
                size="small"
                disabled={carousel.activeIndex === 0}
                onClick={() => {
                  carousel.scrollToIndex(Math.max(0, carousel.activeIndex - 1));
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
              {CERTIFICATES.map((cert, index) => (
                <Box
                  key={cert.src}
                  component="button"
                  type="button"
                  aria-label={`Show ${cert.course}`}
                  aria-current={
                    carousel.activeIndex === index ? true : undefined
                  }
                  onClick={() => {
                    carousel.scrollToIndex(index);
                  }}
                  sx={{
                    width: carousel.activeIndex === index ? 18 : 8,
                    height: 8,
                    p: 0,
                    border: 0,
                    borderRadius: 4,
                    bgcolor:
                      carousel.activeIndex === index
                        ? "primary.main"
                        : "action.disabled",
                    cursor: "pointer",
                    transition: "width 0.2s ease, background-color 0.2s ease",
                  }}
                />
              ))}
              <IconButton
                aria-label="Next certificate"
                size="small"
                disabled={carousel.activeIndex === LAST_INDEX}
                onClick={() => {
                  carousel.scrollToIndex(
                    Math.min(LAST_INDEX, carousel.activeIndex + 1),
                  );
                }}
              >
                <ChevronRightIcon />
              </IconButton>
            </Box>
        </Box>

        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {CERTIFICATES.map((cert, index) => (
              <Grid size={{ md: 4, lg: 3 }} key={cert.src}>
                <ScrollReveal direction="up" delay={index * 0.06} offset={40}>
                  <CertificateCard
                    cert={cert}
                    onOpen={() => {
                      openCert(index);
                    }}
                  />
                </ScrollReveal>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <Dialog
        open={activeCert != null}
        onClose={() => {
          setActiveIndex(null);
        }}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              bgcolor: "background.paper",
              backgroundImage: "none",
              overflow: "hidden",
            },
          },
        }}
      >
        {activeCert != null && (
          <Box sx={{ position: "relative" }}>
            <IconButton
              aria-label="Close certificate"
              onClick={() => {
                setActiveIndex(null);
              }}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                zIndex: 1,
                bgcolor: "background.paper",
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <CloseIcon />
            </IconButton>
            <ProtectedImage
              fill={false}
              src={activeCert.src}
              alt={activeCert.alt}
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: "85vh",
                objectFit: "contain",
              }}
            />
          </Box>
        )}
      </Dialog>
    </Box>
  );
}

export default CertificationsSection;
