import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const RootLayout = () => {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">ExpoCalif</Link>
          <div className="space-x-4">
            <span className="text-gray-700">{user?.name}</span>
            <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Salir</button>
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};