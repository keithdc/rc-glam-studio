/**
 * @file branded-qr.tsx — Rose-framed SVG QR codes for print and screen
 * @feature calling-card
 * @dependencies react-qr-code
 */
import QRCode from "react-qr-code";

type BrandedQrSize = "card" | "card-compact" | "card-dual" | "standalone";

interface BrandedQrProps {
  value: string;
  ariaLabel: string;
  size?: BrandedQrSize;
}

const SIZE_CLASS: Record<BrandedQrSize, string> = {
  card: "calling-card-print__qr-svg",
  "card-compact": "calling-card-print__qr-svg calling-card-print__qr-svg--compact",
  "card-dual":
    "calling-card-print__qr-svg calling-card-print__qr-svg--dual",
  standalone: "calling-card-print__qr-svg calling-card-print__qr-svg--standalone",
};

/** Renders a high-contrast QR tuned for print and mobile scanning. */
function BrandedQr({
  value,
  ariaLabel,
  size = "card",
}: BrandedQrProps): React.JSX.Element {
  return (
    <QRCode
      value={value}
      size={256}
      level="M"
      fgColor="#1A1A2E"
      bgColor="#FFFFFF"
      className={SIZE_CLASS[size]}
      aria-label={ariaLabel}
    />
  );
}

export default BrandedQr;
export type { BrandedQrSize };