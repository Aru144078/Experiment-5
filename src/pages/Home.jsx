import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Skills from "../components/Skills";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box 
      sx={{ 
        minHeight: "80vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center" 
      }}
    >
      <Container sx={{ textAlign: "center" }}>
        <Typography variant="h2" sx={{ fontWeight: "bold" }}>
          Hi, I'm Arushi 👋
        </Typography>

        <Typography variant="h5" sx={{ mt: 2 }}>
          B.Tech AIML | Full Stack Developer
        </Typography>

        <Typography sx={{ mt: 1, opacity: 0.8 }}>
          UID: 23BAI70126 | Chandigarh University
        </Typography>

        <Button 
          variant="contained" 
          size="large"
          sx={{ mt: 4, px: 4 }}
          onClick={() => navigate("/projects")}
        >
          Explore My Work 
        </Button>

        {/* Skills Section */}
        <Skills />

        {/* About Me */}
        <Typography sx={{ mt: 4, maxWidth: 600, margin: "auto", opacity: 0.9 }}>
          I am a passionate AIML student who loves building intelligent systems,
          modern web applications, and exploring how AI can solve real-world problems.
        </Typography>
      </Container>
    </Box>
  );
}
