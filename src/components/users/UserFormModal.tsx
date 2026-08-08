import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { X, User as UserIcon, Mail } from "lucide-react";
import type { User } from "../../types/user";
import SearchableSelect from "../ui/SearchableSelect";

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

  const [errors, setErrors] = useState<{ fullName?: string; email?: string }>(
    {},
  );

  if (!isOpen) return null;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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
    <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-zinc-100 p-2 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              <UserIcon className="h-4 w-4" />
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
            className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {/* Full Name */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Full Name
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                <UserIcon className="h-4 w-4" />
              </div>
              <input
                type="text"
                name="fullName"
                value={formData.fullName || ""}
                onChange={handleChange}
                placeholder="e.g. Alex Morgan"
                className={`w-full rounded-lg border bg-zinc-50 py-2 pr-3 pl-9 text-sm text-zinc-900 transition-all focus:ring-2 focus:ring-zinc-400 focus:outline-hidden dark:bg-zinc-800/50 dark:text-zinc-100 dark:focus:ring-zinc-600 ${
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
            <label className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Email Address
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                placeholder="alex.morgan@company.com"
                className={`w-full rounded-lg border bg-zinc-50 py-2 pr-3 pl-9 text-sm text-zinc-900 transition-all focus:ring-2 focus:ring-zinc-400 focus:outline-hidden dark:bg-zinc-800/50 dark:text-zinc-100 dark:focus:ring-zinc-600 ${
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
            <label className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Country
            </label>
            <SearchableSelect
              value={formData.country || ""}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, country: value }))
              }
              placeholder="Select a country"
            />
          </div>

          {/* Select Controls Row: Role, Plan, Status */}
          <div className="grid grid-cols-3 gap-3 pt-1">
            {/* Role */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Role
              </label>
              <select
                name="role"
                value={formData.role || "User"}
                onChange={handleChange}
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 focus:ring-2 focus:ring-zinc-400 focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-100 dark:focus:ring-zinc-600"
              >
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="Moderator">Moderator</option>
                <option value="User">User</option>
              </select>
            </div>

            {/* Plan */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Subscription
              </label>
              <select
                name="plan"
                value={formData.plan || "Free"}
                onChange={handleChange}
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 focus:ring-2 focus:ring-zinc-400 focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-100 dark:focus:ring-zinc-600"
              >
                <option value="Free">Free</option>
                <option value="Pro">Pro</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Account Status
              </label>
              <select
                name="status"
                value={formData.status || "Active"}
                onChange={handleChange}
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 focus:ring-2 focus:ring-zinc-400 focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-100 dark:focus:ring-zinc-600"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
                <option value="Banned">Banned</option>
              </select>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-accent hover:bg-accent-hover px-4 py-2 text-xs font-medium text-white shadow-xs transition-colors"
            >
              {userToEdit ? "Save Changes" : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
