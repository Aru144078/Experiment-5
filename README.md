# Modern Portfolio - Experiment 4

A sophisticated React portfolio website enhanced with advanced React hooks and state management patterns.

## 🚀 Experiment 4 Enhancements

### New Features Added:
- **useContext**: Global state management for theme, favorites, cart, and user profile
- **useReducer**: Structured state updates with 8+ actions for complex state management
- **useMemo**: Performance optimization for derived calculations and filtered data
- **New Analytics Page**: Comprehensive dashboard demonstrating all new features

### 📁 Project Structure
```
src/
├── components/
│   ├── Navbar.jsx          # Enhanced with context integration
│   ├── Footer.jsx
│   ├── ProjectCard.jsx     # Enhanced with favorites and theme support
│   └── Skills.jsx
├── context/
│   └── AppContext.jsx      # Global context provider
├── reducer/
│   └── appReducer.js       # State management reducer
├── pages/
│   ├── Home.jsx            # Enhanced with context and useMemo
│   ├── Projects.jsx        # Enhanced with search, favorites, and useMemo
│   ├── Contact.jsx
│   └── Analytics.jsx       # New page demonstrating all features
├── App.jsx                 # Wrapped with AppProvider
└── main.jsx
```

## 🎯 Key Features

### Global State Management (useContext)
- **Theme System**: Light/dark mode toggle across all components
- **User Profile**: Mock user data accessible globally
- **Favorites System**: Add/remove favorite projects
- **Shopping Cart**: Full cart functionality with quantity management

### Structured State Updates (useReducer)
- **8+ Actions**: TOGGLE_THEME, ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES, ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_QUANTITY, CLEAR_CART, UPDATE_USER
- **Centralized Logic**: All state mutations handled in one reducer
- **Type Safety**: Consistent action patterns and state structure

### Performance Optimization (useMemo)
- **Filtered Search**: Real-time project filtering without re-computation
- **Statistics Calculation**: Cart totals, favorite counts, category analytics
- **Derived Data**: Complex calculations cached until dependencies change

### Analytics Dashboard
- **Real-time Statistics**: Cart value, item counts, favorite analytics
- **Interactive Demo**: Sample products to test cart/favorites functionality
- **Search & Filter**: Live search with memoized results
- **Category Insights**: Project distribution by category

## 🛠 Tech Stack

- **Frontend**: React 19, React Router DOM
- **UI Framework**: Material-UI (MUI) v7
- **State Management**: useContext + useReducer
- **Build Tool**: Vite
- **Styling**: Material-UI + Emotion

## 📱 Pages Overview

### Home
- Personalized greeting using context user data
- Quick stats dashboard (favorites, cart items, total value)
- Feature cards with navigation
- Theme-aware background gradients

### Projects Gallery
- Advanced search functionality (title, description, category, tech stack)
- Favorite toggle for each project
- Category and tech stack filtering
- Memoized statistics and filtered results
- Enhanced project cards with hover effects

### Analytics Dashboard
- Cart management with quantity controls
- Favorites management with category breakdown
- Sample products for demonstration
- Real-time statistics with useMemo optimization
- Theme toggle and cart management controls

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with Material-UI breakpoints
- **Theme Support**: Complete light/dark mode implementation
- **Micro-interactions**: Hover effects, transitions, and animations
- **Modern Design**: Clean layout with proper spacing and typography
- **Accessibility**: Semantic HTML and ARIA-friendly components

## 📸 Screenshots

Visit the `/screenshots` folder to see:
1. Home page with quick stats dashboard
2. Projects gallery with search and favorites
3. Analytics dashboard with cart and favorites management
4. Theme toggle demonstration

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## 📊 Experiment 4 Implementation

### useContext Usage
- `AppContext.jsx` provides global state
- Used in `Navbar.jsx`, `Home.jsx`, `Projects.jsx`, `Analytics.jsx`
- Manages theme, user, favorites, and cart state

### useReducer Implementation
- `appReducer.js` handles 8 different action types
- Centralized state logic for predictable updates
- Supports complex operations like quantity updates and batch operations

### useMemo Optimization
- Project filtering and search results
- Statistics calculations (cart totals, favorite counts)
- Category breakdowns and analytics data
- Prevents unnecessary re-renders on every state change

### New Analytics Page
- Comprehensive demonstration of all React hooks
- Interactive cart and favorites management
- Real-time statistics and insights
- Sample products for testing functionality

## 🔧 Development Notes

- **Performance**: All expensive calculations are memoized
- **State Architecture**: Separated concerns between context and reducer
- **Component Design**: Reusable components with prop interfaces
- **Error Handling**: Context usage with proper error boundaries
- **Code Organization**: Following the recommended folder structure

---

**UID**: 23BAI70126  
**Experiment**: 4 - Advanced React Hooks  
**Deployment**: {uid}-4-navkaran-singh.vercel.app
