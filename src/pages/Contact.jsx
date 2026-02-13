import { Container, TextField, Button, Box, Typography } from "@mui/material";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you " + form.name + "! Your message has been submitted.");
  };

  return (
    <Box 
      sx={{ 
        minHeight: "80vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center" 
      }}
    >
      <Container 
        maxWidth="sm" 
        sx={{ 
          background: "rgba(255,255,255,0.15)",
          padding: 4,
          borderRadius: 4,
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          backdropFilter: "blur(12px)"
        }}
      >
        <Typography variant="h5" align="center" sx={{ mb: 3 }}>
          Contact Me
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField 
            fullWidth 
            label="Name" 
            sx={{ mb: 2, background: "white", borderRadius: 1 }}
            onChange={(e) => setForm({...form, name: e.target.value})}
          />
          <TextField 
            fullWidth 
            label="Email" 
            sx={{ mb: 2, background: "white", borderRadius: 1 }}
            onChange={(e) => setForm({...form, email: e.target.value})}
          />
          <TextField 
            fullWidth 
            label="Message" 
            multiline 
            rows={4} 
            sx={{ mb: 3, background: "white", borderRadius: 1 }}
            onChange={(e) => setForm({...form, message: e.target.value})}
          />

          <Button 
            variant="contained" 
            fullWidth 
            type="submit"
            sx={{ height: 45, fontSize: 16 }}
          >
            Submit
          </Button>
        </form>

        {/* Social Link */}
        <Typography align="center" sx={{ mt: 3, fontSize: 14, opacity: 0.9 }}>
  Connect with me on
</Typography>

<a 
  href="https://github.com/Aru144078" 
  target="_blank" 
  rel="noopener noreferrer"
  style={{ 
    display: "block",
    textAlign: "center",
    marginTop: "6px",
    color: "#90caf9",
    fontSize: "16px",
    textDecoration: "none",
    fontWeight: "bold"
  }}
>
  github.com/Aru144078
</a>

      </Container>
    </Box>
  );
}
