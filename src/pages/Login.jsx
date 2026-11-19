
// // import { useState } from "react";
// // import { useMutation } from "@tanstack/react-query";
// // import { useLocation, useNavigate, Link } from "react-router-dom";
// // import { getUserByEmail } from "../services/userService";
// // import { useAuth } from "../hooks/useAuth";
// // import Button from "../components/Button";

// // function Login() {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const { signIn } = useAuth();

// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");

// //   const loginMutation = useMutation({
// //     mutationFn: async () => {
// //       const user = await getUserByEmail(email);

// //       if (!user || user.password !== password) {
// //         throw new Error("Invalid email or password");
// //       }

// //       return user;
// //     },

// //     onSuccess: (user) => {
// //       const { password, ...safeUser } = user;

// //       signIn(safeUser);

// //       const from = location.state?.from;

// //       navigate(from?.pathname || "/", {
// //         replace: true,
// //         state: from?.state,
// //       });
// //     },

// //     onError: (error) => {
// //       setError(error.message);
// //     },
// //   });

// //   function handleSubmit(e) {
// //     e.preventDefault();
// //     setError("");
// //     loginMutation.mutate();
// //   }

// //   return (
// //     <div className="flex min-h-screen items-center justify-center bg-luxe-cream px-5 py-12">
// //       <div className="grid w-full max-w-5xl overflow-hidden bg-white shadow-xl md:grid-cols-2">

// //         <div className="hidden min-h-[550px] bg-[#e9dfd2] md:flex items-center justify-center p-12">
// //           <div className="text-center">
// //             <p className="text-sm uppercase tracking-[5px] text-luxe-gold">
// //               Welcome to
// //             </p>
// //             <h1 className="mt-4 text-5xl font-light tracking-wide text-luxe-brown">
// //               LuxeSkin
// //             </h1>
// //             <p className="mt-5 text-sm leading-7 text-luxe-muted">
// //               Discover the beauty of caring for your skin.
// //             </p>
// //           </div>
// //         </div>

// //         <div className="flex items-center justify-center px-8 py-14 sm:px-12">
// //           <div className="w-full max-w-sm">
// //             <p className="text-xs uppercase tracking-[3px] text-luxe-gold">
// //               Welcome Back
// //             </p>

// //             <h2 className="mt-3 text-3xl font-light text-luxe-brown">
// //               Sign In
// //             </h2>

// //             <p className="mt-3 text-sm text-luxe-muted">
// //               Sign in to continue your skincare journey.
// //             </p>

// //             <form onSubmit={handleSubmit} className="mt-8 space-y-5">

// //               <div>
// //                 <label className="mb-2 block text-sm">Email Address</label>
// //                 <input
// //                   type="email"
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                   required
// //                   className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-luxe-gold"
// //                   placeholder="Enter your email"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="mb-2 block text-sm">Password</label>
// //                 <input
// //                   type="password"
// //                   value={password}
// //                   onChange={(e) => setPassword(e.target.value)}
// //                   required
// //                   className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-luxe-gold"
// //                   placeholder="Enter your password"
// //                 />
// //               </div>

// //               {error && (
// //                 <p className="text-sm text-red-600">{error}</p>
// //               )}

// //              <Button
// //   type="submit"
// //   disabled={loginMutation.isPending}
// //   className="w-full bg-luxe-brown py-3 text-sm uppercase tracking-widest text-white hover:bg-[#624737] disabled:opacity-50"
// // >
// //   {loginMutation.isPending ? "Signing In..." : "Sign In"}
// // </Button>

// //             </form>

// //             <p className="mt-6 text-center text-sm text-luxe-muted">
// //               Don't have an account?{" "}
// //               <Link
// //                 to="/register"
// //                 className="font-medium text-luxe-brown underline"
// //               >
// //                 Register
// //               </Link>
// //             </p>
// //           </div>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;



// // import { useState } from "react";
// // import { useMutation } from "@tanstack/react-query";
// // import { useLocation, useNavigate, Link } from "react-router-dom";

// // import { getUserByEmail } from "../services/userService";
// // import { useAuth } from "../hooks/useAuth";
// // import Button from "../components/Button";

// // function Login() {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const { signIn } = useAuth();

// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");

// //   const loginMutation = useMutation({
// //     mutationFn: async () => {
// //       const user = await getUserByEmail(email);

// //       if (!user || user.password !== password) {
// //         throw new Error("Invalid email or password");
// //       }

// //       return user;
// //     },

// //     onSuccess: (user) => {
// //       const { password, ...safeUser } = user;

// //       signIn(safeUser);

// //       const from = location.state?.from;

// //       navigate(from?.pathname || "/", {
// //         replace: true,
// //         state: from?.state,
// //       });
// //     },

// //     onError: (error) => {
// //       setError(error.message);
// //     },
// //   });

// //   function handleSubmit(e) {
// //     e.preventDefault();
// //     setError("");
// //     loginMutation.mutate();
// //   }

// //   return (
// //     <div className="flex min-h-screen items-center justify-center bg-luxe-cream px-4 py-8 sm:px-6 sm:py-12">
// //       <div className="grid w-full max-w-5xl overflow-hidden bg-white shadow-xl md:grid-cols-2">

// //         {/* Welcome Section - Desktop */}
// //         <div className="hidden min-h-[550px] items-center justify-center bg-[#e9dfd2] p-8 md:flex lg:p-12">
// //           <div className="text-center">
// //             <p className="text-xs uppercase tracking-[4px] text-luxe-gold lg:text-sm lg:tracking-[5px]">
// //               Welcome to
// //             </p>

// //             <h1 className="mt-4 text-4xl font-light tracking-wide text-luxe-brown lg:text-5xl">
// //               LuxeSkin
// //             </h1>

// //             <p className="mt-5 text-sm leading-7 text-luxe-muted">
// //               Discover the beauty of caring for your skin.
// //             </p>
// //           </div>
// //         </div>

// //         {/* Login Form */}
// //         <div className="flex items-center justify-center px-5 py-12 sm:px-10 sm:py-14 lg:px-12">
// //           <div className="w-full max-w-sm">

// //             {/* Welcome Section - Mobile */}
// //             <div className="mb-9 text-center md:hidden">
// //               <p className="text-xs uppercase tracking-[3px] text-luxe-gold">
// //                 Welcome to
// //               </p>

// //               <h1 className="mt-3 text-4xl font-light tracking-wide text-luxe-brown">
// //                 LuxeSkin
// //               </h1>

// //               <p className="mt-3 text-sm text-luxe-muted">
// //                 Discover the beauty of caring for your skin.
// //               </p>
// //             </div>

// //             <p className="text-[10px] uppercase tracking-[3px] text-luxe-gold sm:text-xs">
// //               Welcome Back
// //             </p>

// //             <h2 className="mt-3 text-3xl font-light text-luxe-brown sm:text-4xl">
// //               Sign In
// //             </h2>

// //             <p className="mt-3 text-sm leading-6 text-luxe-muted">
// //               Sign in to continue your skincare journey.
// //             </p>

// //             <form
// //               onSubmit={handleSubmit}
// //               className="mt-7 space-y-5 sm:mt-8"
// //             >

// //               <div>
// //                 <label className="mb-2 block text-sm text-luxe-brown">
// //                   Email Address
// //                 </label>

// //                 <input
// //                   type="email"
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                   required
// //                   className="w-full border border-gray-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-luxe-gold sm:px-4"
// //                   placeholder="Enter your email"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="mb-2 block text-sm text-luxe-brown">
// //                   Password
// //                 </label>

// //                 <input
// //                   type="password"
// //                   value={password}
// //                   onChange={(e) => setPassword(e.target.value)}
// //                   required
// //                   className="w-full border border-gray-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-luxe-gold sm:px-4"
// //                   placeholder="Enter your password"
// //                 />
// //               </div>

// //               {error && (
// //                 <p className="text-sm text-red-600">
// //                   {error}
// //                 </p>
// //               )}

// //               <Button
// //                 type="submit"
// //                 disabled={loginMutation.isPending}
// //                 className="w-full bg-luxe-brown py-3 text-xs uppercase tracking-widest text-white transition hover:bg-[#624737] disabled:opacity-50 sm:text-sm"
// //               >
// //                 {loginMutation.isPending
// //                   ? "Signing In..."
// //                   : "Sign In"}
// //               </Button>
             

// //             </form>

// //             <p className="mt-6 text-center text-xs text-luxe-muted sm:text-sm">
// //               Don't have an account?{" "}

// //               <Link
// //                 to="/register"
// //                 className="font-medium text-luxe-brown underline"
// //               >
// //                 Register
// //               </Link>
// //             </p>

// //           </div>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;




// // import { useState } from "react";
// // import { useMutation } from "@tanstack/react-query";
// // import { useLocation, useNavigate } from "react-router-dom";

// // import {
// //   getUserByEmail,
// //   registerUser,
// // } from "../services/userService";

// // import { useAuth } from "../hooks/useAuth";
// // import Button from "../components/Button";

// // // Change these to your chosen admin credentials
// // const ADMIN_EMAIL = "admin@luxeskin.com";
// // const ADMIN_PASSWORD = "ChangeThisAdminPassword123";

// // function Login() {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const { signIn } = useAuth();

// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");

// //   const loginMutation = useMutation({
// //     mutationFn: async () => {
// //       const enteredEmail = email.trim().toLowerCase();

// //       // 1. Check whether the credentials belong to the admin
// //       if (
// //         enteredEmail === ADMIN_EMAIL.toLowerCase() &&
// //         password === ADMIN_PASSWORD
// //       ) {
// //         return {
// //           id: "admin",
// //           name: "Admin",
// //           email: ADMIN_EMAIL,
// //           role: "admin",
// //         };
// //       }

// //       // 2. Check whether the customer already exists
// //       const existingUser = await getUserByEmail(enteredEmail);

// //       if (existingUser) {
// //         // Existing email: password must match
// //         if (existingUser.password !== password) {
// //           throw new Error("Invalid email or password");
// //         }

// //         const { password: savedPassword, ...safeUser } = existingUser;

// //         return {
// //           ...safeUser,
// //           role: existingUser.role || "customer",
// //         };
// //       }

// //       // 3. New email: automatically create a customer account
// //       const generatedName = enteredEmail
// //         .split("@")[0]
// //         .replace(/[._-]/g, " ");

// //       const newUser = await registerUser({
// //         name: generatedName,
// //         email: enteredEmail,
// //         password,
// //         role: "customer",
// //       });

// //       const { password: savedPassword, ...safeUser } = newUser;

// //       return safeUser;
// //     },

// //     onSuccess: (user) => {
// //       signIn(user);

// //       // Admin always goes to the admin dashboard
// //       if (user.role === "admin") {
// //         navigate("/admin", { replace: true });
// //         return;
// //       }

// //       // Customer goes to the originally requested page, if any
// //       const from = location.state?.from;

// //       navigate(from?.pathname || "/", {
// //         replace: true,
// //         state: from?.state,
// //       });
// //     },

// //     onError: (error) => {
// //       setError(error.message || "Something went wrong. Please try again.");
// //     },
// //   });

// //   function handleSubmit(e) {
// //     e.preventDefault();
// //     setError("");

// //     loginMutation.mutate();
// //   }

// //   return (
// //     <div className="flex min-h-screen items-center justify-center bg-luxe-cream px-4 py-8 sm:px-6 sm:py-12">
// //       <div className="grid w-full max-w-5xl overflow-hidden bg-white shadow-xl md:grid-cols-2">

// //         {/* Welcome Section - Desktop */}
// //         <div className="hidden min-h-[550px] items-center justify-center bg-[#e9dfd2] p-8 md:flex lg:p-12">
// //           <div className="text-center">
// //             <p className="text-xs uppercase tracking-[4px] text-luxe-gold lg:text-sm lg:tracking-[5px]">
// //               Welcome to
// //             </p>

// //             <h1 className="mt-4 text-4xl font-light tracking-wide text-luxe-brown lg:text-5xl">
// //               LuxeSkin
// //             </h1>

// //             <p className="mt-5 text-sm leading-7 text-luxe-muted">
// //               Discover the beauty of caring for your skin.
// //             </p>
// //           </div>
// //         </div>

// //         {/* Login Form */}
// //         <div className="flex items-center justify-center px-5 py-12 sm:px-10 sm:py-14 lg:px-12">
// //           <div className="w-full max-w-sm">

// //             {/* Welcome Section - Mobile */}
// //             <div className="mb-9 text-center md:hidden">
// //               <p className="text-xs uppercase tracking-[3px] text-luxe-gold">
// //                 Welcome to
// //               </p>

// //               <h1 className="mt-3 text-4xl font-light tracking-wide text-luxe-brown">
// //                 LuxeSkin
// //               </h1>

// //               <p className="mt-3 text-sm text-luxe-muted">
// //                 Discover the beauty of caring for your skin.
// //               </p>
// //             </div>

// //             <p className="text-[10px] uppercase tracking-[3px] text-luxe-gold sm:text-xs">
// //               Welcome Back
// //             </p>

// //             <h2 className="mt-3 text-3xl font-light text-luxe-brown sm:text-4xl">
// //               Sign In
// //             </h2>

// //             <p className="mt-3 text-sm leading-6 text-luxe-muted">
// //               Sign in to continue your skincare journey.
// //             </p>

// //             <form
// //               onSubmit={handleSubmit}
// //               className="mt-7 space-y-5 sm:mt-8"
// //             >
// //               <div>
// //                 <label className="mb-2 block text-sm text-luxe-brown">
// //                   Email Address
// //                 </label>

// //                 <input
// //                   type="email"
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                   required
// //                   className="w-full border border-gray-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-luxe-gold sm:px-4"
// //                   placeholder="Enter your email"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="mb-2 block text-sm text-luxe-brown">
// //                   Password
// //                 </label>

// //                 <input
// //                   type="password"
// //                   value={password}
// //                   onChange={(e) => setPassword(e.target.value)}
// //                   required
// //                   className="w-full border border-gray-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-luxe-gold sm:px-4"
// //                   placeholder="Enter your password"
// //                 />
// //               </div>

// //               {error && (
// //                 <p role="alert" className="text-sm text-red-600">
// //                   {error}
// //                 </p>
// //               )}

// //               <Button
// //                 type="submit"
// //                 disabled={loginMutation.isPending}
// //                 className="w-full bg-luxe-brown py-3 text-xs uppercase tracking-widest text-white transition hover:bg-[#624737] disabled:opacity-50 sm:text-sm"
// //               >
// //                 {loginMutation.isPending
// //                   ? "Signing In..."
// //                   : "Sign In"}
// //               </Button>
// //             </form>

// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;




// // import { useState } from "react";
// // import { useMutation } from "@tanstack/react-query";
// // import { useLocation, useNavigate } from "react-router-dom";

// // import { getUserByEmail } from "../services/userService";
// // import { useAuth } from "../hooks/useAuth";
// // import Button from "../components/Button";

// // // Demo admin credentials
// // const ADMIN_EMAIL = "admin@luxeskin.com";
// // const ADMIN_PASSWORD = "Admin@123";

// // function Login() {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const { signIn } = useAuth();

// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");

// //   const loginMutation = useMutation({
// //     mutationFn: async () => {
// //       const normalizedEmail = email.trim().toLowerCase();

// //       // 1. Check the admin account
// //       if (normalizedEmail === ADMIN_EMAIL.toLowerCase()) {
// //         if (password === ADMIN_PASSWORD) {
// //           return {
// //             id: "admin",
// //             name: "Admin",
// //             email: ADMIN_EMAIL,
// //             role: "admin",
// //           };
// //         }

// //         throw new Error("Invalid email or password");
// //       }

// //       // 2. Check whether the customer exists
// //       const user = await getUserByEmail(normalizedEmail);

// //       // 3. If the customer does not exist, redirect to registration
// //       if (!user) {
// //         navigate("/register", {
// //           state: { email: normalizedEmail },
// //         });

// //         return null;
// //       }

// //       // 4. Check existing customer's password
// //       if (user.password !== password) {
// //         throw new Error("Invalid email or password");
// //       }

// //       return {
// //         ...user,
// //         role: user.role || "customer",
// //       };
// //     },

// //     onSuccess: (user) => {
// //       if (!user) return;

// //       // Do not save the password in Redux or localStorage
// //       const { password, ...safeUser } = user;

// //       signIn(safeUser);

// //       // Admin goes directly to admin dashboard
// //       if (safeUser.role === "admin") {
// //         navigate("/admin", { replace: true });
// //         return;
// //       }

// //       // Customer goes to the original requested page
// //       const from = location.state?.from;

// //       navigate(from?.pathname || "/", {
// //         replace: true,
// //         state: from?.state,
// //       });
// //     },

// //     onError: (error) => {
// //       setError(error.message);
// //     },
// //   });

// //   function handleSubmit(e) {
// //     e.preventDefault();
// //     setError("");
// //     loginMutation.mutate();
// //   }

// //   return (
// //     <div className="flex min-h-screen items-center justify-center bg-luxe-cream px-4 py-8 sm:px-6 sm:py-12">
// //       <div className="grid w-full max-w-5xl overflow-hidden bg-white shadow-xl md:grid-cols-2">

// //         {/* Welcome Section - Desktop */}
// //         <div className="hidden min-h-[550px] items-center justify-center bg-[#e9dfd2] p-8 md:flex lg:p-12">
// //           <div className="text-center">
// //             <p className="text-xs uppercase tracking-[4px] text-luxe-gold lg:text-sm lg:tracking-[5px]">
// //               Welcome to
// //             </p>

// //             <h1 className="mt-4 text-4xl font-light tracking-wide text-luxe-brown lg:text-5xl">
// //               LuxeSkin
// //             </h1>

// //             <p className="mt-5 text-sm leading-7 text-luxe-muted">
// //               Discover the beauty of caring for your skin.
// //             </p>
// //           </div>
// //         </div>

// //         {/* Login Form */}
// //         <div className="flex items-center justify-center px-5 py-12 sm:px-10 sm:py-14 lg:px-12">
// //           <div className="w-full max-w-sm">

// //             {/* Welcome Section - Mobile */}
// //             <div className="mb-9 text-center md:hidden">
// //               <p className="text-xs uppercase tracking-[3px] text-luxe-gold">
// //                 Welcome to
// //               </p>

// //               <h1 className="mt-3 text-4xl font-light tracking-wide text-luxe-brown">
// //                 LuxeSkin
// //               </h1>

// //               <p className="mt-3 text-sm text-luxe-muted">
// //                 Discover the beauty of caring for your skin.
// //               </p>
// //             </div>

// //             <p className="text-[10px] uppercase tracking-[3px] text-luxe-gold sm:text-xs">
// //               Welcome Back
// //             </p>

// //             <h2 className="mt-3 text-3xl font-light text-luxe-brown sm:text-4xl">
// //               Sign In
// //             </h2>

// //             <p className="mt-3 text-sm leading-6 text-luxe-muted">
// //               Sign in to continue your skincare journey.
// //             </p>

// //             <form
// //               onSubmit={handleSubmit}
// //               className="mt-7 space-y-5 sm:mt-8"
// //             >
// //               <div>
// //                 <label className="mb-2 block text-sm text-luxe-brown">
// //                   Email Address
// //                 </label>

// //                 <input
// //                   type="email"
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                   required
// //                   className="w-full border border-gray-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-luxe-gold sm:px-4"
// //                   placeholder="Enter your email"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="mb-2 block text-sm text-luxe-brown">
// //                   Password
// //                 </label>

// //                 <input
// //                   type="password"
// //                   value={password}
// //                   onChange={(e) => setPassword(e.target.value)}
// //                   required
// //                   className="w-full border border-gray-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-luxe-gold sm:px-4"
// //                   placeholder="Enter your password"
// //                 />
// //               </div>

// //               {error && (
// //                 <p role="alert" className="text-sm text-red-600">
// //                   {error}
// //                 </p>
// //               )}

// //               <Button
// //                 type="submit"
// //                 disabled={loginMutation.isPending}
// //                 className="w-full bg-luxe-brown py-3 text-xs uppercase tracking-widest text-white transition hover:bg-[#624737] disabled:opacity-50 sm:text-sm"
// //               >
// //                 {loginMutation.isPending
// //                   ? "Signing In..."
// //                   : "Sign In"}
// //               </Button>
// //             </form>

// //           </div>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;



// import { useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { useNavigate, Link } from "react-router-dom";

// import { getUserByEmail } from "../services/userService";
// import { useAuth } from "../hooks/useAuth";
// import Button from "../components/Button";

// const ADMIN_EMAIL = "admin@luxeskin.com";
// const ADMIN_PASSWORD = "Admin@123";

// function Login() {
//   const navigate = useNavigate();
//   const { signIn } = useAuth();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const loginMutation = useMutation({
//     mutationFn: async () => {
//       const normalizedEmail = email.trim().toLowerCase();

//       // 1. Admin login
//       if (normalizedEmail === ADMIN_EMAIL.toLowerCase()) {
//         if (password === ADMIN_PASSWORD) {
//           return {
//             id: "admin",
//             name: "Admin",
//             email: ADMIN_EMAIL,
//             role: "admin",
//           };
//         }

//         throw new Error("Invalid email or password.");
//       }

//       // 2. Find existing customer
//       const user = await getUserByEmail(normalizedEmail);

//       // 3. Customer does not exist
//       if (!user) {
//         throw new Error(
//           "Account not found. Please register to continue."
//         );
//       }

//       // 4. Check customer password
//       if (user.password !== password) {
//         throw new Error("Invalid email or password.");
//       }

//       return {
//         ...user,
//         role: user.role || "customer",
//       };
//     },

//     onSuccess: (user) => {
//       // Remove password before saving user information
//       const { password, ...safeUser } = user;

//       signIn(safeUser);

//       // Admin goes to admin dashboard
//       if (safeUser.role === "admin") {
//         navigate("/admin", { replace: true });
//         return;
//       }

//       // Customer goes to home page
//       navigate("/", { replace: true });
//     },

//     onError: (error) => {
//       setError(error.message);
//     },
//   });

//   function handleSubmit(e) {
//     e.preventDefault();
//     setError("");
//     loginMutation.mutate();
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-luxe-cream px-4 py-8 sm:px-6 sm:py-12">
//       <div className="grid w-full max-w-5xl overflow-hidden bg-white shadow-xl md:grid-cols-2">

//         {/* Welcome Section - Desktop */}
//         <div className="hidden min-h-[550px] items-center justify-center bg-[#e9dfd2] p-8 md:flex lg:p-12">
//           <div className="text-center">
//             <p className="text-xs uppercase tracking-[4px] text-luxe-gold lg:text-sm lg:tracking-[5px]">
//               Welcome to
//             </p>

//             <h1 className="mt-4 text-4xl font-light tracking-wide text-luxe-brown lg:text-5xl">
//               LuxeSkin
//             </h1>

//             <p className="mt-5 text-sm leading-7 text-luxe-muted">
//               Discover the beauty of caring for your skin.
//             </p>
//           </div>
//         </div>

//         {/* Login Form */}
//         <div className="flex items-center justify-center px-5 py-12 sm:px-10 sm:py-14 lg:px-12">
//           <div className="w-full max-w-sm">

//             {/* Welcome Section - Mobile */}
//             <div className="mb-9 text-center md:hidden">
//               <p className="text-xs uppercase tracking-[3px] text-luxe-gold">
//                 Welcome to
//               </p>

//               <h1 className="mt-3 text-4xl font-light tracking-wide text-luxe-brown">
//                 LuxeSkin
//               </h1>

//               <p className="mt-3 text-sm text-luxe-muted">
//                 Discover the beauty of caring for your skin.
//               </p>
//             </div>

//             <p className="text-[10px] uppercase tracking-[3px] text-luxe-gold sm:text-xs">
//               Welcome Back
//             </p>

//             <h2 className="mt-3 text-3xl font-light text-luxe-brown sm:text-4xl">
//               Sign In
//             </h2>

//             <p className="mt-3 text-sm leading-6 text-luxe-muted">
//               Sign in to continue your skincare journey.
//             </p>

//             <form
//               onSubmit={handleSubmit}
//               className="mt-7 space-y-5 sm:mt-8"
//             >
//               <div>
//                 <label className="mb-2 block text-sm text-luxe-brown">
//                   Email Address
//                 </label>

//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="w-full border border-gray-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-luxe-gold sm:px-4"
//                   placeholder="Enter your email"
//                 />
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm text-luxe-brown">
//                   Password
//                 </label>

//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="w-full border border-gray-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-luxe-gold sm:px-4"
//                   placeholder="Enter your password"
//                 />
//               </div>

//               {error && (
//                 <p role="alert" className="text-sm text-red-600">
//                   {error}
//                 </p>
//               )}

//               <Button
//                 type="submit"
//                 disabled={loginMutation.isPending}
//                 className="w-full bg-luxe-brown py-3 text-xs uppercase tracking-widest text-white transition hover:bg-[#624737] disabled:opacity-50 sm:text-sm"
//               >
//                 {loginMutation.isPending
//                   ? "Signing In..."
//                   : "Sign In"}
//               </Button>
//             </form>

//             {/* Registration Option */}
//             <p className="mt-6 text-center text-xs text-luxe-muted sm:text-sm">
//               Don't have an account?{" "}

//               <Link
//                 to="/register"
//                 className="font-medium text-luxe-brown underline"
//               >
//                 Register
//               </Link>
//             </p>

//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Login;




import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";

import { getUserByEmail } from "../services/userService";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/Button";

function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginMutation = useMutation({
    mutationFn: async () => {
      const normalizedEmail = email.trim().toLowerCase();

      // 1. Find customer in JSON Server
      const user = await getUserByEmail(normalizedEmail);

      // 2. Check whether account exists
      if (!user) {
        throw new Error(
          "Account not found. Please register to continue."
        );
      }

      // 3. Check password
      if (user.password !== password) {
        throw new Error("Invalid email or password.");
      }

      // 4. Check whether account is blocked
      if (user.isBlocked) {
        throw new Error("Your account has been blocked.");
      }

      // 5. Remove password before storing user in Redux
      const { password: removedPassword, ...safeUser } = user;

      return {
        ...safeUser,
        role: "customer",
      };
    },

    onSuccess: (user) => {
      // Store logged-in customer in Redux
      signIn(user);

      // Navigate to customer home page
      navigate("/", { replace: true });
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
    <div className="flex min-h-screen items-center justify-center bg-luxe-cream px-4 py-8 sm:px-6 sm:py-12">
      <div className="grid w-full max-w-5xl overflow-hidden bg-white shadow-xl md:grid-cols-2">

        {/* Welcome Section - Desktop */}
        <div className="hidden min-h-[550px] items-center justify-center bg-[#e9dfd2] p-8 md:flex lg:p-12">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[4px] text-luxe-gold lg:text-sm lg:tracking-[5px]">
              Welcome to
            </p>

            <h1 className="mt-4 text-4xl font-light tracking-wide text-luxe-brown lg:text-5xl">
              LuxeSkin
            </h1>

            <p className="mt-5 text-sm leading-7 text-luxe-muted">
              Discover the beauty of caring for your skin.
            </p>
          </div>
        </div>

        {/* Login Form */}
        <div className="flex items-center justify-center px-5 py-12 sm:px-10 sm:py-14 lg:px-12">
          <div className="w-full max-w-sm">

            {/* Welcome Section - Mobile */}
            <div className="mb-9 text-center md:hidden">
              <p className="text-xs uppercase tracking-[3px] text-luxe-gold">
                Welcome to
              </p>

              <h1 className="mt-3 text-4xl font-light tracking-wide text-luxe-brown">
                LuxeSkin
              </h1>

              <p className="mt-3 text-sm text-luxe-muted">
                Discover the beauty of caring for your skin.
              </p>
            </div>

            <p className="text-[10px] uppercase tracking-[3px] text-luxe-gold sm:text-xs">
              Welcome Back
            </p>

            <h2 className="mt-3 text-3xl font-light text-luxe-brown sm:text-4xl">
              Sign In
            </h2>

            <p className="mt-3 text-sm leading-6 text-luxe-muted">
              Sign in to continue your skincare journey.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5 sm:mt-8"
            >
              <div>
                <label className="mb-2 block text-sm text-luxe-brown">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-gray-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-luxe-gold sm:px-4"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-luxe-brown">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-gray-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-luxe-gold sm:px-4"
                  placeholder="Enter your password"
                />
              </div>

              {error && (
                <p role="alert" className="text-sm text-red-600">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full bg-luxe-brown py-3 text-xs uppercase tracking-widest text-white transition hover:bg-[#624737] disabled:opacity-50 sm:text-sm"
              >
                {loginMutation.isPending
                  ? "Signing In..."
                  : "Sign In"}
              </Button>
            </form>

            {/* Registration Option */}
            <p className="mt-6 text-center text-xs text-luxe-muted sm:text-sm">
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
