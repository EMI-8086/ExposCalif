import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '../layouts/RootLayout';
import { LoginPage } from '../pages/LoginPage';
import { ProtectedRoute } from '../components/ProtectedRoute';

const DashboardPage = () => {
  return <h1 className="text-2xl font-bold">Bienvenido al Dashboard</h1>;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <RootLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          // Aquí agregarás más páginas: exposiciones, calificaciones, etc.
        ]
      }
    ]
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);