/**
 * @file contact-section.tsx — Contact form and information with MagicUI animations
 * @feature home
 * @dependencies @mui/material, magicui components
 */
import { useState } from "react";
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

// --- Contact Info Data ---
const CONTACT_INFO = [
  { icon: EmailIcon, label: "Email", value: "hello@rcglamstudio.com" },
  { icon: PhoneIcon, label: "Phone", value: "+63 917 123 4567" },
  {
    icon: LocationOnIcon,
    label: "Location",
    value: "Metro Manila, Philippines",
  },
];

/** Contact section with form, MagicUI BorderBeam, and studio information. */
function ContactSection(): React.JSX.Element {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<"success" | "warning">(
    "success",
  );
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const COOLDOWN_MS = 30000; // 30 seconds between submissions

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    // --- Spam Guard: Honeypot check (bots fill hidden fields) ---
    if (honeypot !== "") {
      // Silently reject — don't reveal detection to the bot
      setFormData({ name: "", email: "", phone: "", message: "" });
      setSnackMessage("Message sent! I'll get back to you within 24 hours. 💄");
      setSnackSeverity("success");
      setSnackOpen(true);
      return;
    }

    // --- Spam Guard: Cooldown check ---
    const now = Date.now();
    if (now - lastSubmitTime < COOLDOWN_MS) {
      const secondsLeft = Math.ceil(
        (COOLDOWN_MS - (now - lastSubmitTime)) / 1000,
      );
      setSnackMessage(
        `Please wait ${String(secondsLeft)} seconds before sending another message.`,
      );
      setSnackSeverity("warning");
      setSnackOpen(true);
      return;
    }

    // --- Valid submission ---
    setIsSubmitting(true);
    setLastSubmitTime(now);

    // Simulate sending (replace with real API call later)
    setTimeout(() => {
      setIsSubmitting(false);
      setSnackMessage("Message sent! I'll get back to you within 24 hours. 💄");
      setSnackSeverity("success");
      setSnackOpen(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 800);
  };

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
                      label="Tell me about your event & desired look"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange("message")}
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
                  {/* --- Honeypot: Hidden field to catch bots --- */}
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Website"
                      value={honeypot}
                      onChange={(e) => {
                        setHoneypot(e.target.value);
                      }}
                      autoComplete="off"
                      tabIndex={-1}
                      sx={{
                        position: "absolute",
                        left: "-9999px",
                        opacity: 0,
                        height: 0,
                        overflow: "hidden",
                      }}
                    />
                  </Grid>
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
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
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
                      href="https://instagram.com"
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
                      href="https://facebook.com"
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
