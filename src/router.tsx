import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

// Lazy load pages/Components
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="loading">Loading...</div>}>
    {children}
  </Suspense>
);

// Root Route
const rootRoute = createRootRoute({
  component: () => (
    <SuspenseWrapper>
      <Outlet />
    </SuspenseWrapper>
  ),
});

// Define the child routes
const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: () => (
    <SuspenseWrapper>
      <Register />
    </SuspenseWrapper>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: () => (
    <SuspenseWrapper>
      <Login />
    </SuspenseWrapper>
  ),
});

export const router = createRouter({
  routeTree: rootRoute.addChildren([registerRoute, loginRoute]),
  defaultPreload: 'intent',
});
