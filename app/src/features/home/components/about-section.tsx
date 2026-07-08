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
        py: { xs: 10, md: 16 },
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          {/* --- Image Placeholder with Parallax --- */}
          <Grid size={{ xs: 12, md: 5 }}>
            <ScrollReveal direction="left" duration={0.7}>
              <ScrollParallax speed={0.15}>
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: 4,
                    overflow: "hidden",
                    aspectRatio: "3/4",
                    background: (theme) =>
                      theme.palette.mode === "dark"
                        ? "linear-gradient(135deg, rgba(183, 110, 121, 0.2) 0%, rgba(114, 47, 55, 0.1) 100%)"
                        : "linear-gradient(135deg, rgba(183, 110, 121, 0.1) 0%, rgba(245, 230, 211, 0.3) 100%)",
                    border: 1,
                    borderColor: "divider",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: "4rem", md: "6rem" },
                      color: "primary.main",
                      opacity: 0.3,
                      fontStyle: "italic",
                    }}
                  >
                    RC
                  </Typography>
                </Box>
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
                With over 8 years of experience in the beauty industry, RC Glam
                Studio specializes in creating flawless, long-lasting makeup
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
