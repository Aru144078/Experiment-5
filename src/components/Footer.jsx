import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ textAlign: "center", p: 2, mt: 5, bgcolor: "#111", color: "#fff" }}>
      <Typography>
        © 2024 Arushi | UID: 23BAI70126
      </Typography>
      <Typography sx={{ fontSize: 12, opacity: 0.7 }}>
        AIML & Full Stack Developer
      </Typography>
    </Box>
  );
}
