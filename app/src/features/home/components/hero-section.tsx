/**
 * @file hero-section.tsx — Full-screen hero with MagicUI animations
 * @feature home
 * @dependencies framer-motion, @mui/material, magicui components
 */
import { Box, Container, Typography, Stack, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { Particles } from "@/components/magicui/particles";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Ripple } from "@/components/magicui/ripple";
import { useColorMode } from "@/shared/hooks/use-color-mode";
import Logo from "@/shared/components/logo";

/** Full-screen hero section with MagicUI particles, ripple, and shimmer button. */
function HeroSection(): React.JSX.Element {
  const theme = useTheme();
  const { mode } = useColorMode();
  const isDark = mode === "dark";

  return (
    <Box
      component="section"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        bgcolor: "background.default",
      }}
    >
      {/* --- MagicUI Particles Background --- */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={60}
        color={isDark ? "#B76E79" : "#8B4A52"}
        size={0.5}
        staticity={30}
        ease={60}
      />

      {/* --- MagicUI Ripple Effect --- */}
      <Ripple
        mainCircleSize={300}
        mainCircleOpacity={isDark ? 0.12 : 0.08}
        numCircles={6}
      />

      <Container
        maxWidth="md"
        sx={{ position: "relative", zIndex: 1, textAlign: "center" }}
      >
        {/* --- Logo with BlurFade --- */}
        <BlurFade delay={0.2} inView>
          <Logo
            height={{ xs: 90, md: 160 }}
            sx={{
              mx: "auto",
              mb: { xs: 2, md: 4 },
              display: "block",
              filter: isDark
                ? "drop-shadow(0 0 40px rgba(183, 110, 121, 0.4))"
                : "drop-shadow(0 0 20px rgba(183, 110, 121, 0.2))",
            }}
          />
        </BlurFade>

        {/* --- Headline --- */}
        <BlurFade delay={0.4} inView>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2rem", md: "4.5rem" },
              color: "text.primary",
              mb: { xs: 1.5, md: 2 },
            }}
          >
            Elevate Your Beauty
          </Typography>
        </BlurFade>

        {/* --- Subtext --- */}
        <BlurFade delay={0.6} inView>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "0.9rem", md: "1.25rem" },
              color: "text.secondary",
              maxWidth: 600,
              mx: "auto",
              mb: { xs: 3, md: 5 },
            }}
          >
            Professional makeup artistry for your most important moments.
            Bridal, editorial, and special occasion glam — crafted with
            precision and passion.
          </Typography>
        </BlurFade>

        {/* --- CTA Buttons with MagicUI ShimmerButton --- */}
        <BlurFade delay={0.8} inView>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <a href="#contact" style={{ textDecoration: "none" }}>
              <ShimmerButton
                shimmerColor="#D4A0A7"
                background="rgba(183, 110, 121, 0.9)"
                borderRadius="30px"
                shimmerDuration="2.5s"
                className="text-base font-medium px-8 py-3"
              >
                Book a Session
              </ShimmerButton>
            </a>
            <a href="#services" style={{ textDecoration: "none" }}>
              <ShimmerButton
                shimmerColor={isDark ? "#B76E79" : "#8B4A52"}
                background={
                  isDark ? "rgba(26, 26, 46, 0.8)" : "rgba(255, 255, 255, 0.9)"
                }
                borderRadius="30px"
                shimmerDuration="3s"
                className={`text-base font-medium px-8 py-3 ${isDark ? "" : "!text-charcoal"}`}
              >
                View Services
              </ShimmerButton>
            </a>
          </Stack>
        </BlurFade>
      </Container>

      {/* --- Scroll indicator --- */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
        }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Box
          sx={{
            width: 24,
            height: 40,
            border: `2px solid ${theme.palette.primary.main}50`,
            borderRadius: 12,
            display: "flex",
            justifyContent: "center",
            pt: 1,
          }}
        >
          <motion.div
            style={{
              width: 4,
              height: 8,
              borderRadius: 4,
              backgroundColor: theme.palette.primary.main,
            }}
            animate={{ opacity: [1, 0], y: [0, 12] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </Box>
      </motion.div>
    </Box>
  );
}

export default HeroSection;
