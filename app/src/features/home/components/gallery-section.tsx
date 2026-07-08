/**
 * @file gallery-section.tsx — Portfolio preview grid (makeup palette style) with link to full gallery
 * @feature home
 * @dependencies framer-motion, @mui/material, magicui components
 */
import { Box, Container, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/magicui/scroll-reveal";
import { BoxReveal } from "@/components/magicui/box-reveal";

// --- Gallery placeholder items ---
interface GalleryItem {
  id: number;
  label: string;
  /** Columns on desktop (4-col grid) */
  colsLg: number;
  /** Columns on mobile (2-col grid) */
  colsSm: number;
  /** Rows on desktop */
  rowsLg: number;
  /** Rows on mobile */
  rowsSm: number;
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, label: "Bridal Glam", colsLg: 2, colsSm: 2, rowsLg: 2, rowsSm: 1 },
  { id: 2, label: "Soft Glam", colsLg: 1, colsSm: 1, rowsLg: 1, rowsSm: 1 },
  { id: 3, label: "Editorial", colsLg: 1, colsSm: 1, rowsLg: 1, rowsSm: 1 },
  { id: 4, label: "Dewy Look", colsLg: 1, colsSm: 1, rowsLg: 2, rowsSm: 1 },
  { id: 5, label: "Evening Glam", colsLg: 1, colsSm: 1, rowsLg: 1, rowsSm: 1 },
  {
    id: 6,
    label: "Natural Beauty",
    colsLg: 2,
    colsSm: 2,
    rowsLg: 1,
    rowsSm: 1,
  },
];

/** Portfolio preview section — compact palette grid with "View All" link. */
function GallerySection(): React.JSX.Element {
  return (
    <Box
      component="section"
      id="portfolio"
      sx={{ py: { xs: 6, sm: 8, md: 16 } }}
    >
      <Container maxWidth="lg">
        {/* --- Section Header --- */}
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
        </Box>

        {/* --- Palette-style Grid (always 2 cols on mobile, 4 on desktop) --- */}
        <ScrollReveal direction="up" delay={0.2} offset={60}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gridAutoRows: { xs: 100, sm: 130, md: 180 },
              gap: { xs: 1, sm: 1.5, md: 1.5 },
            }}
          >
            {GALLERY_ITEMS.map((item) => (
              <Box
                key={item.id}
                sx={{
                  gridColumn: {
                    xs: `span ${String(item.colsSm)}`,
                    md: `span ${String(item.colsLg)}`,
                  },
                  gridRow: {
                    xs: `span ${String(item.rowsSm)}`,
                    md: `span ${String(item.rowsLg)}`,
                  },
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
                      background: (t) =>
                        t.palette.mode === "dark"
                          ? `linear-gradient(${String(135 + item.id * 30)}deg, rgba(183, 110, 121, ${String(0.1 + item.id * 0.05)}) 0%, rgba(114, 47, 55, 0.15) 100%)`
                          : `linear-gradient(${String(135 + item.id * 30)}deg, rgba(183, 110, 121, ${String(0.08 + item.id * 0.03)}) 0%, rgba(245, 230, 211, 0.3) 100%)`,
                      border: 1,
                      borderColor: "divider",
                      borderRadius: 2.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: "primary.main",
                      },
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: "primary.main",
                        fontStyle: "italic",
                        opacity: 0.8,
                        fontSize: { xs: "0.75rem", sm: "0.85rem", md: "1rem" },
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                </motion.div>
              </Box>
            ))}
          </Box>
        </ScrollReveal>

        {/* --- View All Button --- */}
        <ScrollReveal direction="up" delay={0.3}>
          <Box sx={{ textAlign: "center", mt: { xs: 3, md: 5 } }}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              href="/portfolio"
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
