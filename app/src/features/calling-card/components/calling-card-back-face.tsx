/**
 * @file calling-card-back-face.tsx — Back face artwork for print and preview
 * @feature calling-card
 */
import { BUSINESS_PROFILE } from "@/shared/business-profile";
import BrandedQr from "./branded-qr";

/** 2 × 4 on US Letter — leaves room for printer top/bottom margins */
const SHEET_COPY_COUNT = 8;

/** Back of the calling card (contact, QRs, locations). */
function CallingCardBackFace(): React.JSX.Element {
  const profile = BUSINESS_PROFILE;

  return (
    <div
      className="calling-card-print__face calling-card-print__face--back"
      aria-label="Calling card back"
    >
      <div className="calling-card-print__back-bands">
        <div className="calling-card-print__back-band calling-card-print__back-band--contact">
          <div className="calling-card-print__contact-block calling-card-print__contact-block--duo">
            <div className="calling-card-print__contact-row">
              <span className="calling-card-print__contact-label">Phone</span>
              <span className="calling-card-print__contact-value">
                {profile.phoneDisplay}
              </span>
            </div>
            <div className="calling-card-print__contact-row">
              <span className="calling-card-print__contact-label">Email</span>
              <span className="calling-card-print__contact-value calling-card-print__contact-value--email">
                {profile.email}
              </span>
            </div>
          </div>
        </div>

        <div className="calling-card-print__back-divider" aria-hidden="true" />

        <div className="calling-card-print__back-band calling-card-print__back-band--qr">
          <div className="calling-card-print__qr-row calling-card-print__qr-row--trio">
            <div className="calling-card-print__qr-panel calling-card-print__qr-panel--trio">
              <span className="calling-card-print__qr-label">Portfolio</span>
              <div className="calling-card-print__qr-frame calling-card-print__qr-frame--soft">
                <BrandedQr
                  value={profile.websiteQrUrl}
                  ariaLabel="QR code linking to portfolio website"
                  size="card-compact"
                />
              </div>
            </div>
            <div className="calling-card-print__qr-panel calling-card-print__qr-panel--trio">
              <span className="calling-card-print__qr-label">Instagram</span>
              <div className="calling-card-print__qr-frame calling-card-print__qr-frame--soft">
                <BrandedQr
                  value={profile.instagramQrUrl}
                  ariaLabel="QR code linking to Instagram"
                  size="card-compact"
                />
              </div>
            </div>
            <div className="calling-card-print__qr-panel calling-card-print__qr-panel--trio">
              <span className="calling-card-print__qr-label">Facebook</span>
              <div className="calling-card-print__qr-frame calling-card-print__qr-frame--soft">
                <BrandedQr
                  value={profile.facebookQrUrl}
                  ariaLabel="QR code linking to Facebook"
                  size="card-compact"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="calling-card-print__location">{profile.location}</p>
    </div>
  );
}

export default CallingCardBackFace;
export { SHEET_COPY_COUNT };