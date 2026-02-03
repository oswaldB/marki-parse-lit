# Specification: Login Page

## Overview
This specification describes the requirements and design for the Login page in the Marki application. The page allows users to authenticate and access the application.

## Page Structure

### 1. Layout Structure
- **Layout Component**: `login-layout` (LitElement)
- **Main Content**: Login form with email and password fields
- **Footer**: Links to terms, privacy policy, and contact

### 2. Login Layout Component
- **Properties**:
  - `title`: Application title (default: "Marki - Connexion")
  - `welcomeMessage`: Welcome message (default: "Bienvenue sur Marki")
  - `showLogo`: Boolean to show/hide logo (default: true)

### 3. Login Form Component
- **Properties**:
  - `email`: User email input
  - `password`: User password input
  - `isLoading`: Boolean for loading state
  - `errorMessage`: String for error display

### 4. Form Fields
- **Email Field**:
  - Type: email
  - Label: "Adresse email"
  - Placeholder: "votre@email.com"
  - Validation: Required, valid email format

- **Password Field**:
  - Type: password
  - Label: "Mot de passe"
  - Placeholder: "••••••••"
  - Validation: Required, minimum 8 characters

### 5. Action Buttons
- **Login Button**:
  - Text: "Se connecter"
  - Style: Primary button (bg-marki-blue)
  - Disabled when form invalid or loading

- **Forgot Password Link**:
  - Text: "Mot de passe oublié ?"
  - Action: Navigate to password reset page

### 6. Error Handling
- **Error Display**: Show error messages below form
- **Loading State**: Disable form and show spinner during authentication

## Functional Requirements

### 1. Authentication Flow
1. User enters email and password
2. Form validation occurs on submit
3. If valid, show loading state
4. Call Parse Server authentication API
5. On success: Redirect to dashboard
6. On error: Display error message

### 2. Form Validation
- **Email**: Required, valid email format
- **Password**: Required, minimum 8 characters
- **Visual Feedback**: Highlight invalid fields

### 3. User Experience
- **Auto-focus**: Email field on page load
- **Keyboard Navigation**: Tab through fields
- **Enter Key**: Submit form when pressed
- **Responsive**: Mobile-friendly layout

## Technical Implementation

### 1. Component Architecture
```
login-page/
├── components/
│   ├── login-layout.js      # Main layout component
│   ├── login-form.js        # Login form component
│   └── login-input.js       # Input field component
├── css/
│   └── styles.css           # Custom styles
├── js/
│   ├── auth-service.js      # Authentication service
│   └── main.js              # Main application logic
└── index.html               # Entry point
```

### 2. Authentication Service
- **Method**: `login(email, password)`
- **Returns**: Promise with user object or error
- **Integration**: Parse Server SDK

### 3. State Management
- **Alpine.js Store**: Centralized state for authentication
- **Properties**:
  - `user`: Current user object
  - `isAuthenticated`: Boolean authentication state
  - `authError`: Error message
  - `isLoading`: Loading state

## Design Guidelines

### 1. Color Scheme
- **Primary**: Marki Blue (#007ace)
- **Background**: White (#ffffff)
- **Text**: Dark gray (#1f2937)
- **Error**: Red (#ef4444)

### 2. Typography
- **Title**: 1.5rem, font-bold
- **Labels**: 0.875rem, font-medium
- **Buttons**: 0.875rem, font-medium

### 3. Spacing
- **Form padding**: 1.5rem
- **Field spacing**: 1rem
- **Button margin**: 1.5rem top

## ASCII Mockup

```
+---------------------------------------------------+
| Marki - Connexion                                |
| Bienvenue sur Marki                              |
+---------------------------------------------------+
|                                                   |
| [Logo Marki]                                      |
|                                                   |
| Adresse email                                     |
| [_____________________________________________] |
|                                                   |
| Mot de passe                                      |
| [_____________________________________________] |
|                                                   |
| [Se connecter]                                    |
|                                                   |
| Mot de passe oublié ?                             |
|                                                   |
+---------------------------------------------------+
| Conditions générales | Politique de confidentialité |
| Contact                                            |
+---------------------------------------------------+
```

## Responsive Design
- **Mobile**: Stacked layout, full-width fields
- **Tablet**: Side-by-side fields
- **Desktop**: Centered form with max-width

## Performance Considerations
- **Lazy Loading**: Defer non-critical scripts
- **Form Validation**: Client-side before submission
- **Error Handling**: Graceful degradation

## Security Requirements
- **HTTPS**: All communications encrypted
- **Password Hashing**: Secure storage
- **CSRF Protection**: Anti-forgery tokens
- **Rate Limiting**: Prevent brute force attacks

## Accessibility
- **ARIA Labels**: Proper form labeling
- **Keyboard Navigation**: Full support
- **Screen Reader**: Compatible markup
- **Color Contrast**: WCAG compliant

## Notes de Conception

### Principes Clés
- **Simplicité**: Interface intuitive et directe
- **Sécurité**: Protection des données utilisateur
- **Feedback**: Retours visuels pour toutes les actions
- **Performance**: Chargement rapide et réactif

### Documentation Connexe
- `admin/styleguide.md`: Styleguide du projet
- Parse Server Documentation: Authentication API
- Alpine.js Documentation: State management