
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ArrowRight, Sparkles } from "lucide-react";
// import Button from "../components/Button";

// import {
//   getUserByEmail,
//   registerUser,
// } from "../services/userService";

// export default function Register() {
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function handleRegister(e) {
//     e.preventDefault();
//     setError("");

//     try {
//       setLoading(true);

//       const existingUser = await getUserByEmail(email.trim());

//       if (existingUser) {
//         setError("This email is already registered.");
//         return;
//       }

//       await registerUser({
//         name: name.trim(),
//         email: email.trim(),
//         password,
//       });

//       navigate("/login");
//     } catch {
//       setError("Registration failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <main className="min-h-screen bg-luxe-cream px-5 py-10 md:px-10 md:py-16">
//       <div className="mx-auto grid max-w-6xl overflow-hidden border border-stone-200 bg-white/50 md:grid-cols-2">
//         {/* Image section */}
//         <div className="relative hidden min-h-[650px] md:block">
//           <img
//             src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1000&q=85"
//             alt="Luxury skincare products"
//             className="absolute inset-0 h-full w-full object-cover"
//           />

//           <div className="absolute inset-0 bg-stone-900/25" />

//           <div className="absolute bottom-10 left-10 right-10 text-white">
//             <Sparkles size={24} strokeWidth={1.5} />

//             <p className="mt-5 text-xs uppercase tracking-[0.3em]">
//               Discover your ritual
//             </p>

//             <h2 className="mt-4 text-4xl font-light leading-snug">
//               Your skin deserves
//               <br />
//               a little more love.
//             </h2>

//             <p className="mt-4 max-w-sm text-sm leading-6 text-white/85">
//               Thoughtful skincare for the moments you make time for yourself.
//             </p>
//           </div>
//         </div>

//         {/* Registration form */}
//         <div className="flex items-center justify-center px-6 py-12 sm:px-12 lg:px-16">
//           <div className="w-full max-w-md">
//             <Link
//               to="/"
//               className="text-xs uppercase tracking-[0.3em] text-luxe-gold"
//             >
//               LUXESKIN
//             </Link>

//             <h1 className="mt-8 text-3xl font-light text-luxe-brown sm:text-4xl">
//               Create your account
//             </h1>

//             <p className="mt-4 text-sm leading-6 text-luxe-muted">
//               Join LuxeSkin and begin your personalized skincare journey.
//             </p>

//             <form onSubmit={handleRegister} className="mt-9 space-y-5">
//               <div>
//                 <label
//                   htmlFor="name"
//                   className="mb-2 block text-sm text-luxe-brown"
//                 >
//                   Full name
//                 </label>

//                 <input
//                   id="name"
//                   type="text"
//                   autoComplete="name"
//                   placeholder="Enter your full name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                   className="w-full border border-stone-300 bg-transparent px-4 py-3 text-sm outline-none transition placeholder:text-stone-400 focus:border-luxe-gold focus:ring-1 focus:ring-luxe-gold"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="email"
//                   className="mb-2 block text-sm text-luxe-brown"
//                 >
//                   Email address
//                 </label>

//                 <input
//                   id="email"
//                   type="email"
//                   autoComplete="email"
//                   placeholder="you@example.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="w-full border border-stone-300 bg-transparent px-4 py-3 text-sm outline-none transition placeholder:text-stone-400 focus:border-luxe-gold focus:ring-1 focus:ring-luxe-gold"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="password"
//                   className="mb-2 block text-sm text-luxe-brown"
//                 >
//                   Password
//                 </label>

//                 <input
//                   id="password"
//                   type="password"
//                   autoComplete="new-password"
//                   placeholder="Create a password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   minLength={6}
//                   className="w-full border border-stone-300 bg-transparent px-4 py-3 text-sm outline-none transition placeholder:text-stone-400 focus:border-luxe-gold focus:ring-1 focus:ring-luxe-gold"
//                 />

//                 <p className="mt-2 text-xs text-luxe-muted">
//                   Use at least 6 characters.
//                 </p>
//               </div>

//               {error && (
//                 <p role="alert" className="text-sm text-red-700">
//                   {error}
//                 </p>
//               )}

//               <Button
//   type="submit"
//   disabled={loading}
//   className="flex w-full items-center justify-center gap-2 bg-luxe-brown px-6 py-4 text-sm text-white transition hover:bg-luxe-gold disabled:cursor-not-allowed disabled:opacity-60"
// >
//   {loading ? "Creating account..." : "Create Account"}

//   {!loading && <ArrowRight size={17} />}
// </Button>
//             </form>

//             <p className="mt-7 text-center text-sm text-luxe-muted">
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="font-medium text-luxe-brown underline underline-offset-4 hover:text-luxe-gold"
//               >
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }


// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ArrowRight, Sparkles } from "lucide-react";
// import Button from "../components/Button";

// import {
//   getUserByEmail,
//   registerUser,
// } from "../services/userService";

// export default function Register() {
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function handleRegister(e) {
//     e.preventDefault();
//     setError("");

//     try {
//       setLoading(true);

//       const existingUser = await getUserByEmail(email.trim());

//       if (existingUser) {
//         setError("This email is already registered.");
//         return;
//       }

//       await registerUser({
//         name: name.trim(),
//         email: email.trim(),
//         password,
//       });

//       navigate("/login");
//     } catch {
//       setError("Registration failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <main className="min-h-screen bg-luxe-cream px-4 py-8 sm:px-8 sm:py-12 md:px-10 md:py-16">
//       <div className="mx-auto grid max-w-6xl overflow-hidden border border-stone-200 bg-white/50 md:grid-cols-2">

//         {/* Image Section - Desktop */}
//         <div className="relative hidden min-h-[600px] md:block lg:min-h-[650px]">
//           <img
//             src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1000&q=85"
//             alt="Luxury skincare products"
//             className="absolute inset-0 h-full w-full object-cover"
//           />

//           <div className="absolute inset-0 bg-stone-900/25" />

//           <div className="absolute bottom-8 left-8 right-8 text-white lg:bottom-10 lg:left-10 lg:right-10">
//             <Sparkles size={24} strokeWidth={1.5} />

//             <p className="mt-5 text-xs uppercase tracking-[0.3em]">
//               Discover your ritual
//             </p>

//             <h2 className="mt-4 text-3xl font-light leading-snug lg:text-4xl">
//               Your skin deserves
//               <br />
//               a little more love.
//             </h2>

//             <p className="mt-4 max-w-sm text-sm leading-6 text-white/85">
//               Thoughtful skincare for the moments you make time for yourself.
//             </p>
//           </div>
//         </div>

//         {/* Registration Form */}
//         <div className="flex items-center justify-center px-5 py-10 sm:px-10 sm:py-12 lg:px-16">
//           <div className="w-full max-w-md">

//             {/* Mobile Brand Section */}
//             <div className="mb-8 text-center md:hidden">
//               <Sparkles
//                 size={22}
//                 strokeWidth={1.5}
//                 className="mx-auto text-luxe-gold"
//               />

//               <p className="mt-3 text-xs uppercase tracking-[0.3em] text-luxe-gold">
//                 Discover your ritual
//               </p>

//               <h2 className="mt-3 text-3xl font-light text-luxe-brown">
//                 Your skin deserves a little more love.
//               </h2>
//             </div>

//             <Link
//               to="/"
//               className="text-xs uppercase tracking-[0.3em] text-luxe-gold"
//             >
//               LUXESKIN
//             </Link>

//             <h1 className="mt-6 text-3xl font-light text-luxe-brown sm:mt-8 sm:text-4xl">
//               Create your account
//             </h1>

//             <p className="mt-3 text-sm leading-6 text-luxe-muted sm:mt-4">
//               Join LuxeSkin and begin your personalized skincare journey.
//             </p>

//             <form
//               onSubmit={handleRegister}
//               className="mt-7 space-y-4 sm:mt-9 sm:space-y-5"
//             >
//               <div>
//                 <label
//                   htmlFor="name"
//                   className="mb-2 block text-sm text-luxe-brown"
//                 >
//                   Full name
//                 </label>

//                 <input
//                   id="name"
//                   type="text"
//                   autoComplete="name"
//                   placeholder="Enter your full name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                   className="w-full border border-stone-300 bg-transparent px-3 py-3 text-sm outline-none transition placeholder:text-stone-400 focus:border-luxe-gold focus:ring-1 focus:ring-luxe-gold sm:px-4"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="email"
//                   className="mb-2 block text-sm text-luxe-brown"
//                 >
//                   Email address
//                 </label>

//                 <input
//                   id="email"
//                   type="email"
//                   autoComplete="email"
//                   placeholder="you@example.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="w-full border border-stone-300 bg-transparent px-3 py-3 text-sm outline-none transition placeholder:text-stone-400 focus:border-luxe-gold focus:ring-1 focus:ring-luxe-gold sm:px-4"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="password"
//                   className="mb-2 block text-sm text-luxe-brown"
//                 >
//                   Password
//                 </label>

//                 <input
//                   id="password"
//                   type="password"
//                   autoComplete="new-password"
//                   placeholder="Create a password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   minLength={6}
//                   className="w-full border border-stone-300 bg-transparent px-3 py-3 text-sm outline-none transition placeholder:text-stone-400 focus:border-luxe-gold focus:ring-1 focus:ring-luxe-gold sm:px-4"
//                 />

//                 <p className="mt-2 text-xs text-luxe-muted">
//                   Use at least 6 characters.
//                 </p>
//               </div>

//               {error && (
//                 <p role="alert" className="text-sm text-red-700">
//                   {error}
//                 </p>
//               )}

//               <Button
//                 type="submit"
//                 disabled={loading}
//                 className="flex w-full items-center justify-center gap-2 bg-luxe-brown px-5 py-3.5 text-sm text-white transition hover:bg-luxe-gold disabled:cursor-not-allowed disabled:opacity-60 sm:px-6 sm:py-4"
//               >
//                 {loading ? "Creating account..." : "Create Account"}

//                 {!loading && <ArrowRight size={17} />}
//               </Button>
//             </form>

//             <p className="mt-6 text-center text-xs text-luxe-muted sm:mt-7 sm:text-sm">
//               Already have an account?{" "}

//               <Link
//                 to="/login"
//                 className="font-medium text-luxe-brown underline underline-offset-4 hover:text-luxe-gold"
//               >
//                 Sign in
//               </Link>
//             </p>

//           </div>
//         </div>

//       </div>
//     </main>
//   );
// }




import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import Button from "../components/Button";

import {
  getUserByEmail,
  registerUser,
} from "../services/userService";

const ADMIN_EMAIL = "admin@luxeskin.com";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    try {
      setLoading(true);

      // Prevent registration using the reserved admin email
      if (normalizedEmail === ADMIN_EMAIL.toLowerCase()) {
        setError("This email is reserved for the administrator.");
        return;
      }

      // Check whether the email already exists
      const existingUser = await getUserByEmail(normalizedEmail);

      if (existingUser) {
        setError("This email is already registered. Please sign in.");
        return;
      }

      // Create customer account
      await registerUser({
        name: name.trim(),
        email: normalizedEmail,
        password,
        role: "customer",
      });

      // Return to login after successful registration
      navigate("/login", {
        replace: true,
        state: { email: normalizedEmail },
      });

    } catch (error) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-luxe-cream px-4 py-8 sm:px-8 sm:py-12 md:px-10 md:py-16">
      <div className="mx-auto grid max-w-6xl overflow-hidden border border-stone-200 bg-white/50 md:grid-cols-2">

        {/* Image Section - Desktop */}
        <div className="relative hidden min-h-[600px] md:block lg:min-h-[650px]">
          <img
            src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1000&q=85"
            alt="Luxury skincare products"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-stone-900/25" />

          <div className="absolute bottom-8 left-8 right-8 text-white lg:bottom-10 lg:left-10 lg:right-10">
            <Sparkles size={24} strokeWidth={1.5} />

            <p className="mt-5 text-xs uppercase tracking-[0.3em]">
              Discover your ritual
            </p>

            <h2 className="mt-4 text-3xl font-light leading-snug lg:text-4xl">
              Your skin deserves
              <br />
              a little more love.
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-6 text-white/85">
              Thoughtful skincare for the moments you make time for yourself.
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <div className="flex items-center justify-center px-5 py-10 sm:px-10 sm:py-12 lg:px-16">
          <div className="w-full max-w-md">

            {/* Mobile Brand Section */}
            <div className="mb-8 text-center md:hidden">
              <Sparkles
                size={22}
                strokeWidth={1.5}
                className="mx-auto text-luxe-gold"
              />

              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-luxe-gold">
                Discover your ritual
              </p>

              <h2 className="mt-3 text-3xl font-light text-luxe-brown">
                Your skin deserves a little more love.
              </h2>
            </div>

            <Link
              to="/"
              className="text-xs uppercase tracking-[0.3em] text-luxe-gold"
            >
              LUXESKIN
            </Link>

            <h1 className="mt-6 text-3xl font-light text-luxe-brown sm:mt-8 sm:text-4xl">
              Create your account
            </h1>

            <p className="mt-3 text-sm leading-6 text-luxe-muted sm:mt-4">
              Join LuxeSkin and begin your personalized skincare journey.
            </p>

            <form
              onSubmit={handleRegister}
              className="mt-7 space-y-4 sm:mt-9 sm:space-y-5"
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm text-luxe-brown"
                >
                  Full name
                </label>

                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border border-stone-300 bg-transparent px-3 py-3 text-sm outline-none transition placeholder:text-stone-400 focus:border-luxe-gold focus:ring-1 focus:ring-luxe-gold sm:px-4"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm text-luxe-brown"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-stone-300 bg-transparent px-3 py-3 text-sm outline-none transition placeholder:text-stone-400 focus:border-luxe-gold focus:ring-1 focus:ring-luxe-gold sm:px-4"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm text-luxe-brown"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full border border-stone-300 bg-transparent px-3 py-3 text-sm outline-none transition placeholder:text-stone-400 focus:border-luxe-gold focus:ring-1 focus:ring-luxe-gold sm:px-4"
                />

                <p className="mt-2 text-xs text-luxe-muted">
                  Use at least 6 characters.
                </p>
              </div>

              {error && (
                <p role="alert" className="text-sm text-red-700">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 bg-luxe-brown px-5 py-3.5 text-sm text-white transition hover:bg-luxe-gold disabled:cursor-not-allowed disabled:opacity-60 sm:px-6 sm:py-4"
              >
                {loading ? "Creating account..." : "Create Account"}

                {!loading && <ArrowRight size={17} />}
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-luxe-muted sm:mt-7 sm:text-sm">
              Already have an account?{" "}

              <Link
                to="/login"
                className="font-medium text-luxe-brown underline underline-offset-4 hover:text-luxe-gold"
              >
                Sign in
              </Link>
            </p>

          </div>
        </div>

      </div>
    </main>
  );
}
