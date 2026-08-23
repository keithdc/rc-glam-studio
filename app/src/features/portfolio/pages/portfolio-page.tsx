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
import { useSearchParams } from "react-router-dom";
import { BlurFade } from "@/components/magicui/blur-fade";
import Logo from "@/shared/components/logo";
import ProtectedImage from "@/shared/components/protected-image";
import { useColorMode } from "@/shared/hooks/use-color-mode";
import {
  getPortfolioGalleryItems,
  isWorkCategory,
  type WorkCategory,
} from "@/shared/portfolio-media";

// --- Portfolio categories ---
const CATEGORIES: Array<"All" | WorkCategory> = [
  "All",
  "Bridal",
  "Editorial",
  "Events",
  "Everyday",
  "Lessons",
];

/** Full portfolio gallery page with category filtering. */
function PortfolioPage(): React.JSX.Element {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") ?? "";
  const initialCategory: "All" | WorkCategory = isWorkCategory(categoryParam)
    ? categoryParam
    : "All";
  const [activeCategory, setActiveCategory] = useState<"All" | WorkCategory>(
    initialCategory,
  );
  const { mode } = useColorMode();
  const isDark = mode === "dark";
  const portfolioItems = getPortfolioGalleryItems();

  const filteredItems =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

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
          <Logo variant="mark" height={{ xs: 44, md: 52 }} />
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
          {filteredItems.map((item, index) => {
            const photoSrc = item.src;

            return (
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
                  aspectRatio:
                    item.aspect === "portrait"
                      ? "3/4"
                      : item.aspect === "landscape"
                        ? "4/3"
                        : "1/1",
                  borderRadius: 2,
                  overflow: "hidden",
                  background: (t) =>
                    photoSrc != null
                      ? t.palette.action.hover
                      : t.palette.mode === "dark"
                        ? `linear-gradient(${String(135 + index * 20)}deg, rgba(183, 110, 121, ${String(0.08 + (index % 5) * 0.04)}) 0%, rgba(114, 47, 55, 0.12) 100%)`
                        : `linear-gradient(${String(135 + index * 20)}deg, rgba(183, 110, 121, ${String(0.06 + (index % 5) * 0.03)}) 0%, rgba(245, 230, 211, 0.25) 100%)`,
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
                {photoSrc != null ? (
                  <ProtectedImage
                    src={photoSrc}
                    alt={item.label}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: "primary.main",
                        fontStyle: "italic",
                        opacity: 0.8,
                        px: 1,
                        textAlign: "center",
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                )}
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
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}

export default PortfolioPage;
