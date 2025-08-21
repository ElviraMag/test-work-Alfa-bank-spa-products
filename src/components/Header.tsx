import { Link, NavLink } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-gray-800 text-white">
      <nav className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-lg font-bold">
          My Store
        </Link>
        <div className="flex gap-4">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? 'underline' : 'hover:underline'
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/create-product"
            className={({ isActive }) =>
              isActive ? 'underline' : 'hover:underline'
            }
          >
            Create Product
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
