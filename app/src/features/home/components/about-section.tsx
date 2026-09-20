/**
 * @file about-section.tsx — About the artist section with scroll-aware animations
 * @feature home
 * @dependencies framer-motion, @mui/material, magicui components
 */
import { Box, Container, Typography, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ScrollReveal } from "@/components/magicui/scroll-reveal";
import { ScrollParallax } from "@/components/magicui/scroll-parallax";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { NumberTicker } from "@/components/magicui/number-ticker";
import AboutPhotoCarousel from "./about-photo-carousel";

// --- Stats Data ---
const STATS = [
  { value: 500, suffix: "+", label: "Happy Clients" },
  { value: 8, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Bridal Looks" },
  { value: 100, suffix: "%", label: "Satisfaction" },
];

/** About section with bi-directional scroll animations and parallax. */
function AboutSection(): React.JSX.Element {
  return (
    <Box
      component="section"
      id="about"
      sx={{
        py: { xs: 6, sm: 8, md: 16 },
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, sm: 5, md: 8 }} alignItems="center">
          {/* --- About photo carousel --- */}
          <Grid size={{ xs: 12, md: 5 }}>
            <ScrollReveal direction="left" duration={0.7}>
              <ScrollParallax speed={0.15}>
                <AboutPhotoCarousel />
              </ScrollParallax>
            </ScrollReveal>
          </Grid>

          {/* --- Content Side --- */}
          <Grid size={{ xs: 12, md: 7 }}>
            <ScrollReveal direction="right" delay={0.1}>
              <Typography
                variant="overline"
                sx={{
                  color: "primary.main",
                  letterSpacing: 3,
                  mb: 2,
                  display: "block",
                }}
              >
                About the Artist
              </Typography>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <BoxReveal boxColor="#B76E79" duration={0.6} delay={0.1}>
                <Typography
                  variant="h2"
                  sx={{ fontSize: { xs: "2rem", md: "3rem" }, mb: 3 }}
                >
                  Where Artistry Meets Elegance
                </Typography>
              </BoxReveal>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", mb: 2 }}
              >
                With over 8 years of experience in the beauty industry, Rhoda
                Cordova specializes in creating flawless, long-lasting makeup
                looks that enhance your natural beauty. From intimate weddings
                to high-fashion editorials, every face tells a unique story.
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", mb: 4 }}
              >
                Using only premium, skin-loving products, each session is
                tailored to your personal style, skin type, and the occasion.
                Because you deserve to feel confident and radiant.
              </Typography>
            </ScrollReveal>

            {/* --- Stats with NumberTicker --- */}
            <ScrollReveal direction="up" delay={0.4}>
              <Stack
                direction="row"
                spacing={4}
                flexWrap="wrap"
                useFlexGap
                sx={{ mt: 2 }}
              >
                {STATS.map((stat) => (
                  <Box
                    key={stat.label}
                    sx={{ textAlign: "center", minWidth: 100 }}
                  >
                    <Typography
                      variant="h3"
                      component="div"
                      sx={{ color: "primary.main", fontWeight: 700 }}
                    >
                      <NumberTicker
                        value={stat.value}
                        className="text-rose-gold font-bold"
                      />
                      <span>{stat.suffix}</span>
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mt: 0.5 }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </ScrollReveal>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AboutSection;
