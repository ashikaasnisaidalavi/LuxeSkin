import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Menu,
  X,
  User,
} from "lucide-react";

import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";

function Navbar() {
  const navigate = useNavigate();

  const { user, isLoggedIn, signOut } = useAuth();

  const cartItems = useSelector((state) => state.cart.items);

  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const cartCount = cartItems.length;

  function handleLogout() {
    signOut();
    setUserMenuOpen(false);
    setMenuOpen(false);
    navigate("/");
  }

  const navLinkClass = ({ isActive }) =>
    `text-sm tracking-wide transition hover:text-luxe-gold ${
      isActive ? "text-luxe-gold" : "text-luxe-brown"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[#e9e0d6] bg-[#faf7f2]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-light tracking-[4px] text-luxe-brown"
        >
          LUXESKIN
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-9 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/wishlist" className={navLinkClass}>
            Wishlist
          </NavLink>

          <NavLink to="/orders" className={navLinkClass}>
            Orders
          </NavLink>
        </div>

        {/* Right Side */}
        <div className="hidden items-center gap-6 md:flex">

          {/* Cart */}
          <Link to="/cart" className="relative text-luxe-brown">
            <ShoppingBag size={21} />

            {cartCount > 0 && (
              <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-luxe-gold px-1 text-[10px] text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Logged In User */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 text-sm text-luxe-brown"
              >
                <User size={19} />
                <span>{user?.name}</span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-10 w-56 border border-[#e9e0d6] bg-white p-4 shadow-lg">

                  <p className="text-sm font-medium text-luxe-brown">
                    {user?.name}
                  </p>

                  <p className="mt-1 break-all text-xs text-luxe-muted">
                    {user?.email}
                  </p>

                  <Link
                    to="/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="mt-4 block border-t border-gray-200 pt-3 text-sm text-luxe-brown hover:text-luxe-gold"
                  >
                    My Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="mt-3 w-full text-left text-sm text-red-600"
                  >
                    Logout
                  </button>

                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-luxe-brown px-6 py-2.5 text-xs uppercase tracking-widest text-white hover:bg-[#624737]"
            >
              <span className="font-serif text-sm font-medium tracking-wide text-white">
                Login
              </span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-luxe-brown md:hidden"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-[#e9e0d6] bg-[#faf7f2] px-6 py-6 md:hidden">

          <div className="flex flex-col gap-5">

            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>

            <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
              Wishlist
            </Link>

            <Link to="/orders" onClick={() => setMenuOpen(false)}>
              Orders
            </Link>

            <Link to="/cart" onClick={() => setMenuOpen(false)}>
              Cart ({cartCount})
            </Link>

            {isLoggedIn ? (
              <>
                <div className="border-t border-[#e9e0d6] pt-4">
                  <p className="text-sm font-medium">
                    {user?.name}
                  </p>

                  <p className="mt-1 text-xs text-luxe-muted">
                    {user?.email}
                  </p>
                </div>

                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="text-luxe-brown"
                >
                  My Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-left text-sm text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-luxe-gold"
              >
                Login
              </Link>
            )}

          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;