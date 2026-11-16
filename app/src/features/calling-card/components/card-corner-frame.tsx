/**
 * @file card-corner-frame.tsx — Rose L-brackets on all four card corners
 * @feature calling-card
 */

/** Luxury corner brackets framing the trim area (prints with the card). */
function CardCornerFrame(): React.JSX.Element {
  return (
    <>
      <span
        className="calling-card-print__corner-accent calling-card-print__corner-accent--tl"
        aria-hidden="true"
      />
      <span
        className="calling-card-print__corner-accent calling-card-print__corner-accent--tr"
        aria-hidden="true"
      />
      <span
        className="calling-card-print__corner-accent calling-card-print__corner-accent--bl"
        aria-hidden="true"
      />
      <span
        className="calling-card-print__corner-accent calling-card-print__corner-accent--br"
        aria-hidden="true"
      />
    </>
  );
}

export default CardCornerFrame;