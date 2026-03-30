/**
 * Alpine Home Air — HVAC All-Products Landing Page
 * MUI-based React component — UX Improvements (A/B Test Ready)
 *
 * KEY CHANGES FROM ORIGINAL FIGMA DESIGN:
 * 1. Hero CTAs reordered: "Find My System" becomes primary action (guide-first principle)
 * 2. Trust bar added immediately below hero (reduces perceived risk early)
 * 3. "Start Here" tools section elevated and reframed — surfaced earlier with stronger guidance copy
 * 4. Decision helper prompt added to Shopping Assistance heading
 * 5. Category cards: standardized height, chip labels moved for faster scanning,
 *    "Browse" CTA styled as a visible text button (not plain text link)
 * 6. Section order changed: Trust Bar → Tools (Start Here) → Categories → Why Alpine
 *    (was: Tools → Categories → Why Alpine → Trust)
 * 7. "Still Not Sure" persistent CTA added inline within tool section (not buried at bottom)
 * 8. Mobile-first responsive layout throughout
 */

import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import TuneIcon from "@mui/icons-material/Tune";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";

// ─────────────────────────────────────────────
// Design Tokens (match existing Alpine design system)
// ─────────────────────────────────────────────
const ALPINE_BLUE = "#0d61a7";
const ALPINE_DARK_BLUE = "#1a4c9c";
const MUI_PRIMARY = "#1976d2";
const TEXT_PRIMARY = "#1a1a1a";
const TEXT_SECONDARY = "#555";
const TEXT_MUTED = "#999";
const BORDER_COLOR = "#a4a4a4";
const BORDER_LIGHT = "#e0e0e0";
const BG_PAGE = "#f5f5f5";

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

const SHOPPING_TOOLS = [
  {
    id: "system-selector",
    icon: <TuneIcon sx={{ fontSize: 36, color: TEXT_MUTED }} />,
    title: "System Selector",
    subtitle: "Answer a few questions",
    href: "#system-selector",
    recommended: true,
  },
  {
    id: "sizing-estimator",
    icon: <SquareFootOutlinedIcon sx={{ fontSize: 36, color: TEXT_MUTED }} />,
    title: "Sizing Estimator",
    subtitle: "BTU calc by room size",
    href: "#sizing-estimator",
    recommended: false,
  },
  {
    id: "quote-by-photo",
    icon: <CameraAltOutlinedIcon sx={{ fontSize: 36, color: TEXT_MUTED }} />,
    title: "Quote-by-Photo",
    subtitle: "Upload a photo of your unit",
    href: "#quote-by-photo",
    recommended: false,
  },
  {
    id: "cost-calculator",
    icon: <CalculateOutlinedIcon sx={{ fontSize: 36, color: TEXT_MUTED }} />,
    title: "Cost Calculator",
    subtitle: "Estimate annual savings",
    href: "#cost-calculator",
    recommended: false,
  },
];

const CATEGORIES = [
  {
    id: "ductless-mini-splits",
    chip: "Easy Installation",
    title: "Ductless Mini-Splits",
    description:
      "For homes without ductwork, room additions, or zoned cooling. No ducts required.",
    href: "#ductless",
    imagePlaceholder: "ductless-mini-split",
  },
  {
    id: "next-gen-ducted",
    chip: "Energy Efficient",
    title: "Next Gen Ducted Systems",
    description:
      "Whole-home heating and cooling using existing ductwork. High-efficiency options available.",
    href: "#ducted",
    imagePlaceholder: "ducted-system",
  },
  {
    id: "central-air",
    chip: "Standard Home Setup",
    title: "Central Air Systems",
    description:
      "Traditional split-system ACs for homes with existing forced-air furnaces.",
    href: "#central-air",
    imagePlaceholder: "central-air",
  },
  {
    id: "complete-hvac",
    chip: "All-in-One",
    title: "Complete HVAC Systems",
    description:
      "Matched system bundles — air handler, condenser, and coil — for optimal efficiency.",
    href: "#complete-hvac",
    imagePlaceholder: "complete-hvac",
  },
  {
    id: "ptac",
    chip: "Commercial & Hotel",
    title: "PTAC Units",
    description:
      "Packaged terminal air conditioners for hotels, offices, and multi-family buildings.",
    href: "#ptac",
    imagePlaceholder: "ptac",
  },
  {
    id: "window-wall",
    chip: "Budget Friendly",
    title: "Window & Wall Units",
    description:
      "Simple single-room cooling. Easy self-install for renters and small spaces.",
    href: "#window-wall",
    imagePlaceholder: "window-wall",
  },
];

const TRUST_ITEMS = [
  { icon: <StarIcon sx={{ fontSize: 18, color: "#f5a623" }} />, label: "4.8 Stars · 12,000+ Reviews" },
  { icon: <CheckCircleOutlineIcon sx={{ fontSize: 18, color: "#4caf50" }} />, label: "Free Expert Support" },
  { icon: <CheckCircleOutlineIcon sx={{ fontSize: 18, color: "#4caf50" }} />, label: "Trusted Since 2002" },
  { icon: <PhoneIcon sx={{ fontSize: 18, color: ALPINE_BLUE }} />, label: "1-800-865-5931" },
];

// ─────────────────────────────────────────────
// Sub-Components
// ─────────────────────────────────────────────

/**
 * HeroSection
 * UX Change: Reordered CTAs — "Find My System" is now PRIMARY (guide-first)
 * "Talk to an Expert" moved to secondary outlined position
 * Added microcopy below CTAs for reassurance
 */
function HeroSection() {
  return (
    <Box
      component="section"
      data-section="hero"
      sx={{
        position: "relative",
        bgcolor: "#1a1a2e",
        backgroundImage:
          "linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.55) 100%)",
        px: { xs: 3, sm: 4, md: 8 },
        py: { xs: 5, md: 6 },
        width: "100%",
      }}
    >
      <Container maxWidth="lg" disableGutters>
        <Stack spacing={2.5} maxWidth={{ xs: "100%", md: 680 }}>
          {/* H1 — SEO-optimized, matches original copy */}
          <Typography
            variant="h1"
            sx={{
              fontFamily: "'Open Sans', sans-serif",
              fontWeight: 700,
              fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.5rem" },
              color: "#fff",
              lineHeight: 1.2,
            }}
          >
            Find the Right AC System for Your Home
          </Typography>

          {/* Subheading */}
          <Typography
            variant="body1"
            sx={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: { xs: "1rem", md: "1.15rem" },
              color: "rgba(255,255,255,0.92)",
              lineHeight: 1.6,
            }}
          >
            Not sure what system fits your home? Use our tools to narrow it
            down, or talk to a specialist.
          </Typography>

          {/* CTAs — CHANGE: "Find My System" is now primary */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            flexWrap="wrap"
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              href="#start-here"
              sx={{
                bgcolor: MUI_PRIMARY,
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                px: 3.5,
                py: 1,
                borderRadius: "4px",
                "&:hover": { bgcolor: "#1565c0" },
              }}
            >
              Find My System
            </Button>
            <Button
              variant="outlined"
              size="large"
              href="#talk-to-expert"
              sx={{
                borderColor: "#fff",
                color: "#fff",
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                px: 3.5,
                py: 1,
                borderRadius: "4px",
                "&:hover": {
                  borderColor: "rgba(255,255,255,0.7)",
                  bgcolor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              Talk to an Expert — Free
            </Button>
          </Stack>

          {/* Reassurance microcopy */}
          <Typography
            variant="caption"
            sx={{
              color: "rgba(255,255,255,0.82)",
              fontSize: "0.85rem",
              fontFamily: "'Open Sans', sans-serif",
            }}
          >
            Avoid buying the wrong system · Free tools · Expert help when you need it
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

/**
 * TrustBar
 * UX Change: NEW — Inserted directly below hero to reduce perceived risk early.
 * Uses existing design tokens/patterns. Lightweight, no new styles.
 */
function TrustBar() {
  return (
    <Box
      component="aside"
      data-section="trust-bar"
      sx={{
        bgcolor: "#fff",
        borderBottom: `1px solid ${BORDER_LIGHT}`,
        py: 1.5,
        px: { xs: 2, sm: 4 },
      }}
    >
      <Container maxWidth="lg" disableGutters>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1.5, sm: 3 }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexWrap="wrap"
          divider={
            <Divider
              orientation="vertical"
              flexItem
              sx={{ display: { xs: "none", sm: "block" } }}
            />
          }
        >
          {TRUST_ITEMS.map((item) => (
            <Stack
              key={item.label}
              direction="row"
              spacing={0.75}
              alignItems="center"
            >
              {item.icon}
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: "0.82rem",
                  color: TEXT_SECONDARY,
                  fontWeight: 500,
                }}
              >
                {item.label}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

/**
 * ShoppingAssistanceSection
 * UX Changes:
 * - Section renamed from "Shopping Assistance" → "Start Here — Find Your System"
 * - Added contextual guidance copy to frame it as the primary entry point
 * - Added "Still not sure?" inline expert CTA so it appears before categories (not at end)
 * - "Recommended" badge on System Selector to guide new visitors
 * - Consistent tool card layout with hover states
 */
function ShoppingAssistanceSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="section"
      id="start-here"
      data-section="shopping-assistance"
      sx={{ width: "100%" }}
    >
      <Container maxWidth="lg">
        {/* Section header — CHANGE: renamed + stronger guidance framing */}
        <Stack spacing={0.5} mb={2.5}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Open Sans', sans-serif",
              fontWeight: 700,
              fontSize: { xs: "1.25rem", md: "1.5rem" },
              color: TEXT_PRIMARY,
              letterSpacing: "0.01em",
            }}
          >
            Start Here — Find Your System
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "'Open Sans', sans-serif",
              color: "#666",
              fontSize: "0.95rem",
            }}
          >
            Not sure which system you need? Start with the System Selector — it
            takes 2 minutes.
          </Typography>
        </Stack>

        {/* Tool cards panel */}
        <Paper
          variant="outlined"
          sx={{
            border: `1px solid ${BORDER_LIGHT}`,
            boxShadow: "0px 1px 6px 0px rgba(0,0,0,0.07)",
            overflow: "hidden",
            borderRadius: 0,
          }}
        >
          {/* Blue accent bar (matches original design) */}
          <Box sx={{ bgcolor: ALPINE_DARK_BLUE, height: 4 }} />

          <Grid
            container
            sx={{ borderBottom: `3px solid #ebebeb` }}
          >
            {SHOPPING_TOOLS.map((tool, idx) => (
              <Grid
                item
                xs={6}
                sm={3}
                key={tool.id}
                sx={{
                  borderRight:
                    idx < SHOPPING_TOOLS.length - 1
                      ? `1px solid #ebebeb`
                      : "none",
                  // On mobile 2-col layout — add bottom border to top row
                  borderBottom: {
                    xs: idx < 2 ? `1px solid #ebebeb` : "none",
                    sm: "none",
                  },
                }}
              >
                <Box
                  component="a"
                  href={tool.href}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 1.5,
                    pt: { xs: 2.5, sm: 3 },
                    pb: { xs: 2, sm: 2.5 },
                    px: 1,
                    textDecoration: "none",
                    cursor: "pointer",
                    transition: "background-color 0.15s ease",
                    position: "relative",
                    "&:hover": { bgcolor: "rgba(13, 97, 167, 0.04)" },
                  }}
                >
                  {/* Recommended badge — NEW: guides first-time visitors */}
                  {tool.recommended && (
                    <Chip
                      label="Start Here"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        height: 18,
                        fontSize: "0.6rem",
                        fontFamily: "'Open Sans', sans-serif",
                        bgcolor: "#e3f2fd",
                        color: ALPINE_BLUE,
                        fontWeight: 600,
                        letterSpacing: "0.02em",
                        "& .MuiChip-label": { px: 0.75 },
                      }}
                    />
                  )}

                  {/* Icon */}
                  <Box sx={{ opacity: 0.65, display: "flex" }}>
                    {tool.icon}
                  </Box>

                  {/* Label + subtitle */}
                  <Box textAlign="center">
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontFamily: "'Open Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        color: "#333",
                        lineHeight: 1.3,
                        mb: 0.25,
                      }}
                    >
                      {tool.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: "'Open Sans', sans-serif",
                        color: TEXT_MUTED,
                        fontSize: "0.73rem",
                        display: "block",
                      }}
                    >
                      {tool.subtitle}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* CHANGE: "Still Not Sure?" moved UP from bottom of page to here */}
        {/* This surfaces the expert fallback early without burying it */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
          spacing={1.5}
          mt={2}
          px={{ xs: 0.5, sm: 0 }}
        >
          <Typography
            variant="body2"
            sx={{
              fontFamily: "'Open Sans', sans-serif",
              color: TEXT_SECONDARY,
              fontSize: "0.9rem",
            }}
          >
            Still not sure where to start? Our HVAC specialists can help you
            choose — for free.
          </Typography>
          <Button
            variant="text"
            size="small"
            endIcon={<ArrowForwardIcon />}
            href="#talk-to-expert"
            sx={{
              fontFamily: "'Open Sans', sans-serif",
              color: ALPINE_BLUE,
              fontWeight: 600,
              fontSize: "0.85rem",
              textTransform: "none",
              whiteSpace: "nowrap",
              flexShrink: 0,
              p: 0,
              "&:hover": { bgcolor: "transparent", textDecoration: "underline" },
            }}
          >
            Talk to an Expert
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

/**
 * CategoryCard
 * UX Changes:
 * - Standardized card height using flexbox
 * - Chip label moved to top for faster visual scanning
 * - "Browse" CTA styled as visible text button (not plain small link)
 * - Image area kept as placeholder with consistent height
 */
function CategoryCard({ chip, title, description, href, imagePlaceholder }) {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 0,
        border: `1px solid ${BORDER_COLOR}`,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        transition: "box-shadow 0.15s ease",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        },
      }}
    >
      {/* Blue top accent bar */}
      <Box sx={{ bgcolor: ALPINE_BLUE, height: 5, flexShrink: 0 }} />

      <CardContent
        sx={{
          p: 3,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          "&:last-child": { pb: 3 },
        }}
      >
        {/* Chip badge */}
        <Box>
          <Chip
            label={chip}
            size="small"
            sx={{
              bgcolor: ALPINE_BLUE,
              color: "#fff",
              fontFamily: "'Open Sans', sans-serif",
              fontWeight: 400,
              fontSize: "0.75rem",
              height: 22,
              borderRadius: "4px",
              "& .MuiChip-label": { px: 0.75 },
            }}
          />
        </Box>

        {/* Title */}
        <Typography
          variant="subtitle1"
          component="h3"
          sx={{
            fontFamily: "'Open Sans', sans-serif",
            fontWeight: 700,
            fontSize: "0.9rem",
            color: "#333",
          }}
        >
          {title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            fontFamily: "'Open Sans', sans-serif",
            color: TEXT_SECONDARY,
            fontSize: "0.8rem",
            lineHeight: 1.5,
            flexGrow: 1,
          }}
        >
          {description}
        </Typography>

        {/* CHANGE: Browse CTA is now a proper text button — more visible & tappable */}
        <Button
          variant="text"
          size="small"
          endIcon={<ArrowForwardIcon sx={{ fontSize: 14 }} />}
          href={href}
          sx={{
            fontFamily: "'Open Sans', sans-serif",
            color: ALPINE_BLUE,
            fontWeight: 600,
            fontSize: "0.78rem",
            textTransform: "none",
            p: 0,
            justifyContent: "flex-start",
            minWidth: 0,
            "&:hover": {
              bgcolor: "transparent",
              textDecoration: "underline",
            },
          }}
        >
          Browse In Stock Systems
        </Button>

        {/* Product image placeholder — consistent height */}
        <Box
          sx={{
            mt: 1.5,
            height: 160,
            bgcolor: "#f5f7fa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `1px solid ${BORDER_LIGHT}`,
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "#bbb", fontSize: "0.72rem" }}
          >
            {/* Image slot — replace with <img src={...} /> */}
            [Product Image: {imagePlaceholder}]
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

/**
 * ShopByCategorySection
 * UX Changes:
 * - Subtitle updated to be more action-oriented
 * - 3-column desktop, 2-column tablet, 1-column mobile
 * - Consistent card height via Grid/flex
 */
function ShopByCategorySection() {
  return (
    <Box
      component="section"
      data-section="shop-by-category"
      sx={{ width: "100%" }}
    >
      <Container maxWidth="lg">
        <Stack spacing={0.5} mb={3}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Open Sans', sans-serif",
              fontWeight: 700,
              fontSize: { xs: "1.25rem", md: "1.5rem" },
              color: TEXT_PRIMARY,
              letterSpacing: "0.01em",
            }}
          >
            Shop by Category
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "'Open Sans', sans-serif",
              color: "#666",
              fontSize: "0.95rem",
            }}
          >
            Already know your system type? Jump straight to the right category.
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {CATEGORIES.map((cat) => (
            <Grid item xs={12} sm={6} md={4} key={cat.id} sx={{ display: "flex" }}>
              <CategoryCard {...cat} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

/**
 * WhyAlpineSection
 * UX Changes:
 * - Moved BEFORE category browsing (was at bottom after categories)
 * - Reduces risk and builds trust before user commits to a category
 * - Compact horizontal layout — doesn't interrupt the browse flow
 */
function WhyAlpineSection() {
  const items = [
    {
      title: "4.8 Stars on Shopper Approved",
      body: "Over 12,000 verified customer reviews since 2002.",
    },
    {
      title: "Expert Help Included",
      body: "Talk to a licensed HVAC specialist — no upsell, no pressure.",
    },
    {
      title: "Same-Day Shipping Available",
      body: "Most orders ship the same business day from our warehouse.",
    },
  ];

  return (
    <Box
      component="section"
      data-section="why-alpine"
      sx={{
        bgcolor: "#fff",
        borderTop: `1px solid ${BORDER_LIGHT}`,
        borderBottom: `1px solid ${BORDER_LIGHT}`,
        py: { xs: 4, md: 5 },
        width: "100%",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            fontFamily: "'Open Sans', sans-serif",
            fontWeight: 700,
            fontSize: { xs: "1.25rem", md: "1.5rem" },
            color: TEXT_PRIMARY,
            mb: 3,
          }}
        >
          Why Alpine Home Air?
        </Typography>

        <Grid container spacing={3}>
          {items.map((item) => (
            <Grid item xs={12} sm={4} key={item.title}>
              <Stack spacing={0.75}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <CheckCircleOutlineIcon
                    sx={{ fontSize: 20, color: "#4caf50", flexShrink: 0 }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontFamily: "'Open Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      color: TEXT_PRIMARY,
                    }}
                  >
                    {item.title}
                  </Typography>
                </Stack>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "'Open Sans', sans-serif",
                    color: TEXT_SECONDARY,
                    fontSize: "0.85rem",
                    lineHeight: 1.55,
                    pl: 3.5,
                  }}
                >
                  {item.body}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

/**
 * SeoContentSection
 * Minimal placeholder — preserves SEO content area.
 * In production, expand with actual editorial content.
 */
function SeoContentSection() {
  return (
    <Box
      component="section"
      data-section="seo-content"
      sx={{ width: "100%", py: 2 }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            fontFamily: "'Open Sans', sans-serif",
            fontWeight: 700,
            fontSize: { xs: "1.25rem", md: "1.5rem" },
            color: TEXT_PRIMARY,
            mb: 2,
          }}
        >
          About Air Conditioning / Cooling
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontFamily: "'Open Sans', sans-serif",
            color: TEXT_SECONDARY,
            fontSize: "0.9rem",
            lineHeight: 1.7,
            maxWidth: 800,
          }}
        >
          Air conditioning technology has evolved since the first modern systems appeared in the
          early 1900s. Today's systems are more efficient, quieter, and easier to install than
          ever before. Whether you need a ductless mini-split for a single room or a complete
          central air system for your entire home, choosing the right equipment starts with
          understanding your space, climate, and budget.
        </Typography>

        {/* Expandable content area placeholder */}
        <Button
          variant="text"
          size="small"
          endIcon={<ArrowForwardIcon />}
          sx={{
            mt: 1.5,
            fontFamily: "'Open Sans', sans-serif",
            color: ALPINE_BLUE,
            fontSize: "0.85rem",
            fontWeight: 600,
            textTransform: "none",
            p: 0,
            "&:hover": { bgcolor: "transparent", textDecoration: "underline" },
          }}
        >
          Read the full guide
        </Button>
      </Container>
    </Box>
  );
}

/**
 * PageFooter
 * Minimal — preserves footer structure from original design.
 */
function PageFooter() {
  const cols = [
    { heading: "Alpine", links: ["About Us", "Careers", "Press", "Blog"] },
    { heading: "My Account", links: ["Sign In", "Order Status", "Returns", "Wishlist"] },
    { heading: "Support", links: ["Contact Us", "FAQ", "Installation Help", "Warranty"] },
  ];

  return (
    <Box
      component="footer"
      data-section="footer"
      sx={{
        bgcolor: "#222",
        color: "rgba(255,255,255,0.85)",
        pt: 5,
        pb: 3,
        mt: 0,
        width: "100%",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} mb={4}>
          {cols.map((col) => (
            <Grid item xs={12} sm={4} key={col.heading}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "rgba(255,255,255,0.6)",
                  mb: 1.5,
                }}
              >
                {col.heading}
              </Typography>
              <Stack spacing={1}>
                {col.links.map((link) => (
                  <Typography
                    key={link}
                    component="a"
                    href="#"
                    variant="body2"
                    sx={{
                      fontFamily: "'Open Sans', sans-serif",
                      color: "rgba(255,255,255,0.8)",
                      fontSize: "0.82rem",
                      textDecoration: "none",
                      "&:hover": { color: "#fff", textDecoration: "underline" },
                    }}
                  >
                    {link}
                  </Typography>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.12)", mb: 2.5 }} />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={1}
        >
          <Typography
            variant="caption"
            sx={{
              color: "rgba(255,255,255,0.45)",
              fontFamily: "'Open Sans', sans-serif",
              fontSize: "0.72rem",
            }}
          >
            © 2024 Alpine Home Air Products. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={2}>
            {["Cookie Policy", "Privacy Policy"].map((item) => (
              <Typography
                key={item}
                component="a"
                href="#"
                variant="caption"
                sx={{
                  color: "rgba(255,255,255,0.45)",
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: "0.72rem",
                  textDecoration: "none",
                  "&:hover": { color: "rgba(255,255,255,0.75)" },
                }}
              >
                {item}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

// ─────────────────────────────────────────────
// Root Page Component
// ─────────────────────────────────────────────

/**
 * HvacLandingPage
 *
 * SECTION ORDER (vs. original):
 * Original: Hero → Shopping Tools → Categories → Why Alpine → Marketing Content → Still Not Sure → SEO → Footer
 * Improved: Hero → TrustBar → Shopping Tools (Start Here + inline expert CTA) → Categories → Why Alpine → SEO → Footer
 *
 * RATIONALE:
 * - Trust bar after hero: reduces bounce rate by building credibility before user scrolls
 * - Tools before categories: guide-first principle — route indecisive users before browse-first
 * - Expert fallback inline with tools: surfaces the safety net early (not buried at bottom)
 * - Why Alpine before SEO content: positioned as a conversion-layer before users disengage
 */
export default function HvacLandingPage() {
  return (
    <Box
      sx={{
        bgcolor: BG_PAGE,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        fontFamily: "'Open Sans', sans-serif",
      }}
    >
      {/* ① Hero — guide-first CTA ordering */}
      <HeroSection />

      {/* ② Trust Bar — NEW: placed immediately after hero to reduce risk */}
      <TrustBar />

      {/* ③ Shopping Tools — "Start Here" framing with inline expert fallback */}
      <Box sx={{ py: { xs: 4, md: 5 } }}>
        <ShoppingAssistanceSection />
      </Box>

      {/* ④ Categories — for users who already know what they want */}
      <Box sx={{ py: { xs: 4, md: 5 }, bgcolor: "#fff" }}>
        <ShopByCategorySection />
      </Box>

      {/* ⑤ Why Alpine — trust-building layer before disengagement */}
      <WhyAlpineSection />

      {/* ⑥ SEO Content */}
      <Box sx={{ py: { xs: 4, md: 5 } }}>
        <SeoContentSection />
      </Box>

      {/* ⑦ Footer */}
      <PageFooter />
    </Box>
  );
}
