/**
 * @file pricing-section.tsx — Pricing tiers with brand descriptions
 * @feature home
 * @dependencies @mui/material, magicui components
 */
import { Box, Container, Typography, Stack, Chip, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ScrollReveal } from "@/components/magicui/scroll-reveal";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { BorderBeam } from "@/components/magicui/border-beam";

// --- Pricing Tier Data ---
interface PricingTier {
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  description: string;
  brands: string[];
  features: string[];
  popular?: boolean;
}

const PRICING_TIERS: PricingTier[] = [
  {
    name: "Bloom",
    tagline: "Everyday Glow",
    price: "₱1,500",
    priceNote: "per head, starting at",
    description:
      "Quality products that deliver a beautiful, natural finish. Perfect for party guests, casual events, or when you want to look polished without the premium price tag.",
    brands: [
      "Maybelline",
      "L'Oréal",
      "Issy & Co.",
      "BLK Cosmetics",
      "Happy Skin",
    ],
    features: [
      "Full face traditional makeup",
      "Strip lash application",
      "Basic contouring & highlighting",
      "Setting spray for 6–8 hour wear",
      "1 look / no major revisions",
    ],
  },
  {
    name: "Luxe",
    tagline: "Event Ready",
    price: "₱3,500",
    priceNote: "per head, starting at",
    description:
      "Premium brands known for flawless HD coverage and long-lasting wear. Ideal for brides' entourage, debut celebrants, proms, and any occasion you want to look camera-ready.",
    brands: ["MAC", "Charlotte Tilbury", "NARS", "Too Faced", "Urban Decay"],
    features: [
      "Full face HD makeup application",
      "Premium lash application",
      "Airbrush-finish setting for 10–12 hour wear",
      "Sculpted contouring & glass-skin highlight",
      "Lip liner & custom lip color mix",
      "One revision during session",
    ],
    popular: true,
  },
  {
    name: "Prestige",
    tagline: "Bridal Luxury",
    price: "₱8,000",
    priceNote: "bridal, starting at",
    description:
      "The finest luxury brands used by top editorial artists worldwide. Exclusively for brides, editorial shoots, and VIP clients who want nothing but perfection from prep to the last dance.",
    brands: [
      "Pat McGrath Labs",
      "Tom Ford",
      "Dior",
      "Armani Beauty",
      "Natasha Denona",
    ],
    features: [
      "Full face luxury airbrush application",
      "3D mink or silk lash application",
      "Flawless base for 14+ hour wear",
      "Pre-session skin prep & facial massage",
      "Trial session included",
      "Unlimited revisions + touch-up kit",
      "Advanced sculpting & glass-skin highlight",
      "Brow sculpting & tinting",
      "On-call touch-up during event",
    ],
  },
];

/** Individual pricing card component. */
function PricingCard({ tier }: { tier: PricingTier }): React.JSX.Element {
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 3,
        overflow: "hidden",
        bgcolor: "background.paper",
        border: 1,
        borderColor: tier.popular ? "primary.main" : "divider",
        p: { xs: 3, sm: 3.5, md: 4 },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: "primary.light",
          transform: "translateY(-4px)",
          boxShadow: "0 12px 40px rgba(183, 110, 121, 0.15)",
        },
      }}
    >
      {/* BorderBeam on popular tier */}
      {tier.popular && (
        <BorderBeam
          size={150}
          duration={10}
          colorFrom="#B76E79"
          colorTo="#D4A0A7"
        />
      )}

      {/* --- Header --- */}
      <Box sx={{ mb: 3 }}>
        {tier.popular && (
          <Chip
            label="Most Popular"
            size="small"
            color="primary"
            sx={{ mb: 1.5, fontWeight: 600, fontSize: "0.7rem" }}
          />
        )}
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
          {tier.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "primary.main", fontStyle: "italic" }}
        >
          {tier.tagline}
        </Typography>
      </Box>

      {/* --- Price --- */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {tier.priceNote}
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: "text.primary",
            fontSize: { xs: "2rem", md: "2.5rem" },
          }}
        >
          {tier.price}
        </Typography>
      </Box>

      {/* --- Description --- */}
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", mb: 3, lineHeight: 1.7 }}
      >
        {tier.description}
      </Typography>

      {/* --- Brands Used --- */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="overline"
          sx={{ color: "primary.main", letterSpacing: 2, fontSize: "0.65rem" }}
        >
          Brands We Use
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={0.5} sx={{ mt: 1 }}>
          {tier.brands.map((brand) => (
            <Chip
              key={brand}
              label={brand}
              size="small"
              variant="outlined"
              sx={{
                fontSize: "0.7rem",
                height: 24,
                borderColor: "divider",
                color: "text.secondary",
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* --- Features --- */}
      <Stack spacing={1.5} sx={{ mb: 4, flex: 1 }}>
        {tier.features.map((feature) => (
          <Box
            key={feature}
            sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}
          >
            <CheckCircleIcon
              sx={{
                fontSize: 16,
                color: "primary.main",
                mt: 0.3,
                flexShrink: 0,
              }}
            />
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", fontSize: "0.85rem" }}
            >
              {feature}
            </Typography>
          </Box>
        ))}
      </Stack>

      {/* --- CTA --- */}
      <Button
        variant={tier.popular ? "contained" : "outlined"}
        color="primary"
        fullWidth
        href={`#contact-${tier.name.toLowerCase()}`}
        sx={{ mt: "auto" }}
      >
        Book {tier.name}
      </Button>
    </Box>
  );
}

/** Pricing section with three tiers showing brands and features. */
function PricingSection(): React.JSX.Element {
  return (
    <Box
      component="section"
      id="pricing"
      sx={{
        py: { xs: 6, sm: 8, md: 16 },
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "linear-gradient(180deg, transparent 0%, rgba(183, 110, 121, 0.03) 50%, transparent 100%)"
            : "linear-gradient(180deg, transparent 0%, rgba(183, 110, 121, 0.04) 50%, transparent 100%)",
      }}
    >
      <Container maxWidth="lg">
        {/* --- Section Header --- */}
        <Box sx={{ textAlign: "center", mb: { xs: 4, sm: 5, md: 8 } }}>
          <ScrollReveal direction="up">
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                letterSpacing: 3,
                mb: 2,
                display: "block",
              }}
            >
              Investment
            </Typography>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <BoxReveal boxColor="#B76E79" duration={0.6}>
              <Typography
                variant="h2"
                sx={{ fontSize: { xs: "1.75rem", md: "3rem" } }}
              >
                Choose Your Glam
              </Typography>
            </BoxReveal>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", mt: 2, maxWidth: 550, mx: "auto" }}
            >
              Every tier delivers a flawless finish — the difference is in the
              luxury of the products and the depth of the experience.
            </Typography>
          </ScrollReveal>
        </Box>

        {/* --- Pricing Cards --- */}
        <Grid
          container
          spacing={{ xs: 2, sm: 2.5, md: 3 }}
          alignItems="stretch"
        >
          {PRICING_TIERS.map((tier, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={tier.name}>
              <ScrollReveal direction="up" delay={index * 0.1} scale={0.95}>
                <PricingCard tier={tier} />
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>

        {/* --- Note --- */}
        <ScrollReveal direction="up" delay={0.4}>
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              color: "text.secondary",
              mt: { xs: 3, md: 5 },
              fontStyle: "italic",
              fontSize: "0.8rem",
            }}
          >
            Prices may vary based on location, group size, and additional
            services. Contact me for a custom quote.
          </Typography>
        </ScrollReveal>
      </Container>
    </Box>
  );
}

export default PricingSection;
