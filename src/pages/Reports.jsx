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
  Divider,
  Paper,
  LinearProgress,
  TextField
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon,
  Assessment as AssessmentIcon,
  Delete as DeleteIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material';
import { useAppContext } from '../context/AppContext';
import {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  addToFavorites,
  removeFromFavorites,
  clearFavorites
} from '../redux/slices/appSlice';

const Reports = () => {
  const { theme, user } = useAppContext();
  const dispatch = useDispatch();
  
  const favorites = useSelector((state) => state.app.favorites);
  const cart = useSelector((state) => state.app.cart);
  
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const cartMetrics = useMemo(() => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalValue = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const averageItemPrice = cart.length > 0 ? totalValue / totalItems : 0;
    const uniqueProducts = cart.length;
    
    return {
      totalItems,
      totalValue,
      averageItemPrice,
      uniqueProducts
    };
  }, [cart]);

  const favoriteMetrics = useMemo(() => {
    const categoryBreakdown = favorites.reduce((acc, item) => {
      const category = item.category || 'Uncategorized';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});
    
    const totalFavorites = favorites.length;
    const categories = Object.keys(categoryBreakdown);
    const topCategory = categories.reduce((a, b) => 
      categoryBreakdown[a] > categoryBreakdown[b] ? a : b, categories[0] || 'None');
    
    return {
      totalFavorites,
      categoryBreakdown,
      topCategory,
      categoriesCount: categories.length
    };
  }, [favorites]);

  const filteredFavorites = useMemo(() => {
    return favorites.filter(item => {
      const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [favorites, filterCategory, searchTerm]);

  const performanceScore = useMemo(() => {
    const cartScore = Math.min((cartMetrics.totalValue / 1000) * 100, 100);
    const favoriteScore = Math.min((favoriteMetrics.totalFavorites / 10) * 100, 100);
    return Math.round((cartScore + favoriteScore) / 2);
  }, [cartMetrics.totalValue, favoriteMetrics.totalFavorites]);

  const sampleProducts = [
    { id: 101, name: 'Premium Laptop', price: 1299, category: 'Electronics', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&h=100&fit=crop' },
    { id: 102, name: 'Wireless Mouse', price: 49, category: 'Electronics', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop' },
    { id: 103, name: 'Design Book', price: 35, category: 'Education', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=100&fit=crop' },
    { id: 104, name: 'Smart Watch', price: 299, category: 'Electronics', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop' }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Performance Reports
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Welcome, {user.name}! Here's your activity overview
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card elevation={3} sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {cartMetrics.totalItems}
                  </Typography>
                  <Typography variant="body2">
                    Cart Items
                  </Typography>
                </Box>
                <ShoppingCartIcon sx={{ fontSize: 48, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card elevation={3} sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    ${cartMetrics.totalValue.toFixed(2)}
                  </Typography>
                  <Typography variant="body2">
                    Total Value
                  </Typography>
                </Box>
                <TrendingUpIcon sx={{ fontSize: 48, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card elevation={3} sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {favoriteMetrics.totalFavorites}
                  </Typography>
                  <Typography variant="body2">
                    Favorites
                  </Typography>
                </Box>
                <FavoriteIcon sx={{ fontSize: 48, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card elevation={3} sx={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {performanceScore}%
                  </Typography>
                  <Typography variant="body2">
                    Performance
                  </Typography>
                </Box>
                <AssessmentIcon sx={{ fontSize: 48, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Performance Overview
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Cart Activity</Typography>
                  <Typography variant="body2">{Math.min((cartMetrics.totalValue / 1000) * 100, 100).toFixed(0)}%</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={Math.min((cartMetrics.totalValue / 1000) * 100, 100)} 
                  sx={{ height: 10, borderRadius: 5, mb: 2 }}
                />
                
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Favorites Collection</Typography>
                  <Typography variant="body2">{Math.min((favoriteMetrics.totalFavorites / 10) * 100, 100).toFixed(0)}%</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={Math.min((favoriteMetrics.totalFavorites / 10) * 100, 100)} 
                  sx={{ height: 10, borderRadius: 5, mb: 2 }}
                  color="secondary"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" fontWeight="bold">
                  Shopping Cart
                </Typography>
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => dispatch(clearCart())}
                  disabled={cart.length === 0}
                  startIcon={<DeleteIcon />}
                >
                  Clear All
                </Button>
              </Box>

              <Grid container spacing={2} mb={2}>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light', color: 'white' }}>
                    <Typography variant="h6">{cartMetrics.uniqueProducts}</Typography>
                    <Typography variant="caption">Unique Items</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.light', color: 'white' }}>
                    <Typography variant="h6">${cartMetrics.averageItemPrice.toFixed(2)}</Typography>
                    <Typography variant="caption">Avg Price</Typography>
                  </Paper>
                </Grid>
              </Grid>

              <List sx={{ maxHeight: 300, overflow: 'auto' }}>
                {cart.map((item) => (
                  <ListItem key={item.id} divider>
                    <ListItemText
                      primary={item.name}
                      secondary={`$${item.price} × ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`}
                    />
                    <Box display="flex" gap={1}>
                      <IconButton 
                        size="small"
                        onClick={() => dispatch(updateCartQuantity({ itemId: item.id, quantity: item.quantity - 1 }))}
                      >
                        -
                      </IconButton>
                      <Typography sx={{ minWidth: 30, textAlign: 'center', lineHeight: '32px' }}>
                        {item.quantity}
                      </Typography>
                      <IconButton 
                        size="small"
                        onClick={() => dispatch(updateCartQuantity({ itemId: item.id, quantity: item.quantity + 1 }))}
                      >
                        +
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </ListItem>
                ))}
                {cart.length === 0 && (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography color="text.secondary">Cart is empty</Typography>
                  </Box>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" fontWeight="bold">
                  Favorites
                </Typography>
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => dispatch(clearFavorites())}
                  disabled={favorites.length === 0}
                  startIcon={<DeleteIcon />}
                >
                  Clear All
                </Button>
              </Box>

              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search favorites..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ mb: 1 }}
                />
                <Box display="flex" gap={1} flexWrap="wrap">
                  <Chip 
                    label="All" 
                    onClick={() => setFilterCategory('all')}
                    color={filterCategory === 'all' ? 'primary' : 'default'}
                    size="small"
                  />
                  {Object.keys(favoriteMetrics.categoryBreakdown).map(cat => (
                    <Chip 
                      key={cat}
                      label={`${cat} (${favoriteMetrics.categoryBreakdown[cat]})`}
                      onClick={() => setFilterCategory(cat)}
                      color={filterCategory === cat ? 'primary' : 'default'}
                      size="small"
                    />
                  ))}
                </Box>
              </Box>

              <List sx={{ maxHeight: 300, overflow: 'auto' }}>
                {filteredFavorites.map((item) => (
                  <ListItem key={item.id} divider>
                    <ListItemText
                      primary={item.name}
                      secondary={`${item.category} - $${item.price}`}
                    />
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => dispatch(removeFromFavorites(item.id))}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </ListItem>
                ))}
                {filteredFavorites.length === 0 && (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography color="text.secondary">
                      {favorites.length === 0 ? 'No favorites yet' : 'No matches found'}
                    </Typography>
                  </Box>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Quick Actions - Sample Products
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Add items to cart or favorites to see reports update in real-time
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {sampleProducts.map((product) => (
                  <Grid item xs={12} sm={6} md={3} key={product.id}>
                    <Card variant="outlined">
                      <CardContent sx={{ textAlign: 'center' }}>
                        <img 
                          src={product.image} 
                          alt={product.name}
                          style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }}
                        />
                        <Typography variant="body2" fontWeight="bold" gutterBottom>
                          {product.name}
                        </Typography>
                        <Chip label={product.category} size="small" sx={{ mb: 1 }} />
                        <Typography variant="h6" color="primary" gutterBottom>
                          ${product.price}
                        </Typography>
                        <Box display="flex" gap={1} justifyContent="center">
                          <Button 
                            size="small" 
                            variant="contained"
                            onClick={() => dispatch(addToCart(product))}
                          >
                            Cart
                          </Button>
                          <IconButton 
                            size="small"
                            color="error"
                            onClick={() => dispatch(addToFavorites(product))}
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
      </Grid>
    </Container>
  );
};

export default Reports;
