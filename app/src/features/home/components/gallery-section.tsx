/**
 * @file gallery-section.tsx — Home highlights: one card per work collection
 * @feature home
 * @dependencies framer-motion, @mui/material, magicui components
 */
import { Box, Container, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/magicui/scroll-reveal";
import { BoxReveal } from "@/components/magicui/box-reveal";
import ProtectedImage from "@/shared/components/protected-image";
import {
  getCollectionPreviews,
  type WorkCategory,
} from "@/shared/portfolio-media";

interface CollectionLayout {
  category: WorkCategory;
  colsLg: number;
  colsSm: number;
  rowsLg: number;
  rowsSm: number;
}

const COLLECTION_LAYOUT: CollectionLayout[] = [
  { category: "Bridal", colsLg: 2, colsSm: 2, rowsLg: 2, rowsSm: 1 },
  { category: "Editorial", colsLg: 1, colsSm: 1, rowsLg: 1, rowsSm: 1 },
  { category: "Events", colsLg: 1, colsSm: 1, rowsLg: 1, rowsSm: 1 },
  { category: "Everyday", colsLg: 1, colsSm: 1, rowsLg: 1, rowsSm: 1 },
  { category: "Lessons", colsLg: 2, colsSm: 1, rowsLg: 1, rowsSm: 1 },
];

/** Portfolio highlights — one tile per collection, linking to that gallery. */
function GallerySection(): React.JSX.Element {
  const previews = getCollectionPreviews();
  const previewByCategory = new Map(
    previews.map((preview) => [preview.category, preview]),
  );

  return (
    <Box
      component="section"
      id="portfolio"
      sx={{ py: { xs: 6, sm: 8, md: 16 } }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: { xs: 3, sm: 5, md: 8 } }}>
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
              My Work
            </Typography>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <BoxReveal boxColor="#B76E79" duration={0.6}>
              <Typography
                variant="h2"
                sx={{ fontSize: { xs: "1.75rem", md: "3rem" } }}
              >
                Portfolio Highlights
              </Typography>
            </BoxReveal>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                mt: 2,
                maxWidth: 520,
                mx: "auto",
              }}
            >
              Bridal, editorial, events, everyday glam, and lessons — each
              collection lives in its own gallery.
            </Typography>
          </ScrollReveal>
        </Box>

        <ScrollReveal direction="up" delay={0.2} offset={60}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gridAutoRows: { xs: 140, sm: 170, md: 200 },
              gap: { xs: 1, sm: 1.5, md: 1.5 },
            }}
          >
            {COLLECTION_LAYOUT.map((item, index) => {
              const preview = previewByCategory.get(item.category);
              const coverSrc = preview?.coverSrc;
              const href = `/portfolio?category=${encodeURIComponent(item.category)}`;

              return (
                <Box
                  key={item.category}
                  component={RouterLink}
                  to={href}
                  sx={{
                    gridColumn: {
                      xs: `span ${String(item.colsSm)}`,
                      md: `span ${String(item.colsLg)}`,
                    },
                    gridRow: {
                      xs: `span ${String(item.rowsSm)}`,
                      md: `span ${String(item.rowsLg)}`,
                    },
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <motion.div
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: 10,
                    }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        background: (t) =>
                          coverSrc != null
                            ? "transparent"
                            : t.palette.mode === "dark"
                              ? `linear-gradient(${String(135 + index * 30)}deg, rgba(183, 110, 121, ${String(0.1 + index * 0.05)}) 0%, rgba(114, 47, 55, 0.15) 100%)`
                              : `linear-gradient(${String(135 + index * 30)}deg, rgba(183, 110, 121, ${String(0.08 + index * 0.03)}) 0%, rgba(245, 230, 211, 0.3) 100%)`,
                        border: 1,
                        borderColor: "divider",
                        borderRadius: 2.5,
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "border-color 0.3s ease",
                        "&:hover": {
                          borderColor: "primary.main",
                        },
                      }}
                    >
                      {coverSrc != null ? (
                        <>
                          <ProtectedImage
                            src={coverSrc}
                            alt={item.category}
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                          <Box
                            sx={{
                              position: "absolute",
                              inset: 0,
                              display: "flex",
                              alignItems: "flex-end",
                              p: { xs: 1.5, md: 2 },
                              background:
                                "linear-gradient(to top, rgba(26, 26, 46, 0.72) 0%, rgba(26, 26, 46, 0) 55%)",
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                color: "#FFFFFF",
                                fontFamily: "Playfair Display, serif",
                                fontWeight: 500,
                                fontSize: { xs: "1rem", md: "1.25rem" },
                              }}
                            >
                              {item.category}
                            </Typography>
                          </Box>
                        </>
                      ) : (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "primary.main",
                            fontStyle: "italic",
                            opacity: 0.85,
                            fontSize: {
                              xs: "0.85rem",
                              sm: "0.95rem",
                              md: "1.1rem",
                            },
                            fontFamily: "Playfair Display, serif",
                          }}
                        >
                          {item.category}
                        </Typography>
                      )}
                    </Box>
                  </motion.div>
                </Box>
              );
            })}
          </Box>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.3}>
          <Box sx={{ textAlign: "center", mt: { xs: 3, md: 5 } }}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              component={RouterLink}
              to="/portfolio"
            >
              View All Works
            </Button>
          </Box>
        </ScrollReveal>
      </Container>
    </Box>
  );
}

export default GallerySection;
