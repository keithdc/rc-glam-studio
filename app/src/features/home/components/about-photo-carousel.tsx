/**
 * @file about-photo-carousel.tsx — Ranked photo slider for the About section
 * @feature home
 * @dependencies @mui/material, ProtectedImage, useSnapCarousel
 */
import { useState } from "react";
import {
  Box,
  Dialog,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ProtectedImage from "@/shared/components/protected-image";
import { getAboutPhotos } from "@/shared/about-media";
import { useCarouselAutoplay } from "../hooks/use-carousel-autoplay";
import { useSnapCarousel } from "../hooks/use-snap-carousel";

/** RC placeholder when public/about has no photos yet. */
function AboutPlaceholder(): React.JSX.Element {
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 4,
        overflow: "hidden",
        aspectRatio: "1 / 1",
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
          fontSize: { xs: "3rem", sm: "4rem", md: "6rem" },
          color: "primary.main",
          opacity: 0.3,
          fontStyle: "italic",
        }}
      >
        RC
      </Typography>
    </Box>
  );
}

/** Swipeable About photos; order follows 01-, 02- filenames in public/about. */
function AboutPhotoCarousel(): React.JSX.Element {
  const photos = getAboutPhotos();
  const carousel = useSnapCarousel();
  const lastIndex = photos.length - 1;
  const showControls = photos.length > 1;
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const activePhoto = viewerIndex != null ? photos[viewerIndex] : undefined;

  useCarouselAutoplay({
    enabled: showControls,
    paused: hovered || reduceMotion || viewerIndex != null,
    count: photos.length,
    activeIndex: carousel.activeIndex,
    scrollToIndex: carousel.scrollToIndex,
  });

  if (photos.length === 0) {
    return <AboutPlaceholder />;
  }

  return (
    <Box>
      <Box
        aria-roledescription="carousel"
        aria-label="About photos"
        onMouseEnter={() => {
          setHovered(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
        }}
        sx={{
          position: "relative",
          borderRadius: 4,
          overflow: "hidden",
          aspectRatio: "1 / 1",
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
          p: { xs: 1, md: 1.5 },
        }}
      >
        <Box
          ref={carousel.scrollerRef}
          onScroll={carousel.handleScroll}
          sx={{
            display: "flex",
            height: "100%",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {photos.map((photo, index) => (
            <Box
              key={photo.src}
              ref={carousel.setSlideRef(index)}
              component="button"
              type="button"
              aria-label={`View ${photo.label}`}
              onClick={() => {
                setViewerIndex(index);
              }}
              sx={{
                flex: "0 0 100%",
                height: "100%",
                p: 0,
                border: 0,
                bgcolor: "transparent",
                cursor: "pointer",
                scrollSnapAlign: "center",
              }}
            >
              <ProtectedImage
                src={photo.src}
                alt={photo.label}
                watermark={false}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  objectPosition: "center",
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>

      {showControls && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            mt: 1.5,
          }}
        >
          <IconButton
            aria-label="Previous photo"
            size="small"
            disabled={carousel.activeIndex === 0}
            onClick={() => {
              carousel.scrollToIndex(Math.max(0, carousel.activeIndex - 1));
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          {photos.map((photo, index) => (
            <Box
              key={photo.src}
              component="button"
              type="button"
              aria-label={`Show ${photo.label}`}
              aria-current={carousel.activeIndex === index ? true : undefined}
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
            aria-label="Next photo"
            size="small"
            disabled={carousel.activeIndex === lastIndex}
            onClick={() => {
              carousel.scrollToIndex(Math.min(lastIndex, carousel.activeIndex + 1));
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      )}

      <Dialog
        open={activePhoto != null}
        onClose={() => {
          setViewerIndex(null);
        }}
        maxWidth={false}
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            "@media (max-width: 1199.95px)": {
              margin: 0,
              width: "100%",
              maxWidth: "100%",
              height: "100%",
              maxHeight: "100%",
              borderRadius: 0,
            },
          },
        }}
        slotProps={{
          paper: {
            sx: {
              bgcolor: "background.paper",
              backgroundImage: "none",
              overflow: "hidden",
              borderRadius: { xs: 0, lg: 2 },
              m: { xs: 0, lg: 4 },
              width: { xs: "100%", lg: "min(900px, calc(100% - 64px))" },
              maxWidth: { xs: "100%", lg: "900px" },
              height: { xs: "100%", lg: "auto" },
              maxHeight: { xs: "100%", lg: "90vh" },
            },
          },
        }}
      >
        {activePhoto != null && (
          <Box
            sx={{
              position: "relative",
              height: { xs: "100%", lg: "auto" },
              minHeight: { xs: "100dvh", lg: 0 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "background.default",
            }}
          >
            <IconButton
              aria-label="Close photo"
              onClick={() => {
                setViewerIndex(null);
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
              fill
              watermark={false}
              src={activePhoto.src}
              alt={activePhoto.label}
              sx={{
                width: "100%",
                height: { xs: "100%", lg: "auto" },
                maxHeight: { xs: "100%", lg: "85vh" },
                objectFit: "contain",
              }}
            />
          </Box>
        )}
      </Dialog>
    </Box>
  );
}

export default AboutPhotoCarousel;
