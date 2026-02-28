import { AppBar, Toolbar, Button, Typography, IconButton, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useAppContext } from "../context/AppContext";

export default function Navbar() {
  const { theme, toggleTheme } = useAppContext();
  const cart = useSelector((state) => state.app.cart);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar position="static" sx={{ background: theme === 'dark' ? '#1a1a1a' : '#1565c0' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My Portfolio
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/"
            sx={{ 
              backgroundColor: isActive('/') ? 'rgba(255,255,255,0.1)' : 'transparent',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
            }}
          >
            Home
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/projects"
            sx={{ 
              backgroundColor: isActive('/projects') ? 'rgba(255,255,255,0.1)' : 'transparent',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
            }}
          >
            Projects
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/contact"
            sx={{ 
              backgroundColor: isActive('/contact') ? 'rgba(255,255,255,0.1)' : 'transparent',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
            }}
          >
            Contact
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/analytics"
            sx={{ 
              backgroundColor: isActive('/analytics') ? 'rgba(255,255,255,0.1)' : 'transparent',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
            }}
          >
            Analytics ({cart.length})
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/reports"
            sx={{ 
              backgroundColor: isActive('/reports') ? 'rgba(255,255,255,0.1)' : 'transparent',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
            }}
          >
            Reports
          </Button>
          
          <IconButton color="inherit" onClick={toggleTheme}>
            {theme === 'light' ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
