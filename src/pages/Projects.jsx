import React, { useMemo, useState } from "react";
import { Grid, Box, TextField, Typography, Container } from "@mui/material";
import ProjectCard from "../components/ProjectCard";
import { useAppContext } from "../context/AppContext";

export default function Projects() {
  const { theme, addToFavorites, removeFromFavorites, favorites } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");

  const projects = useMemo(() => [
    { id: 1, title: "IONIX AI", desc: "AI productivity assistant using MERN + NLP", category: "AI/ML", tech: ["React", "Node.js", "MongoDB", "NLP"] },
    { id: 2, title: "Smart E-Store", desc: "PWA with offline mode and cart system", category: "E-Commerce", tech: ["React", "PWA", "Redux", "Node.js"] },
    { id: 3, title: "Azure Bot", desc: "Cloud chatbot for student queries", category: "Cloud", tech: ["Azure", "Bot Framework", "AI"] },
    { id: 4, title: "Attendance System", desc: "Face recognition based student attendance", category: "AI/ML", tech: ["Python", "OpenCV", "Face Recognition"] },
    { id: 5, title: "Crop Disease Detector", desc: "CNN based plant disease classification", category: "AI/ML", tech: ["TensorFlow", "CNN", "Python"] },
    { id: 6, title: "Chat App", desc: "Real-time chat using Socket.io", category: "Social", tech: ["Socket.io", "React", "Node.js"] }
  ], []);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [projects, searchTerm]);

  const projectStats = useMemo(() => {
    const categories = projects.reduce((acc, project) => {
      acc[project.category] = (acc[project.category] || 0) + 1;
      return acc;
    }, {});
    
    const techStack = projects.reduce((acc, project) => {
      project.tech.forEach(tech => {
        acc[tech] = (acc[tech] || 0) + 1;
      });
      return acc;
    }, {});

    return {
      totalProjects: projects.length,
      categories,
      techStack,
      topCategory: Object.keys(categories).reduce((a, b) => 
        categories[a] > categories[b] ? a : b, null)
    };
  }, [projects]);

  const isFavorite = (projectId) => favorites.some(fav => fav.id === projectId);

  const handleFavoriteToggle = (project) => {
    if (isFavorite(project.id)) {
      removeFromFavorites(project.id);
    } else {
      addToFavorites(project);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
        Projects Gallery
      </Typography>
      
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Explore my {projectStats.totalProjects} projects across {Object.keys(projectStats.categories).length} categories
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="Search projects..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ maxWidth: 400 }}
        />
      </Box>

      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="body2" color="text.secondary">
          Categories: {Object.entries(projectStats.categories).map(([cat, count]) => 
            `${cat} (${count})`).join(', ')}
        </Typography>
      </Box>

      <Box 
        sx={{ 
          minHeight: "60vh", 
          display: "flex", 
          alignItems: "flex-start", 
          justifyContent: "center" 
        }}
      >
        <Grid container spacing={4} justifyContent="center">
          {filteredProjects.map((project) => (
            <Grid item key={project.id}>
              <ProjectCard 
                {...project}
                isFavorite={isFavorite(project.id)}
                onFavoriteToggle={() => handleFavoriteToggle(project)}
                theme={theme}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {filteredProjects.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No projects found matching "{searchTerm}"
          </Typography>
        </Box>
      )}
    </Container>
  );
}
