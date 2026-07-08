/**
 * @file testimonials-section.tsx — Client testimonials with MagicUI Marquee + scroll reveal
 * @feature home
 * @dependencies @mui/material, magicui components
 */
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Rating,
} from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { ScrollReveal } from "@/components/magicui/scroll-reveal";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";

// --- Testimonials Data ---
interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
}

const TESTIMONIALS_ROW_1: Testimonial[] = [
  {
    id: 1,
    name: "Maria Santos",
    role: "Bride",
    text: "RC made me feel like the most beautiful version of myself on my wedding day. The makeup lasted through tears of joy and hours of dancing!",
    rating: 5,
  },
  {
    id: 2,
    name: "Angela Cruz",
    role: "Debut Celebrant",
    text: "Absolutely stunning work! My 18th birthday look was beyond my wildest dreams. Everyone kept asking who did my makeup.",
    rating: 5,
  },
  {
    id: 3,
    name: "Jen Reyes",
    role: "Corporate Event",
    text: "Professional, punctual, and incredibly talented. RC understood exactly what I needed for my corporate gala. Will definitely rebook!",
    rating: 5,
  },
];

const TESTIMONIALS_ROW_2: Testimonial[] = [
  {
    id: 4,
    name: "Bea Villanueva",
    role: "Matron of Honor",
    text: "Our entire bridal party looked cohesive yet individually beautiful. RC's attention to detail is unmatched.",
    rating: 5,
  },
  {
    id: 5,
    name: "Carla Mendoza",
    role: "Editorial Model",
    text: "Working with RC on my portfolio shoot was a game-changer. She knows how to create looks that pop on camera.",
    rating: 5,
  },
  {
    id: 6,
    name: "Denise Lim",
    role: "Bride",
    text: "From the trial to the actual day, RC was so patient and made sure everything was perfect. I couldn't have asked for more.",
    rating: 5,
  },
];

/** Individual testimonial card for use inside MagicUI Marquee. */
function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}): React.JSX.Element {
  return (
    <Card
      className={cn("min-w-[320px] max-w-[380px] flex-shrink-0")}
      sx={{
        backgroundColor: "background.paper",
        backdropFilter: "blur(10px)",
        border: 1,
        borderColor: "divider",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <FormatQuoteIcon
          sx={{ color: "primary.main", opacity: 0.5, fontSize: 32, mb: 1 }}
        />
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", mb: 2, minHeight: 80 }}
        >
          {testimonial.text}
        </Typography>
        <Rating
          value={testimonial.rating}
          readOnly
          size="small"
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar
            sx={{
              bgcolor: "primary.dark",
              width: 36,
              height: 36,
              fontSize: "0.85rem",
            }}
          >
            {testimonial.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {testimonial.name}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {testimonial.role}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

/** Testimonials section with scroll-reveal header and MagicUI Marquee. */
function TestimonialsSection(): React.JSX.Element {
  return (
    <Box
      component="section"
      id="testimonials"
      sx={{
        py: { xs: 10, md: 16 },
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Box sx={{ textAlign: "center" }}>
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
              Client Love
            </Typography>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <BoxReveal boxColor="#B76E79" duration={0.6}>
              <Typography
                variant="h2"
                sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
              >
                What They Say
              </Typography>
            </BoxReveal>
          </ScrollReveal>
        </Box>
      </Container>

      {/* --- MagicUI Marquee Row 1 --- */}
      <ScrollReveal direction="left" offset={80}>
        <div className="mb-4">
          <Marquee pauseOnHover className="[--duration:35s]">
            {TESTIMONIALS_ROW_1.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </Marquee>
        </div>
      </ScrollReveal>

      {/* --- MagicUI Marquee Row 2 (Reverse) --- */}
      <ScrollReveal direction="right" offset={80}>
        <Marquee pauseOnHover reverse className="[--duration:40s]">
          {TESTIMONIALS_ROW_2.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </Marquee>
      </ScrollReveal>
    </Box>
  );
}

export default TestimonialsSection;
