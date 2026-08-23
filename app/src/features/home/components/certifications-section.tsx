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
import { ScrollReveal } from "@/components/magicui/scroll-reveal";
import { BoxReveal } from "@/components/magicui/box-reveal";
import ProtectedImage from "@/shared/components/protected-image";

interface CertificateItem {
  src: string;
  course: string;
  hours: string;
  date: string;
  alt: string;
}

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

/** Mentorship certificates from Nix Institute of Beauty. */
function CertificationsSection(): React.JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeCert = activeIndex != null ? CERTIFICATES[activeIndex] : undefined;

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

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {CERTIFICATES.map((cert, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={cert.src}>
              <ScrollReveal direction="up" delay={index * 0.06} offset={40}>
                <Box
                  component="button"
                  type="button"
                  onClick={() => {
                    setActiveIndex(index);
                  }}
                  aria-label={`View ${cert.course} certificate`}
                  sx={{
                    display: "block",
                    width: "100%",
                    p: 0,
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 2,
                    overflow: "hidden",
                    bgcolor: "background.paper",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "primary.main",
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 28px rgba(183, 110, 121, 0.16)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      aspectRatio: "4 / 3",
                      bgcolor: "action.hover",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    <ProtectedImage
                      src={cert.src}
                      alt=""
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                  <Box sx={{ p: 1.75 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        color: "text.primary",
                        lineHeight: 1.3,
                      }}
                    >
                      {cert.course}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", display: "block", mt: 0.5 }}
                    >
                      Nix Institute of Beauty · {cert.hours}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary" }}
                    >
                      {cert.date}
                    </Typography>
                  </Box>
                </Box>
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>
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
