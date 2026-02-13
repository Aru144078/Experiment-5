import { Card, CardContent, Typography, Button, Box } from "@mui/material";

export default function ProjectCard({ title, desc }) {
  return (
    <Card sx={{ 
      width: 300,
      height: 200,
      background: "rgba(255,255,255,0.12)", 
      color: "white",
      backdropFilter: "blur(10px)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography sx={{ mt: 1 }}>{desc}</Typography>
      </CardContent>

      <Box sx={{ p: 2 }}>
        <Button variant="contained" fullWidth>
          View Details
        </Button>
      </Box>
    </Card>
  );
}
