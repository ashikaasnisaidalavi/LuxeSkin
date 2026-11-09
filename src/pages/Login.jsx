
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { getUserByEmail } from "../services/userService";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginMutation = useMutation({
    mutationFn: async () => {
      const user = await getUserByEmail(email);

      if (!user || user.password !== password) {
        throw new Error("Invalid email or password");
      }

      return user;
    },

    onSuccess: (user) => {
      const { password, ...safeUser } = user;

      signIn(safeUser);

      const from = location.state?.from;

      navigate(from?.pathname || "/", {
        replace: true,
        state: from?.state,
      });
    },

    onError: (error) => {
      setError(error.message);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    loginMutation.mutate();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-luxe-cream px-5 py-12">
      <div className="grid w-full max-w-5xl overflow-hidden bg-white shadow-xl md:grid-cols-2">

        <div className="hidden min-h-[550px] bg-[#e9dfd2] md:flex items-center justify-center p-12">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[5px] text-luxe-gold">
              Welcome to
            </p>
            <h1 className="mt-4 text-5xl font-light tracking-wide text-luxe-brown">
              LuxeSkin
            </h1>
            <p className="mt-5 text-sm leading-7 text-luxe-muted">
              Discover the beauty of caring for your skin.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center px-8 py-14 sm:px-12">
          <div className="w-full max-w-sm">
            <p className="text-xs uppercase tracking-[3px] text-luxe-gold">
              Welcome Back
            </p>

            <h2 className="mt-3 text-3xl font-light text-luxe-brown">
              Sign In
            </h2>

            <p className="mt-3 text-sm text-luxe-muted">
              Sign in to continue your skincare journey.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">

              <div>
                <label className="mb-2 block text-sm">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-luxe-gold"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-luxe-gold"
                  placeholder="Enter your password"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full bg-luxe-brown py-3 text-sm uppercase tracking-widest text-white hover:bg-[#624737] disabled:opacity-50"
              >
                {loginMutation.isPending ? "Signing In..." : "Sign In"}
              </button>

            </form>

            <p className="mt-6 text-center text-sm text-luxe-muted">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-luxe-brown underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
