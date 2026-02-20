import React, { useMemo } from "react";
import { Container, Typography, Button, Box, Card, CardContent, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Skills from "../components/Skills";
import { useAppContext } from "../context/AppContext";

export default function Home() {
  const navigate = useNavigate();
  const { theme, user, favorites, cart } = useAppContext();

  const quickStats = useMemo(() => ({
    favoriteProjects: favorites.length,
    cartItems: cart.reduce((sum, item) => sum + item.quantity, 0),
    totalValue: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }), [favorites, cart]);

  const features = useMemo(() => [
    {
      title: "Smart Analytics",
      description: "Track your favorites and cart with real-time analytics",
      icon: "📊",
      path: "/analytics"
    },
    {
      title: "Project Gallery",
      description: "Explore my diverse portfolio of projects",
      icon: "🚀",
      path: "/projects"
    },
    {
      title: "Get in Touch",
      description: "Let's collaborate on your next project",
      icon: "💬",
      path: "/contact"
    }
  ], []);

  return (
    <Box 
      sx={{ 
        minHeight: "80vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        background: theme === 'dark' 
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}
    >
      <Container sx={{ textAlign: "center" }}>
        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
          Hi, I'm {user.name} 👋
        </Typography>

        <Typography variant="h5" sx={{ mt: 2 }}>
          B.Tech AIML | Full Stack Developer
        </Typography>

        <Typography sx={{ mt: 1, opacity: 0.8 }}>
          UID: 23BAI70126 | Chandigarh University
        </Typography>

        {/* Quick Stats */}
        <Box sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Card variant="outlined" sx={{ px: 3, py: 2 }}>
                <Typography variant="h6" color="primary">
                  {quickStats.favoriteProjects}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Favorites
                </Typography>
              </Card>
            </Grid>
            <Grid item>
              <Card variant="outlined" sx={{ px: 3, py: 2 }}>
                <Typography variant="h6" color="success.main">
                  {quickStats.cartItems}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cart Items
                </Typography>
              </Card>
            </Grid>
            <Grid item>
              <Card variant="outlined" sx={{ px: 3, py: 2 }}>
                <Typography variant="h6" color="warning.main">
                  ${quickStats.totalValue.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cart Value
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Button 
          variant="contained" 
          size="large"
          sx={{ mt: 2, px: 4 }}
          onClick={() => navigate("/projects")}
        >
          Explore My Work 
        </Button>

        {/* Features Grid */}
        <Box sx={{ mt: 6, mb: 4 }}>
          <Grid container spacing={3} justifyContent="center">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'translateY(-4px)' }
                  }}
                  onClick={() => navigate(feature.path)}
                >
                  <CardContent>
                    <Typography variant="h3" sx={{ mb: 2 }}>
                      {feature.icon}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

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
