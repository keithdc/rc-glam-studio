/**
 * @file navbar.tsx — Sticky navigation bar with smooth scroll and theme toggle
 * @feature home
 * @dependencies framer-motion, @mui/material, use-color-mode
 */
import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { motion } from "framer-motion";
import { useColorMode } from "@/shared/hooks/use-color-mode";
import Logo from "@/shared/components/logo";

// --- Navigation Links ---
const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

/** Sticky navbar with blur backdrop, smooth scroll, and light/dark toggle. */
function Navbar(): React.JSX.Element {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 50 });
  const theme = useTheme();
  const { mode, toggleColorMode } = useColorMode();

  const isDark = mode === "dark";

  useEffect(() => {
    setScrolled(trigger);
  }, [trigger]);

  const handleNavClick = (href: string): void => {
    setMobileOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1100 }}
      >
        <AppBar
          position="static"
          elevation={0}
          sx={{
            backgroundColor: scrolled
              ? isDark
                ? "rgba(13, 13, 13, 0.85)"
                : "rgba(255, 250, 248, 0.85)"
              : "transparent",
            backdropFilter: scrolled ? "blur(20px)" : "none",
            borderBottom: scrolled
              ? `1px solid ${theme.palette.divider}`
              : "none",
            transition: "all 0.3s ease",
          }}
        >
          <Toolbar
            sx={{
              justifyContent: "space-between",
              maxWidth: "lg",
              width: "100%",
              mx: "auto",
            }}
          >
            {/* --- Logo --- */}
            <Logo
              height={40}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />

            {/* --- Desktop Nav --- */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 1,
                alignItems: "center",
              }}
            >
              {NAV_LINKS.map((link) => (
                <Button
                  key={link.label}
                  onClick={() => {
                    handleNavClick(link.href);
                  }}
                  sx={{
                    color: "text.primary",
                    fontSize: "0.85rem",
                    fontWeight: 400,
                    letterSpacing: "0.03em",
                    "&:hover": {
                      color: "primary.main",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {link.label}
                </Button>
              ))}

              {/* --- Theme Toggle --- */}
              <IconButton
                onClick={toggleColorMode}
                aria-label={
                  isDark ? "Switch to light mode" : "Switch to dark mode"
                }
                sx={{
                  color: "text.primary",
                  ml: 0.5,
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    color: "primary.main",
                    transform: "rotate(30deg)",
                  },
                }}
              >
                {isDark ? (
                  <LightModeIcon fontSize="small" />
                ) : (
                  <DarkModeIcon fontSize="small" />
                )}
              </IconButton>

              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => {
                  handleNavClick("#contact");
                }}
                sx={{ ml: 1, px: 3 }}
              >
                Book Now
              </Button>
            </Box>

            {/* --- Mobile: Toggle + Menu --- */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <IconButton
                onClick={toggleColorMode}
                aria-label={
                  isDark ? "Switch to light mode" : "Switch to dark mode"
                }
                sx={{ color: "text.primary" }}
              >
                {isDark ? (
                  <LightModeIcon fontSize="small" />
                ) : (
                  <DarkModeIcon fontSize="small" />
                )}
              </IconButton>
              <IconButton
                onClick={() => {
                  setMobileOpen(true);
                }}
                sx={{ color: "text.primary" }}
                aria-label="Open navigation menu"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </motion.div>

      {/* --- Mobile Drawer --- */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => {
          setMobileOpen(false);
        }}
        PaperProps={{
          sx: {
            width: 280,
            backgroundColor: "background.paper",
            backdropFilter: "blur(20px)",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <IconButton
            onClick={() => {
              setMobileOpen(false);
            }}
            aria-label="Close navigation menu"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {NAV_LINKS.map((link) => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton
                onClick={() => {
                  handleNavClick(link.href);
                }}
              >
                <ListItemText
                  primary={link.label}
                  slotProps={{ primary: { sx: { fontWeight: 500 } } }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;
