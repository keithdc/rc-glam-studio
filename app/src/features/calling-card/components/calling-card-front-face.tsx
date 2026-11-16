/**
 * @file calling-card-front-face.tsx — Front face artwork for print and preview
 * @feature calling-card
 */
import { BUSINESS_PROFILE } from "@/shared/business-profile";
import CardCornerFrame from "./card-corner-frame";

/** Front of the calling card (crest, name, services). */
function CallingCardFrontFace(): React.JSX.Element {
  const profile = BUSINESS_PROFILE;

  return (
    <div
      className="calling-card-print__face calling-card-print__face--front"
      aria-label="Calling card front"
    >
      <CardCornerFrame />
      <img
        className="calling-card-print__logo"
        src="/logo-d-mark.png"
        alt=""
        aria-hidden="true"
      />
      <h1 className="calling-card-print__name">{profile.brandName}</h1>
      <div className="calling-card-print__rule" aria-hidden="true" />
      <p className="calling-card-print__tagline">{profile.callingCardServices}</p>
      <p className="calling-card-print__tagline calling-card-print__tagline--sub">
        {profile.tagline}
      </p>
    </div>
  );
}

export default CallingCardFrontFace;