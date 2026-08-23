/**
 * @file certificate-card.tsx — Clickable certificate thumbnail with caption
 * @feature home
 * @dependencies @mui/material, ProtectedImage
 */
import { Box, Typography } from "@mui/material";
import ProtectedImage from "@/shared/components/protected-image";

export interface CertificateItem {
  src: string;
  course: string;
  hours: string;
  date: string;
  alt: string;
}

interface CertificateCardProps {
  cert: CertificateItem;
  onOpen: () => void;
}

/** Renders one certificate preview that opens the full scan. */
function CertificateCard({
  cert,
  onOpen,
}: CertificateCardProps): React.JSX.Element {
  return (
    <Box
      component="button"
      type="button"
      onClick={onOpen}
      aria-label={`View ${cert.course} certificate`}
      sx={{
        display: "block",
        width: "100%",
        p: 0,
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: "background.paper",
        cursor: "pointer",
        textAlign: "left",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
        "@media (hover: hover)": {
          "&:hover": {
            borderColor: "primary.main",
            transform: "translateY(-4px)",
            boxShadow: "0 12px 28px rgba(183, 110, 121, 0.16)",
          },
        },
      }}
    >
      <Box
        sx={{
          aspectRatio: "4 / 3",
          bgcolor: "action.hover",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <ProtectedImage
          src={cert.src}
          alt=""
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </Box>
      <Box sx={{ p: 1.75 }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            color: "text.primary",
            lineHeight: 1.3,
          }}
        >
          {cert.course}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", display: "block", mt: 0.5 }}
        >
          Nix Institute of Beauty · {cert.hours}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {cert.date}
        </Typography>
      </Box>
    </Box>
  );
}

export default CertificateCard;
