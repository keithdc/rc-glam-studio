/**
 * @file services-section.tsx — Services showcase with scroll-aware animations
 * @feature home
 * @dependencies @mui/material, magicui components
 */
import { Box, Container, Typography, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CelebrationIcon from "@mui/icons-material/Celebration";
import SchoolIcon from "@mui/icons-material/School";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import { ScrollReveal } from "@/components/magicui/scroll-reveal";
import { BorderBeam } from "@/components/magicui/border-beam";
import { BoxReveal } from "@/components/magicui/box-reveal";
import type { SvgIconComponent } from "@mui/icons-material";

// --- Services Data ---
interface ServiceItem {
  icon: SvgIconComponent;
  title: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  {
    icon: FavoriteIcon,
    title: "Bridal Makeup",
    description:
      "Your dream bridal look — flawless, long-lasting, and perfectly tailored to complement your gown and venue.",
  },
  {
    icon: CelebrationIcon,
    title: "Special Events",
    description:
      "Proms, galas, birthdays — look stunning for every celebration with a custom glam session.",
  },
  {
    icon: CameraAltIcon,
    title: "Editorial & Photoshoot",
    description:
      "High-fashion and creative looks designed for the camera. Perfect for portfolios and campaigns.",
  },
  {
    icon: FaceRetouchingNaturalIcon,
    title: "Everyday Glam",
    description:
      "Effortless, polished looks for corporate events, date nights, or any day you want to glow.",
  },
  {
    icon: SchoolIcon,
    title: "Makeup Lessons",
    description:
      "One-on-one tutorials teaching you techniques to recreate professional looks at home.",
  },
  {
    icon: AutoAwesomeIcon,
    title: "Group Packages",
    description:
      "Perfect for bridal parties, debuts, and events. Coordinated looks for the whole squad.",
  },
];

/** Services section with bi-directional scroll-reveal cards and BorderBeam. */
function ServicesSection(): React.JSX.Element {
  return (
    <Box
      component="section"
      id="services"
      sx={{
        py: { xs: 10, md: 16 },
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "linear-gradient(180deg, transparent 0%, rgba(183, 110, 121, 0.03) 50%, transparent 100%)"
            : "linear-gradient(180deg, transparent 0%, rgba(183, 110, 121, 0.04) 50%, transparent 100%)",
      }}
    >
      <Container maxWidth="lg">
        {/* --- Section Header --- */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
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
              What I Offer
            </Typography>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <BoxReveal boxColor="#B76E79" duration={0.6}>
              <Typography
                variant="h2"
                sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
              >
                Services Crafted for You
              </Typography>
            </BoxReveal>
          </ScrollReveal>
        </Box>

        {/* --- Service Cards with scroll-reveal stagger --- */}
        <Grid container spacing={3}>
          {SERVICES.map((service, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={service.title}>
              <ScrollReveal
                direction="up"
                delay={index * 0.08}
                scale={0.95}
                offset={40}
              >
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: 3,
                    overflow: "hidden",
                    bgcolor: "background.paper",
                    backdropFilter: "blur(10px)",
                    border: 1,
                    borderColor: "divider",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "primary.light",
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 30px rgba(183, 110, 121, 0.15)",
                    },
                  }}
                >
                  <BorderBeam
                    size={120}
                    duration={8 + index * 2}
                    colorFrom="#B76E79"
                    colorTo="#D4A0A7"
                    delay={index * 2}
                  />
                  <CardContent sx={{ p: 4, textAlign: "center" }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        backgroundColor: "rgba(183, 110, 121, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 3,
                      }}
                    >
                      <service.icon
                        sx={{ fontSize: 28, color: "primary.main" }}
                      />
                    </Box>
                    <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {service.description}
                    </Typography>
                  </CardContent>
                </Box>
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default ServicesSection;
