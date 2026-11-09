import { useEffect, useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { User, MapPin, Save, ArrowLeft } from "lucide-react";

import {
  getUserById,
  updateUser,
} from "../services/userService";

import { updateUserProfile } from "../redux/authSlice";
import { useAuth } from "../hooks/useAuth";

function Profile() {
  const { user } = useAuth();

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [message, setMessage] = useState("");

  // Fetch the logged-in user's profile
  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userProfile", user?.id],
    queryFn: () => getUserById(user.id),
    enabled: Boolean(user?.id),
  });

  // Fill the form with existing profile information
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        address: profile.address || "",
        city: profile.city || "",
        pincode: profile.pincode || "",
      });
    }
  }, [profile]);

  // Update profile in JSON Server
  const updateMutation = useMutation({
    mutationFn: (updatedData) =>
      updateUser(user.id, updatedData),

    onSuccess: (updatedUser) => {
      const safeUser = {
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone || "",
        address: updatedUser.address || "",
        city: updatedUser.city || "",
        pincode: updatedUser.pincode || "",
      };

      // Update Redux and localStorage
      dispatch(updateUserProfile(safeUser));

      // Update React Query cache
      queryClient.setQueryData(
        ["userProfile", user.id],
        safeUser
      );

      setMessage("Your profile has been updated successfully.");
    },

    onError: () => {
      setMessage("Unable to update your profile. Please try again.");
    },
  });

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "phone" || name === "pincode") {
      if (!/^\d*$/.test(value)) {
        return;
      }

      if (name === "phone" && value.length > 10) {
        return;
      }

      if (name === "pincode" && value.length > 6) {
        return;
      }
    }

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (formData.phone && formData.phone.length !== 10) {
      setMessage("Phone number must contain 10 digits.");
      return;
    }

    if (formData.pincode && formData.pincode.length !== 6) {
      setMessage("PIN code must contain 6 digits.");
      return;
    }

    updateMutation.mutate({
      name: formData.name.trim(),
      phone: formData.phone,
      address: formData.address.trim(),
      city: formData.city.trim(),
      pincode: formData.pincode,
    });
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-luxe-cream">
        <p className="text-sm text-luxe-muted">
          Loading your profile...
        </p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-luxe-cream">
        <p className="text-sm text-red-600">
          Unable to load your profile. Please try again.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-luxe-cream px-5 py-12 md:px-10">
      <div className="mx-auto max-w-4xl">

        {/* Page heading */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-luxe-muted transition hover:text-luxe-gold"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <div className="mt-8 border-b border-[#e9e0d6] pb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-luxe-gold">
            Your Account
          </p>

          <h1 className="mt-3 text-3xl font-light text-luxe-brown md:text-4xl">
            My Profile
          </h1>

          <p className="mt-3 text-sm text-luxe-muted">
            Manage your personal information and delivery address.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">

          {/* Personal Information */}
          <section className="border border-[#e9e0d6] bg-white p-6 md:p-8">

            <div className="mb-7 flex items-center gap-3">
              <User size={21} className="text-luxe-gold" />

              <div>
                <h2 className="text-lg font-medium text-luxe-brown">
                  Personal Information
                </h2>

                <p className="mt-1 text-xs text-luxe-muted">
                  Your basic account details
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm text-luxe-brown">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-stone-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-luxe-gold"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-luxe-brown">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="w-full border border-stone-300 bg-stone-100 px-4 py-3 text-sm text-stone-500 outline-none"
                />

                <p className="mt-2 text-xs text-luxe-muted">
                  Email address cannot be changed here.
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-luxe-brown">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={10}
                  className="w-full border border-stone-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-luxe-gold"
                  placeholder="Enter your 10-digit phone number"
                />
              </div>

            </div>
          </section>

          {/* Delivery Address */}
          <section className="border border-[#e9e0d6] bg-white p-6 md:p-8">

            <div className="mb-7 flex items-center gap-3">
              <MapPin size={21} className="text-luxe-gold" />

              <div>
                <h2 className="text-lg font-medium text-luxe-brown">
                  Delivery Address
                </h2>

                <p className="mt-1 text-xs text-luxe-muted">
                  Save your address for faster checkout
                </p>
              </div>
            </div>

            <div className="space-y-5">

              <div>
                <label className="mb-2 block text-sm text-luxe-brown">
                  Street Address
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full resize-none border border-stone-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-luxe-gold"
                  placeholder="Enter your house number, street or area"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm text-luxe-brown">
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border border-stone-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-luxe-gold"
                    placeholder="Enter your city"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-luxe-brown">
                    PIN Code
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    maxLength={6}
                    className="w-full border border-stone-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-luxe-gold"
                    placeholder="Enter 6-digit PIN code"
                  />
                </div>

              </div>
            </div>
          </section>

          {/* Success or error message */}
          {message && (
            <p
              role="status"
              className={`text-sm ${
                message.includes("successfully")
                  ? "text-green-700"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          {/* Save button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="flex items-center justify-center gap-2 bg-luxe-brown px-8 py-4 text-sm uppercase tracking-widest text-white transition hover:bg-luxe-gold disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={17} />

              {updateMutation.isPending
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}

export default Profile;