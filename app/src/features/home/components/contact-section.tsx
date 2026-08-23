/**
 * @file contact-section.tsx — Contact form and information with MagicUI animations
 * @feature home
 * @dependencies @mui/material, magicui components
 */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Snackbar,
  Alert,
  IconButton,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import SendIcon from "@mui/icons-material/Send";
import { ScrollReveal } from "@/components/magicui/scroll-reveal";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { BorderBeam } from "@/components/magicui/border-beam";
import {
  evaluateContactSpam,
  MAX_MESSAGE_LENGTH,
  MAX_NAME_LENGTH,
  readSubmitTimestamps,
  recordSubmit,
} from "../lib/contact-spam-guard";

interface ContactInfoItem {
  icon: typeof EmailIcon;
  label: string;
  value: string;
  href?: string;
}

const CONTACT_INFO: ContactInfoItem[] = [
  {
    icon: EmailIcon,
    label: "Email",
    value: "rhodacordova.mua@gmail.com",
    href: "mailto:rhodacordova.mua@gmail.com",
  },
  {
    icon: PhoneIcon,
    label: "Phone",
    value: "+63 927 402 8885",
    href: "tel:+639274028885",
  },
  {
    icon: LocationOnIcon,
    label: "Location",
    value: "Metro Manila / Cavite / Laguna",
  },
];

/** Replace these URLs when live Instagram / Facebook pages are ready. */
const SOCIAL_LINKS = {
  instagram: "https://instagram.com/YOUR_HANDLE",
  facebook: "https://facebook.com/YOUR_PAGE",
};

/** Contact section with form, MagicUI BorderBeam, and studio information. */
function ContactSection(): React.JSX.Element {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [formOpenedAt] = useState(() => Date.now());
  const [hasInteracted, setHasInteracted] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<
    "success" | "warning" | "error"
  >("success");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-select service tier when clicking "Book Bloom/Luxe/Prestige"
  useEffect(() => {
    const hash = location.hash.replace("#contact-", "");
    if (["bloom", "luxe", "prestige"].includes(hash)) {
      const tierMap: Record<string, string> = {
        bloom: "Bloom — Everyday Glow (₱1,500/head)",
        luxe: "Luxe — Event Ready (₱3,500/head)",
        prestige: "Prestige — Bridal Luxury (₱8,000)",
      };
      setFormData((prev) => ({ ...prev, service: tierMap[hash] ?? "" }));
    }
  }, [location.hash]);

  const showSuccess = (): void => {
    setSnackMessage("Message sent! I'll get back to you within 24 hours. 💄");
    setSnackSeverity("success");
    setSnackOpen(true);
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    setHoneypot("");
  };

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      setHasInteracted(true);
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    const decision = evaluateContactSpam({
      honeypot,
      name: formData.name,
      message: formData.message,
      formOpenedAt,
      hasInteracted,
      now: Date.now(),
      submitTimestamps: readSubmitTimestamps(),
    });

    if (!decision.allow) {
      if (decision.silent) {
        showSuccess();
        return;
      }
      setSnackMessage(decision.message);
      setSnackSeverity("warning");
      setSnackOpen(true);
      return;
    }

    setIsSubmitting(true);

    void sendInquiry()
      .then(() => {
        recordSubmit(Date.now());
        showSuccess();
      })
      .catch(() => {
        setSnackMessage(
          "Couldn't send right now. Please email rhodacordova.mua@gmail.com.",
        );
        setSnackSeverity("error");
        setSnackOpen(true);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  /** Posts the inquiry to FormSubmit, which forwards it to Gmail. */
  async function sendInquiry(): Promise<void> {
    const phone =
      formData.phone === "" ? "Not provided" : formData.phone;
    const service =
      formData.service === "" ? "Not specified" : formData.service;
    const details = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Phone: ${phone}`,
      `Package: ${service}`,
      "",
      "Message:",
      formData.message,
    ].join("\n");

    const body = new FormData();
    body.append("Name", formData.name);
    body.append("Email", formData.email);
    body.append("Phone", phone);
    body.append("Package", service);
    body.append("Message", formData.message);
    body.append("Details", details);
    body.append("_subject", `New inquiry from ${formData.name} — Rhoda Cordova MUA`);
    body.append("_template", "table");
    body.append("_captcha", "false");
    body.append("_honey", honeypot);
    body.append("_replyto", formData.email);

    const response = await fetch(
      "https://formsubmit.co/ajax/rhodacordova.mua@gmail.com",
      {
        method: "POST",
        headers: { Accept: "application/json" },
        body,
      },
    );

    if (!response.ok) {
      throw new Error("FormSubmit request failed");
    }

    const payload: unknown = await response.json();
    if (
      typeof payload === "object" &&
      payload !== null &&
      "success" in payload &&
      payload.success === false
    ) {
      throw new Error("FormSubmit rejected the message");
    }
  }

  return (
    <Box
      component="section"
      id="contact"
      sx={{
        py: { xs: 6, sm: 8, md: 16 },
        position: "relative",
      }}
    >
      {/* --- Background accent --- */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(183, 110, 121, 0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
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
              Get In Touch
            </Typography>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <BoxReveal boxColor="#B76E79" duration={0.6}>
              <Typography
                variant="h2"
                sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
              >
                Let&apos;s Create Your Look
              </Typography>
            </BoxReveal>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", mt: 2, maxWidth: 500, mx: "auto" }}
            >
              Ready to glow? Send me a message and let&apos;s discuss your dream
              look.
            </Typography>
          </ScrollReveal>
        </Box>

        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* --- Contact Form with BorderBeam --- */}
          <Grid size={{ xs: 12, md: 7 }}>
            <ScrollReveal direction="left" delay={0.2}>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  position: "relative",
                  p: { xs: 2.5, sm: 3, md: 4 },
                  borderRadius: 3,
                  bgcolor: "background.paper",
                  backdropFilter: "blur(10px)",
                  border: 1,
                  borderColor: "divider",
                  overflow: "hidden",
                }}
              >
                <BorderBeam
                  size={200}
                  duration={12}
                  colorFrom="#B76E79"
                  colorTo="#D4A0A7"
                />
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      value={formData.name}
                      onChange={handleChange("name")}
                      required
                      slotProps={{ htmlInput: { maxLength: MAX_NAME_LENGTH } }}
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "rgba(183, 110, 121, 0.3)",
                          },
                          "&:hover fieldset": { borderColor: "primary.main" },
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={handleChange("email")}
                      required
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "rgba(183, 110, 121, 0.3)",
                          },
                          "&:hover fieldset": { borderColor: "primary.main" },
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      value={formData.phone}
                      onChange={handleChange("phone")}
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "rgba(183, 110, 121, 0.3)",
                          },
                          "&:hover fieldset": { borderColor: "primary.main" },
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      select
                      label="Service Package"
                      value={formData.service}
                      onChange={handleChange("service")}
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "rgba(183, 110, 121, 0.3)",
                          },
                          "&:hover fieldset": { borderColor: "primary.main" },
                        },
                      }}
                    >
                      <MenuItem value="">
                        <em>Select a package (optional)</em>
                      </MenuItem>
                      <MenuItem value="Bloom — Everyday Glow (₱1,500/head)">
                        Bloom — Everyday Glow (₱1,500/head)
                      </MenuItem>
                      <MenuItem value="Luxe — Event Ready (₱3,500/head)">
                        Luxe — Event Ready (₱3,500/head)
                      </MenuItem>
                      <MenuItem value="Prestige — Bridal Luxury (₱8,000)">
                        Prestige — Bridal Luxury (₱8,000)
                      </MenuItem>
                    </TextField>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Tell me about your event & desired look"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange("message")}
                      required
                      helperText="Include the date, location, and look you have in mind."
                      slotProps={{ htmlInput: { maxLength: MAX_MESSAGE_LENGTH } }}
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "rgba(183, 110, 121, 0.3)",
                          },
                          "&:hover fieldset": { borderColor: "primary.main" },
                        },
                      }}
                    />
                  </Grid>
                  {/* --- Honeypot: bots fill this; people never see it --- */}
                  <Box
                    aria-hidden="true"
                    sx={{
                      position: "absolute",
                      width: 1,
                      height: 1,
                      p: 0,
                      m: -1,
                      overflow: "hidden",
                      clipPath: "inset(50%)",
                      whiteSpace: "nowrap",
                      border: 0,
                    }}
                  >
                    <label>
                      Company website
                      <input
                        type="text"
                        name="_honey"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => {
                          setHoneypot(e.target.value);
                        }}
                      />
                    </label>
                  </Box>
                  <Grid size={{ xs: 12 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={isSubmitting}
                      endIcon={<SendIcon />}
                      sx={{ mt: 1 }}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </ScrollReveal>
          </Grid>

          {/* --- Contact Info Sidebar --- */}
          <Grid size={{ xs: 12, md: 5 }}>
            <ScrollReveal direction="right" delay={0.3}>
              <Stack spacing={4}>
                {CONTACT_INFO.map((info) => (
                  <Box
                    key={info.label}
                    sx={{ display: "flex", alignItems: "center", gap: 2 }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        backgroundColor: "rgba(183, 110, 121, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <info.icon sx={{ color: "primary.main" }} />
                    </Box>
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {info.label}
                      </Typography>
                      <Typography
                        variant="body1"
                        component={info.href ? "a" : "p"}
                        href={info.href}
                        sx={{
                          fontWeight: 500,
                          color: "text.primary",
                          textDecoration: "none",
                          ...(info.href
                            ? {
                                "&:hover": { color: "primary.main" },
                              }
                            : {}),
                        }}
                      >
                        {info.value}
                      </Typography>
                    </Box>
                  </Box>
                ))}

                {/* --- Social Links --- */}
                <Box sx={{ pt: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mb: 1.5 }}
                  >
                    Follow me on social media
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      href={SOCIAL_LINKS.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      sx={{
                        border: "1px solid rgba(183, 110, 121, 0.3)",
                        color: "primary.main",
                        "&:hover": {
                          backgroundColor: "rgba(183, 110, 121, 0.1)",
                        },
                      }}
                    >
                      <InstagramIcon />
                    </IconButton>
                    <IconButton
                      href={SOCIAL_LINKS.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      sx={{
                        border: "1px solid rgba(183, 110, 121, 0.3)",
                        color: "primary.main",
                        "&:hover": {
                          backgroundColor: "rgba(183, 110, 121, 0.1)",
                        },
                      }}
                    >
                      <FacebookIcon />
                    </IconButton>
                  </Stack>
                </Box>

                {/* --- Business Hours --- */}
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    bgcolor: "action.hover",
                    border: 1,
                    borderColor: "divider",
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 1.5, fontSize: "1rem" }}>
                    Studio Hours
                  </Typography>
                  <Stack spacing={0.5}>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Mon – Fri: 9:00 AM – 6:00 PM
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Sat – Sun: By appointment
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "primary.light", mt: 1 }}
                    >
                      Home service available ✨
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </ScrollReveal>
          </Grid>
        </Grid>
      </Container>

      {/* --- Feedback Snackbar --- */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={5000}
        onClose={() => {
          setSnackOpen(false);
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => {
            setSnackOpen(false);
          }}
          severity={snackSeverity}
          variant="filled"
          sx={{
            backgroundColor:
              snackSeverity === "success" ? "primary.main" : undefined,
          }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ContactSection;
