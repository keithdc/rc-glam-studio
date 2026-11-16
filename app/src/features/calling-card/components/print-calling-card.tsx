/**
 * @file print-calling-card.tsx — Screen preview + print layouts (single card or 10-up sheet)
 * @feature calling-card
 */
import CardArtboard from "./card-artboard";
import CallingCardBackFace, { SHEET_COPY_COUNT } from "./calling-card-back-face";
import CallingCardFrontFace from "./calling-card-front-face";
import "../calling-card-print.css";

/** Screen preview and hidden print layouts for single card or Letter sheet. */
function PrintCallingCard(): React.JSX.Element {
  const sheetIndices = Array.from({ length: SHEET_COPY_COUNT }, (_, index) => index);

  return (
    <div className="calling-card-print" aria-label="Calling card print layout">
      {/* --- On-screen preview (with bleed) --- */}
      <div className="calling-card-print__workspace calling-card-print__workspace--preview">
        <p className="calling-card-print__sheet-label calling-card-print__screen-only">
          Front — page 1 when printing
        </p>
        <CardArtboard>
          <CallingCardFrontFace />
        </CardArtboard>

        <p className="calling-card-print__sheet-label calling-card-print__screen-only">
          Back — page 2 when printing (flip on short edge for duplex)
        </p>
        <CardArtboard>
          <CallingCardBackFace />
        </CardArtboard>
      </div>

      {/* --- Print: one card per page (exact 3.5″ × 2″) --- */}
      <div className="calling-card-print__print-run calling-card-print__print-run--single">
        <div className="calling-card-print__trim-page">
          <CallingCardFrontFace />
        </div>
        <div className="calling-card-print__trim-page">
          <CallingCardBackFace />
        </div>
      </div>

      {/* --- Print: 8 cards per US Letter page (2 × 4) --- */}
      <div className="calling-card-print__print-run calling-card-print__print-run--sheet">
        <div className="calling-card-print__sheet-page">
          {sheetIndices.map((index) => (
            <div
              key={`front-${String(index)}`}
              className="calling-card-print__sheet-cell"
            >
              <CallingCardFrontFace />
            </div>
          ))}
        </div>
        <div className="calling-card-print__sheet-page">
          {sheetIndices.map((index) => (
            <div
              key={`back-${String(index)}`}
              className="calling-card-print__sheet-cell"
            >
              <CallingCardBackFace />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PrintCallingCard;