# Vue 3 Admin Dashboard

A modular, maintainable admin dashboard built with **Vue 3**, **Composition API**, **Tailwind CSS**, **Vue Router**, **Pinia**, and **localStorage** for persistence.

## Project Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure
```bash
src/
├── components/
│   └── common/          # Reusable UI components (BaseButton, BaseTable, BaseModal, etc.)
│   └── layout/          # Reusable Layout components (Navbar, Sidebar)
├── composables/         # Shared Composable (usePermissions, useInputValidation)
├── modules/             # Feature modules (users, reports, auth, dashboard)
│   └── users/
│       ├── views/
│       ├── components/
│       └── store/   
├── layouts/             
├── router/             
├── stores/            
└── App.vue            
```
## Features
```bash
├── User management with CRUD, filters, pagination, and search
├── Report management with status updates and modal viewing
├── Dynamic toolbar generation from schema
├── Responsive and accessible UI with Tailwind CSS
├── Local state persistence with localStorage
```