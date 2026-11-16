/**
 * @file card-artboard.tsx — Bleed preview wrapper (guides stay off the card art)
 * @feature calling-card
 */

interface CardArtboardProps {
  children: React.ReactNode;
}

/** Checkerboard bleed around the trim area; card art stays clean inside. */
function CardArtboard({ children }: CardArtboardProps): React.JSX.Element {
  return <div className="calling-card-print__artboard">{children}</div>;
}

export default CardArtboard;