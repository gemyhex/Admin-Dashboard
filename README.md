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
├── assets/
│   └── styles/                  # Global SCSS styles
│       └── main.scss
│
├── components/
│   └── common/                 # Reusable UI components
│       ├── charts/            # Dynamic charts (bar, line, pie)
│       ├── fallback/          # Skeleton loaders and fallback UIs
│       ├── Table/             # Reusable table components (BaseTable, BaseToolbar)
│       ├── BaseButton.vue
│       ├── BaseInput.vue
│       ├── BaseModal.vue
│       ├── BasePagination.vue
│       ├── BaseSelect.vue
│       ├── BaseSummaryCard.vue
│       ├── BaseToaster.vue
│       └── DynamicForm.vue
│
│   └── layout/                # Application layout components
│       ├── navbar/
│       │   ├── AppHeader.vue
│       │   ├── ThemeToggle.vue
│       │   └── UserProfile.vue
│       └── sidebar/
│           ├── Sidebar.vue
│           └── SidebarLink.vue
│
├── composables/              # Reusable logic (Vue composables)
│   ├── useDynamicForm.js
│   ├── useInputValidation.js
│   ├── usePermission.js
│   └── useToaster.js
│
├── layouts/                  # Global layouts
│   ├── AuthLayout.vue
│   └── DashboardLayout.vue
│
├── modules/                  # Feature-based modules
│   ├── auth/
│   │   ├── components/
│   │   │   └── LoginForm.vue
│   │   ├── router/
│   │   │   └── routes.js
│   │   ├── store/
│   │   │   └── useAuthStore.js
│   │   └── views/
│   │       └── LoginPage.vue
│   │
│   ├── dashboard/
│   │   ├── components/
│   │   │   ├── AssetSummary.vue
│   │   │   └── AssetTable.vue
│   │   ├── router/
│   │   │   └── routes.js
│   │   ├── services/
│   │   │   └── dashboardService.js
│   │   └── views/
│   │       └── DashboardPage.vue
│   │
│   ├── reports/
│   │   ├── components/
│   │   │   ├── ReportDetails.vue
│   │   │   └── ReportTable.vue
│   │   ├── enums/
│   │   │   └── enums.js
│   │   ├── router/
│   │   │   └── routes.js
│   │   └── views/
│   │       └── ReportsPage.vue
│   │
│   └── users/
│       ├── components/
│       │   ├── UserForm.vue
│       │   └── UserTable.vue
│       ├── enums/
│       │   └── enums.js
│       ├── router/
│       │   └── routes.js
│       └── views/
│           └── UserPage.vue
│
├── plugins/                  # Global plugins
│   ├── axios.js              # Axios instance and interceptors
│   └── global-components.js # Auto-register global components
│
├── router/
│   └── index.js              # App-wide router entry point
│
├── services/
│   └── api.js                # Generic API layer
│
├── stores/
│   ├── useReportStore.js
│   └── useUserStore.js
│
├── utils/                    # Utility functions
│   ├── chartHelpers.js
│   └── helpers.js
│
├── views/
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
