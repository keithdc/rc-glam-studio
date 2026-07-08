/**
 * @file footer.tsx — Site footer with branding and copyright
 * @feature home
 * @dependencies @mui/material
 */
import { Box, Container, Typography, Divider } from "@mui/material";
import Logo from "@/shared/components/logo";

/** Minimal footer with brand name and copyright. */
function Footer(): React.JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer" sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Divider sx={{ borderColor: "divider", mb: 4 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Logo height={28} />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              RC Glam Studio
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", fontSize: "0.8rem" }}
          >
            © {String(currentYear)} RC Glam Studio. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
