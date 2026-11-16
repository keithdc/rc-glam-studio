/**
 * @file website-qr-standalone.tsx — Large portfolio QR for screen, social, and export
 * @feature calling-card
 * @dependencies business-profile, branded-qr
 */
import { BUSINESS_PROFILE } from "@/shared/business-profile";
import BrandedQr from "./branded-qr";

/** Full-size web app QR with branded frame (screenshot or right-click to save). */
function WebsiteQrStandalone(): React.JSX.Element {
  const profile = BUSINESS_PROFILE;

  return (
    <div
      className="calling-card-print__standalone-qr"
      aria-label="Website QR for digital use"
    >
      <div className="calling-card-print__standalone-frame">
        <BrandedQr
          value={profile.websiteQrUrl}
          ariaLabel="QR code linking to portfolio website"
          size="standalone"
        />
      </div>
      <p className="calling-card-print__standalone-url">{profile.websiteDisplay}</p>
    </div>
  );
}

export default WebsiteQrStandalone;