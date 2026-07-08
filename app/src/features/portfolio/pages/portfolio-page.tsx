/**
 * @file portfolio-page.tsx — Full portfolio gallery page
 * @feature portfolio
 * @dependencies @mui/material, framer-motion, magicui components
 */
import {
  Box,
  Container,
  Typography,
  IconButton,
  Chip,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import Logo from "@/shared/components/logo";
import { useColorMode } from "@/shared/hooks/use-color-mode";

// --- Portfolio categories ---
const CATEGORIES = [
  "All",
  "Bridal",
  "Editorial",
  "Events",
  "Everyday",
  "Lessons",
];

// --- Portfolio items (placeholders — replace with real images) ---
interface PortfolioItem {
  id: number;
  label: string;
  category: string;
  aspect: "portrait" | "landscape" | "square";
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: 1, label: "Bridal Classic", category: "Bridal", aspect: "portrait" },
  { id: 2, label: "Soft Glam Bride", category: "Bridal", aspect: "landscape" },
  { id: 3, label: "Editorial Bold", category: "Editorial", aspect: "square" },
  { id: 4, label: "Magazine Cover", category: "Editorial", aspect: "portrait" },
  { id: 5, label: "Debut Night", category: "Events", aspect: "landscape" },
  { id: 6, label: "Prom Queen", category: "Events", aspect: "square" },
  { id: 7, label: "Corporate Ready", category: "Everyday", aspect: "portrait" },
  {
    id: 8,
    label: "Date Night Glow",
    category: "Everyday",
    aspect: "landscape",
  },
  { id: 9, label: "Bridal Party", category: "Bridal", aspect: "landscape" },
  { id: 10, label: "Creative Art", category: "Editorial", aspect: "square" },
  { id: 11, label: "Gala Evening", category: "Events", aspect: "portrait" },
  { id: 12, label: "Natural Dewy", category: "Everyday", aspect: "square" },
  {
    id: 13,
    label: "Tutorial Session",
    category: "Lessons",
    aspect: "landscape",
  },
  {
    id: 14,
    label: "Smokey Eye Class",
    category: "Lessons",
    aspect: "portrait",
  },
  { id: 15, label: "Beach Wedding", category: "Bridal", aspect: "landscape" },
  { id: 16, label: "Fashion Week", category: "Editorial", aspect: "portrait" },
];

/** Full portfolio gallery page with category filtering. */
function PortfolioPage(): React.JSX.Element {
  const [activeCategory, setActiveCategory] = useState("All");
  const { mode } = useColorMode();
  const isDark = mode === "dark";

  const filteredItems =
    activeCategory === "All"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  const getAspectRatio = (aspect: PortfolioItem["aspect"]): string => {
    switch (aspect) {
      case "portrait":
        return "3/4";
      case "landscape":
        return "4/3";
      case "square":
        return "1/1";
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        pt: { xs: 3, md: 5 },
        pb: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        {/* --- Header with back button --- */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: { xs: 4, md: 6 },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              href="/#portfolio"
              aria-label="Back to home"
              sx={{
                border: 1,
                borderColor: "divider",
                color: "text.primary",
                "&:hover": {
                  borderColor: "primary.main",
                  color: "primary.main",
                },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Box>
              <Typography
                variant="h4"
                sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}
              >
                Portfolio
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                A collection of my best work
              </Typography>
            </Box>
          </Box>
          <Logo height={{ xs: 36, md: 48 }} />
        </Box>

        {/* --- Category Filter --- */}
        <BlurFade delay={0.2} inView>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              mb: { xs: 3, md: 5 },
              overflowX: "auto",
              pb: 1,
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {CATEGORIES.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                onClick={() => {
                  setActiveCategory(cat);
                }}
                variant={activeCategory === cat ? "filled" : "outlined"}
                color={activeCategory === cat ? "primary" : "default"}
                sx={{
                  borderColor:
                    activeCategory === cat ? "primary.main" : "divider",
                  fontWeight: activeCategory === cat ? 600 : 400,
                  flexShrink: 0,
                }}
              />
            ))}
          </Stack>
        </BlurFade>

        {/* --- Masonry-style Grid --- */}
        <Box
          sx={{
            columns: { xs: 2, sm: 3, md: 4 },
            columnGap: { xs: "8px", sm: "12px", md: "16px" },
          }}
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              style={{ breakInside: "avoid", marginBottom: 8 }}
            >
              <Box
                sx={{
                  position: "relative",
                  aspectRatio: getAspectRatio(item.aspect),
                  borderRadius: 2,
                  overflow: "hidden",
                  background: (t) =>
                    t.palette.mode === "dark"
                      ? `linear-gradient(${String(135 + item.id * 20)}deg, rgba(183, 110, 121, ${String(0.08 + (item.id % 5) * 0.04)}) 0%, rgba(114, 47, 55, 0.12) 100%)`
                      : `linear-gradient(${String(135 + item.id * 20)}deg, rgba(183, 110, 121, ${String(0.06 + (item.id % 5) * 0.03)}) 0%, rgba(245, 230, 211, 0.25) 100%)`,
                  border: 1,
                  borderColor: "divider",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "primary.main",
                    transform: "scale(1.02)",
                    boxShadow: isDark
                      ? "0 8px 24px rgba(183, 110, 121, 0.2)"
                      : "0 8px 24px rgba(183, 110, 121, 0.12)",
                  },
                  "&:hover .portfolio-label": {
                    opacity: 1,
                  },
                }}
              >
                {/* --- Hover overlay with label --- */}
                <Box
                  className="portfolio-label"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: isDark
                      ? "rgba(0,0,0,0.5)"
                      : "rgba(255,255,255,0.6)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "primary.main", fontWeight: 600 }}
                  >
                    {item.label}
                  </Typography>
                </Box>

                {/* --- Category badge --- */}
                <Chip
                  label={item.category}
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    fontSize: "0.65rem",
                    height: 22,
                    bgcolor: isDark
                      ? "rgba(0,0,0,0.6)"
                      : "rgba(255,255,255,0.8)",
                    color: "primary.main",
                    backdropFilter: "blur(4px)",
                  }}
                />
              </Box>
            </motion.div>
          ))}
        </Box>

        {/* --- Empty state --- */}
        {filteredItems.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              No works in this category yet. Check back soon!
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default PortfolioPage;
