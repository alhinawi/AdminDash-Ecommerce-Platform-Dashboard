import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { X, User as UserIcon, Mail, Globe } from "lucide-react";
import type { User } from "../../types/user";

interface UserFormModalProps {
  isOpen: boolean;
  userToEdit: User | null;
  onClose: () => void;
  onSubmit: (user: Partial<User>) => void;
}

export default function UserFormModal({
  isOpen,
  userToEdit,
  onClose,
  onSubmit,
}: UserFormModalProps) {
  const [formData, setFormData] = useState<Partial<User>>(() => {
    if (userToEdit) {
      return {
        fullName: userToEdit.fullName,
        email: userToEdit.email,
        country: userToEdit.country,
        role: userToEdit.role,
        plan: userToEdit.plan,
        status: userToEdit.status,
      };
    }
    return {
      fullName: "",
      email: "",
      country: "United States",
      role: "User",
      plan: "Free",
      status: "Active",
    };
  });

  const [errors, setErrors] = useState<{ fullName?: string; email?: string }>({});

  if (!isOpen) return null;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: { fullName?: string; email?: string } = {};

    if (!formData.fullName?.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.email?.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address format";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden z-10">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
              <UserIcon className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {userToEdit ? "Edit User Account" : "Add New User"}
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {userToEdit
                  ? `Update configuration for ${userToEdit.fullName}`
                  : "Provision a new team member or user account"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                <UserIcon className="w-4 h-4" />
              </div>
              <input
                type="text"
                name="fullName"
                value={formData.fullName || ""}
                onChange={handleChange}
                placeholder="e.g. Alex Morgan"
                className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all ${
                  errors.fullName
                    ? "border-rose-500"
                    : "border-zinc-200 dark:border-zinc-700"
                }`}
              />
            </div>
            {errors.fullName && (
              <p className="mt-1 text-xs text-rose-500">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                placeholder="alex.morgan@company.com"
                className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all ${
                  errors.email
                    ? "border-rose-500"
                    : "border-zinc-200 dark:border-zinc-700"
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-rose-500">{errors.email}</p>
            )}
          </div>

          {/* Country */}
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Country
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                <Globe className="w-4 h-4" />
              </div>
              <input
                type="text"
                name="country"
                value={formData.country || ""}
                onChange={handleChange}
                placeholder="United States"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all"
              />
            </div>
          </div>

          {/* Select Controls Row: Role, Plan, Status */}
          <div className="grid grid-cols-3 gap-3 pt-1">
            {/* Role */}
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Role
              </label>
              <select
                name="role"
                value={formData.role || "User"}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
              >
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="Moderator">Moderator</option>
                <option value="User">User</option>
              </select>
            </div>

            {/* Plan */}
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Subscription
              </label>
              <select
                name="plan"
                value={formData.plan || "Free"}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
              >
                <option value="Free">Free</option>
                <option value="Pro">Pro</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Account Status
              </label>
              <select
                name="status"
                value={formData.status || "Active"}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
                <option value="Banned">Banned</option>
              </select>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 text-xs font-medium rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 text-xs font-medium rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-xs"
            >
              {userToEdit ? "Save Changes" : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
