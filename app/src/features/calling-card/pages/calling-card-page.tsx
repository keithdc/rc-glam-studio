/**
 * @file calling-card-page.tsx — Screen preview and print workflow for studio calling card
 * @feature calling-card
 * @dependencies @mui/material, print-calling-card
 */
import { useCallback, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PrintCallingCard from "../components/print-calling-card";
import WebsiteQrStandalone from "../components/website-qr-standalone";
import { BUSINESS_PROFILE } from "@/shared/business-profile";
import { SHEET_COPY_COUNT } from "../components/calling-card-back-face";

const PRINT_MODE_SINGLE = "calling-card-print--single";
const PRINT_MODE_SHEET = "calling-card-print--sheet";

/** Preview page for the print calling card with trim/bleed guides and print CTA. */
function CallingCardPage(): React.JSX.Element {
  useEffect(() => {
    document.title = "Calling Card — Rhoda Cordova MUA";
    return () => {
      document.title = "Rhoda Cordova MUA — Professional Makeup Artist";
      document.documentElement.classList.remove(PRINT_MODE_SINGLE, PRINT_MODE_SHEET);
    };
  }, []);

  const runPrint = useCallback((mode: string): void => {
    document.documentElement.classList.remove(PRINT_MODE_SINGLE, PRINT_MODE_SHEET);
    document.documentElement.classList.add(mode);
    window.print();
    const clearMode = (): void => {
      document.documentElement.classList.remove(mode);
    };
    window.addEventListener("afterprint", clearMode, { once: true });
  }, []);

  const handlePrintSingle = useCallback((): void => {
    runPrint(PRINT_MODE_SINGLE);
  }, [runPrint]);

  const handlePrintSheet = useCallback((): void => {
    runPrint(PRINT_MODE_SHEET);
  }, [runPrint]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Container
        maxWidth="md"
        className="calling-card-print__screen-only"
        sx={{ py: { xs: 3, md: 4 } }}
      >
        <Stack spacing={2} sx={{ mb: 3, textAlign: { xs: "center", sm: "left" } }}>
          <Button
            component={RouterLink}
            to="/"
            startIcon={<ArrowBackIcon />}
            sx={{ alignSelf: { xs: "center", sm: "flex-start" }, color: "text.secondary" }}
          >
            Back to site
          </Button>
          <Typography
            variant="h4"
            sx={{ fontFamily: "Playfair Display, serif", color: "text.primary" }}
          >
            Print calling card
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: 520 }}>
            Standard 3.5″ × 2″ with inner margins; preview is 2× on screen. On the PDF, each card has a{" "}
            <strong>dashed rose border on the front only</strong> — cut using the front; backs have
            no border. Rose gold
            accents match the website palette.
            Back has three QRs — portfolio, Instagram, and Facebook. QRs use{" "}
            <code style={{ fontSize: "0.85em" }}>utm_source=qr</code>.
            Enable <strong>Background graphics</strong> when
            printing so creams and gradients render correctly.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{ pt: 0.5 }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<PrintIcon />}
              onClick={handlePrintSheet}
            >
              Save PDF — {String(SHEET_COPY_COUNT)} cards per page
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              startIcon={<PrintIcon />}
              onClick={handlePrintSingle}
            >
              Save PDF — one card (proof)
            </Button>
          </Stack>
          <Typography variant="caption" component="div" sx={{ color: "text.secondary" }}>
            Use <strong>{String(SHEET_COPY_COUNT)} cards per page</strong> for home printing: page 1
            = {String(SHEET_COPY_COUNT)} fronts, page 2 = {String(SHEET_COPY_COUNT)} backs. Flip on
            the short edge when printing two-sided.
          </Typography>
          <Box
            component="ul"
            sx={{
              m: 0,
              pl: 2.5,
              color: "text.secondary",
              fontSize: "0.75rem",
              "& li": { mb: 0.75 },
            }}
          >
            <li>
              <strong>Destination:</strong> Save as PDF first (recommended), then print the PDF at{" "}
              <strong>100% scale</strong> — not “Fit to page.”
            </li>
            <li>
              <strong>Paper:</strong> Letter or A4 is fine; use <strong>custom 3.5″ × 2″</strong> only
              if your printer driver offers it.
            </li>
            <li>
              <strong>Margins:</strong> None or Minimum.
            </li>
            <li>
              <strong>Background graphics:</strong> On (cream gradient and frames).
            </li>
            <li>
              <strong>Two-sided:</strong> Print page 1, then page 2 — flip on the{" "}
              <strong>short edge</strong> for duplex; re-feed for manual two-sided.
            </li>
            <li>
              <strong>Top row clipped?</strong> Use <strong>8 cards per page</strong> (not “Fit to
              page”). In the system print dialog, avoid extra top margins.
            </li>
          </Box>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Cut on the <strong>front</strong> dashed outline only. For many cards, send the
            PDF to a print shop (3.5″ × 2″ business card stock).
          </Typography>
          <Link
            component={RouterLink}
            to="/"
            underline="hover"
            sx={{ fontSize: "0.8rem", color: "primary.main" }}
          >
            rc-glam-studio.vercel.app
          </Link>
        </Stack>

        <Box
          sx={{
            mt: 4,
            p: { xs: 3, sm: 4 },
            borderRadius: 2,
            border: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontFamily: "Playfair Display, serif", mb: 1 }}
          >
            Web app QR
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 3, mx: "auto", maxWidth: 420 }}>
            Same generator as the calling card — links to{" "}
            <strong>{BUSINESS_PROFILE.websiteQrUrl}</strong>. Screenshot or
            right-click the code to save for Instagram stories, desk displays, or
            print at any size.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <WebsiteQrStandalone />
          </Box>
        </Box>
      </Container>

      <PrintCallingCard />
    </Box>
  );
}

export default CallingCardPage;