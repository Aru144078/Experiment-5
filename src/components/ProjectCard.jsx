import React from "react";
import { Card, CardContent, Typography, Button, Box, Chip, IconButton } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

export default function ProjectCard({ title, desc, category, tech, isFavorite, onFavoriteToggle, theme }) {
  return (
    <Card sx={{ 
      width: 320,
      height: 280,
      background: theme === 'dark' ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.12)", 
      color: theme === 'dark' ? "white" : "inherit",
      backdropFilter: "blur(10px)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      transition: "transform 0.2s, box-shadow 0.2s",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 8px 25px rgba(0,0,0,0.15)"
      }
    }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
          <Typography variant="h6" fontWeight="bold">{title}</Typography>
          <IconButton 
            size="small" 
            onClick={onFavoriteToggle}
            color={isFavorite ? "error" : "default"}
          >
            {isFavorite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Box>
        
        <Chip 
          label={category} 
          size="small" 
          variant="outlined" 
          sx={{ mb: 2 }}
        />
        
        <Typography variant="body2" sx={{ mb: 2 }}>{desc}</Typography>
        
        <Box display="flex" flexWrap="wrap" gap={0.5}>
          {tech.map((technology, index) => (
            <Chip 
              key={index}
              label={technology} 
              size="small" 
              variant="filled"
              sx={{ 
                fontSize: '0.7rem',
                height: '20px',
                backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'primary.main',
                color: theme === 'dark' ? 'white' : 'white'
              }}
            />
          ))}
        </Box>
      </CardContent>

      <Box sx={{ p: 2 }}>
        <Button variant="contained" fullWidth>
          View Details
        </Button>
      </Box>
    </Card>
  );
}
