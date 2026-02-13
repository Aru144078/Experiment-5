import { Box, Typography, Chip } from "@mui/material";

export default function Skills() {
  return (
    <Box sx={{ textAlign: "center", mt: 6 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        My Skills
      </Typography>

      <Chip label="React" sx={{ m: 1 }} />
      <Chip label="Material UI" sx={{ m: 1 }} />
      <Chip label="Node.js" sx={{ m: 1 }} />
      <Chip label="MongoDB" sx={{ m: 1 }} />
      <Chip label="Python" sx={{ m: 1 }} />
      <Chip label="Machine Learning" sx={{ m: 1 }} />
    </Box>
  );
}
