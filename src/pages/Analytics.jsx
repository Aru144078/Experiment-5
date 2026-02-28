import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Paper
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ShoppingCart as ShoppingCartIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { useAppContext } from '../context/AppContext';
import {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  addToFavorites,
  removeFromFavorites
} from '../redux/slices/appSlice';

const Analytics = () => {
  const { theme, user, toggleTheme } = useAppContext();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.app.favorites);
  const cart = useSelector((state) => state.app.cart);

  const [searchTerm, setSearchTerm] = useState('');

  // Memoized calculations for performance optimization
  const cartStats = useMemo(() => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const uniqueItems = cart.length;
    
    return {
      totalItems,
      totalPrice,
      uniqueItems,
      averagePrice: uniqueItems > 0 ? totalPrice / uniqueItems : 0
    };
  }, [cart]);

  const favoriteStats = useMemo(() => {
    const categories = favorites.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});
    
    return {
      totalFavorites: favorites.length,
      categories,
      topCategory: Object.keys(categories).reduce((a, b) => 
        categories[a] > categories[b] ? a : b, null)
    };
  }, [favorites]);

  const filteredCart = useMemo(() => {
    return cart.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cart, searchTerm]);

  const sampleProducts = [
    { id: 1, name: 'Laptop', price: 999, category: 'Electronics', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&h=100&fit=crop' },
    { id: 2, name: 'Headphones', price: 199, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop' },
    { id: 3, name: 'Book', price: 29, category: 'Education', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=100&fit=crop' },
    { id: 4, name: 'Coffee Mug', price: 15, category: 'Lifestyle', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcff93?w=100&h=100&fit=crop' }
  ];

  const isFavorite = (productId) => favorites.some(item => item.id === productId);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
        Analytics Dashboard
      </Typography>
      
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Welcome back, {user.name}!
      </Typography>

      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button 
          variant="contained" 
          onClick={toggleTheme}
          startIcon={theme === 'light' ? '🌙' : '☀️'}
        >
          Toggle Theme ({theme})
        </Button>
        <Button 
          variant="outlined" 
          onClick={() => dispatch(clearCart())}
          disabled={cart.length === 0}
          startIcon={<DeleteIcon />}
        >
          Clear Cart
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Cart Statistics */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <ShoppingCartIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h5" fontWeight="bold">
                  Cart Analytics
                </Typography>
              </Box>
              
              <Grid container spacing={2} mb={3}>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="primary" fontWeight="bold">
                      {cartStats.totalItems}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Items
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="success.main" fontWeight="bold">
                      ${cartStats.totalPrice.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Value
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Typography variant="h6" gutterBottom>
                Shopping Cart ({filteredCart.length} items)
              </Typography>
              
              <input
                type="text"
                placeholder="Search cart items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginBottom: '16px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />

              <List>
                {filteredCart.map((item) => (
                  <ListItem key={item.id} divider>
                    <ListItemText
                      primary={item.name}
                      secondary={`$${item.price} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`}
                    />
                    <ListItemSecondaryAction>
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconButton 
                          size="small" 
                          onClick={() => dispatch(updateCartQuantity({ itemId: item.id, quantity: item.quantity - 1 }))}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography variant="body2" sx={{ minWidth: '20px', textAlign: 'center' }}>
                          {item.quantity}
                        </Typography>
                        <IconButton 
                          size="small" 
                          onClick={() => dispatch(updateCartQuantity({ itemId: item.id, quantity: item.quantity + 1 }))}
                        >
                          <AddIcon />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => dispatch(removeFromCart(item.id))}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Favorites Statistics */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <FavoriteIcon color="error" sx={{ mr: 1 }} />
                <Typography variant="h5" fontWeight="bold">
                  Favorites Analytics
                </Typography>
              </Box>
              
              <Grid container spacing={2} mb={3}>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="error" fontWeight="bold">
                      {favoriteStats.totalFavorites}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Favorites
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="info.main" fontWeight="bold">
                      {Object.keys(favoriteStats.categories).length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Categories
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Typography variant="h6" gutterBottom>
                Favorite Items
              </Typography>
              
              <Grid container spacing={2}>
                {favorites.map((item) => (
                  <Grid item xs={12} sm={6} key={item.id}>
                    <Card variant="outlined">
                      <CardContent sx={{ p: 2 }}>
                        <Box display="flex" alignItems="center" gap={2}>
                          <img 
                            src={item.image} 
                            alt={item.name}
                            style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
                          />
                          <Box flex={1}>
                            <Typography variant="body2" fontWeight="bold">
                              {item.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.category}
                            </Typography>
                            <Typography variant="body2" color="primary">
                              ${item.price}
                            </Typography>
                          </Box>
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => dispatch(removeFromFavorites(item.id))}
                          >
                            <FavoriteIcon />
                          </IconButton>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Sample Products */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <TrendingUpIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="h5" fontWeight="bold">
                  Sample Products
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Click to add to cart or favorites
              </Typography>
              
              <Grid container spacing={2}>
                {sampleProducts.map((product) => (
                  <Grid item xs={12} sm={6} md={3} key={product.id}>
                    <Card variant="outlined">
                      <CardContent sx={{ p: 2, textAlign: 'center' }}>
                        <img 
                          src={product.image} 
                          alt={product.name}
                          style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 4, marginBottom: 8 }}
                        />
                        <Typography variant="body2" fontWeight="bold" gutterBottom>
                          {product.name}
                        </Typography>
                        <Chip 
                          label={product.category} 
                          size="small" 
                          variant="outlined" 
                          sx={{ mb: 1 }}
                        />
                        <Typography variant="h6" color="primary" gutterBottom>
                          ${product.price}
                        </Typography>
                        <Box display="flex" gap={1} justifyContent="center">
                          <Button 
                            size="small" 
                            variant="contained"
                            onClick={() => dispatch(addToCart(product))}
                          >
                            Add to Cart
                          </Button>
                          <IconButton 
                            size="small"
                            color={isFavorite(product.id) ? 'error' : 'default'}
                            onClick={() => {
                              if (isFavorite(product.id)) {
                                dispatch(removeFromFavorites(product.id));
                              } else {
                                dispatch(addToFavorites(product));
                              }
                            }}
                          >
                            {isFavorite(product.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                          </IconButton>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Analytics;
