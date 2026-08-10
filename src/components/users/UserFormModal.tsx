import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { X, User as UserIcon, Mail } from "lucide-react";
import type { User } from "../../types/user";
import Select from "../ui/Select";
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
  const { t } = useTranslation();
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
      newErrors.fullName = t(
        "users.modal.nameRequired",
        "Full name is required",
      );
    }
    if (!formData.email?.trim()) {
      newErrors.email = t(
        "users.modal.emailRequired",
        "Email address is required",
      );
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t(
        "users.modal.emailInvalid",
        "Invalid email address format",
      );
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
                {userToEdit
                  ? t("users.modal.editTitle", "Edit User Account")
                  : t("users.modal.addTitle", "Add New User")}
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {userToEdit
                  ? t("users.modal.editSubtitle", {
                      name: userToEdit.fullName,
                      defaultValue: `Update configuration for ${userToEdit.fullName}`,
                    })
                  : t(
                      "users.modal.addSub",
                      "Provision a new team member or user account",
                    )}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="cursor-pointer rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {/* Full Name */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
              {t("users.modal.fullName", "Full Name")}
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 inset-s-0 flex items-center ps-3 text-zinc-400">
                <UserIcon className="h-4 w-4" />
              </div>
              <input
                type="text"
                name="fullName"
                value={formData.fullName || ""}
                onChange={handleChange}
                placeholder={t(
                  "users.modal.namePlaceholder",
                  "e.g. Alex Morgan",
                )}
                className={`w-full rounded-lg border bg-zinc-50 py-2 ps-9 pe-3 text-sm text-zinc-900 transition-all focus:ring-2 focus:ring-zinc-400 focus:outline-hidden dark:bg-zinc-800/50 dark:text-zinc-100 dark:focus:ring-zinc-600 ${
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
              {t("users.modal.emailAddress", "Email Address")}
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 inset-s-0 flex items-center ps-3 text-zinc-400">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                placeholder={t(
                  "users.modal.emailPlaceholder",
                  "alex.morgan@company.com",
                )}
                className={`w-full rounded-lg border bg-zinc-50 py-2 ps-9 pe-3 text-sm text-zinc-900 transition-all focus:ring-2 focus:ring-zinc-400 focus:outline-hidden dark:bg-zinc-800/50 dark:text-zinc-100 dark:focus:ring-zinc-600 ${
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
              {t("users.modal.country", "Country")}
            </label>
            <SearchableSelect
              value={formData.country || ""}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, country: value }))
              }
              placeholder={t("users.modal.selectCountry", "Select a country")}
            />
          </div>

          {/* Select Controls Row: Role, Plan, Status */}
          <div className="grid grid-cols-3 gap-3 pt-1">
            {/* Role */}
            <Select
              size="sm"
              label={t("users.table.roleCol", "Role")}
              value={formData.role || "User"}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, role: val as User["role"] }))
              }
              options={[
                { value: "Admin", label: t("common.admin", "Admin") },
                { value: "Editor", label: t("common.editor", "Editor") },
                {
                  value: "Moderator",
                  label: t("common.moderator", "Moderator"),
                },
                { value: "User", label: t("common.user", "User") },
              ]}
            />

            {/* Plan */}
            <Select
              size="sm"
              label={t("users.modal.subscription", "Subscription")}
              value={formData.plan || "Free"}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, plan: val as User["plan"] }))
              }
              options={[
                { value: "Free", label: t("common.free", "Free") },
                { value: "Pro", label: t("common.pro", "Pro") },
                {
                  value: "Enterprise",
                  label: t("common.enterprise", "Enterprise"),
                },
              ]}
            />

            {/* Status */}
            <Select
              size="sm"
              label={t("users.modal.accountStatus", "Account Status")}
              value={formData.status || "Active"}
              onChange={(val) =>
                setFormData((prev) => ({
                  ...prev,
                  status: val as User["status"],
                }))
              }
              options={[
                { value: "Active", label: t("common.active", "Active") },
                { value: "Inactive", label: t("common.inactive", "Inactive") },
                {
                  value: "Suspended",
                  label: t("common.suspended", "Suspended"),
                },
                { value: "Banned", label: t("common.banned", "Banned") },
              ]}
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-lg px-4 py-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              {t("common.cancel", "Cancel")}
            </button>
            <button
              type="submit"
              className="bg-accent hover:bg-accent-hover cursor-pointer rounded-lg px-4 py-2 text-xs font-medium text-white shadow-xs transition-colors"
            >
              {userToEdit
                ? t("users.modal.saveChanges", "Save Changes")
                : t("users.modal.createUser", "Create User")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
