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
import Button from "./Button";

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

  function closeMobileMenu() {
    setMenuOpen(false);
  }

  const navLinkClass = ({ isActive }) =>
    `text-sm tracking-wide transition hover:text-luxe-gold ${
      isActive ? "text-luxe-gold" : "text-luxe-brown"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[#e9e0d6] bg-[#faf7f2]">

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="shrink-0 text-xl font-light tracking-[3px] text-luxe-brown sm:text-2xl sm:tracking-[4px]"
        >
          LUXESKIN
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex lg:gap-9">

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

        {/* Desktop Right Side */}
        <div className="hidden items-center gap-4 md:flex lg:gap-6">

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-luxe-brown"
          >
            <ShoppingBag size={21} />

            {cartCount > 0 && (
              <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-luxe-gold px-1 text-[10px] text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Menu */}
          {isLoggedIn ? (
            <div className="relative">

              <Button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 text-sm text-luxe-brown"
              >
                <User size={19} />
                <span>{user?.name}</span>
              </Button>

              {userMenuOpen && (
                <div className="absolute right-0 top-10 z-50 w-56 border border-[#e9e0d6] bg-white p-4 shadow-lg">

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

                  <Button
                    type="button"
                    onClick={handleLogout}
                    className="mt-3 w-full text-left text-sm text-red-600"
                  >
                    Logout
                  </Button>

                </div>
              )}
            </div>
          ) : (
            // <Link
            //   to="/login"
            //   className="bg-luxe-brown px-5 py-2.5 text-xs uppercase tracking-widest text-white transition hover:bg-[#624737] lg:px-6"
            // >
            //   Login
            // </Link>
            <Button
  to="/login"
  className="px-5 py-2.5 text-xs uppercase tracking-widest transition lg:px-6"
  style={{
    backgroundColor: "#5b3928",
    color: "#ffffff",
    fontWeight: "600",
  }}
>
  Login
</Button>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex items-center justify-center text-luxe-brown md:hidden"
        >
          {menuOpen ? (
            <X size={25} />
          ) : (
            <Menu size={25} />
          )}
        </button>

      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-[#e9e0d6] bg-[#faf7f2] px-5 py-6 sm:px-6 md:hidden">

          <div className="mx-auto flex max-w-7xl flex-col gap-5">

            <Link
              to="/"
              onClick={closeMobileMenu}
              className="text-sm text-luxe-brown transition hover:text-luxe-gold"
            >
              Home
            </Link>

            <Link
              to="/wishlist"
              onClick={closeMobileMenu}
              className="text-sm text-luxe-brown transition hover:text-luxe-gold"
            >
              Wishlist
            </Link>

            <Link
              to="/orders"
              onClick={closeMobileMenu}
              className="text-sm text-luxe-brown transition hover:text-luxe-gold"
            >
              Orders
            </Link>

            <Link
              to="/cart"
              onClick={closeMobileMenu}
              className="text-sm text-luxe-brown transition hover:text-luxe-gold"
            >
              Cart ({cartCount})
            </Link>

            {isLoggedIn ? (
              <>

                <div className="border-t border-[#e9e0d6] pt-4">

                  <p className="text-sm font-medium text-luxe-brown">
                    {user?.name}
                  </p>

                  <p className="mt-1 break-all text-xs text-luxe-muted">
                    {user?.email}
                  </p>

                </div>

                <Link
                  to="/profile"
                  onClick={closeMobileMenu}
                  className="text-sm text-luxe-brown transition hover:text-luxe-gold"
                >
                  My Profile
                </Link>

                <Button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left text-sm text-red-600"
                >
                  Logout
                </Button>

              </>
            ) : (
              // <Link
              //   to="/login"
              //   onClick={closeMobileMenu}
              //   className="inline-block w-fit bg-luxe-brown px-6 py-3 text-xs uppercase tracking-widest text-white transition hover:bg-[#624737]"
              // >
              //   Login
              // </Link>
              <Button
  to="/login"
  onClick={closeMobileMenu}
  className="w-fit px-6 py-3 text-xs uppercase tracking-widest transition"
  style={{
    backgroundColor: "#5b3928",
    color: "#ffffff",
    fontWeight: "600",
  }}
>
  Login
</Button>
            )}

          </div>
        </div>
      )}

    </header>
  );
}

export default Navbar;
