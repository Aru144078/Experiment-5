import { Grid, Box } from "@mui/material";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  return (
    <Box 
      sx={{ 
        minHeight: "80vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center" 
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        <Grid item>
          <ProjectCard 
            title="IONIX AI" 
            desc="AI productivity assistant using MERN + NLP" 
          />
        </Grid>

        <Grid item>
          <ProjectCard 
            title="Smart E-Store" 
            desc="PWA with offline mode and cart system" 
          />
        </Grid>

        <Grid item>
          <ProjectCard 
            title="Azure Bot" 
            desc="Cloud chatbot for student queries" 
          />
        </Grid>

        <Grid item>
          <ProjectCard 
            title="Attendance System" 
            desc="Face recognition based student attendance" 
          />
        </Grid>

        <Grid item>
          <ProjectCard 
            title="Crop Disease Detector" 
            desc="CNN based plant disease classification" 
          />
        </Grid>

        <Grid item>
          <ProjectCard 
            title="Chat App" 
            desc="Real-time chat using Socket.io" 
          />
        </Grid>
      </Grid>
    </Box>
  );
}
