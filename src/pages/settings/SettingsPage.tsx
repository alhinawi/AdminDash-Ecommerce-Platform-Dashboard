import { useEffect, useRef, useState } from "react";

import {
  Bell,
  Database,
  Download,
  FlaskConical,
  KeyRound,
  LayoutDashboard,
  Moon,
  Palette,
  Save,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sun,
  Upload,
  User,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import Button from "../../components/ui/Button";
import Select from "../../components/ui/Select";
import Toggle from "../../components/ui/Toggle";
import { type AccentColor, useThemeContext } from "../../context/ThemeContext";

interface SettingsPageProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  addToast?: (
    type: "success" | "error" | "info",
    title: string,
    message: string,
  ) => void;
}

export default function SettingsPage({
  darkMode,
  toggleDarkMode,
  addToast,
}: SettingsPageProps) {
  const { t } = useTranslation();
  const {
    accentColor,
    setAccentColor,
    themePreset,
    userProfile,
    setUserProfile,
  } = useThemeContext();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<
    | "profile"
    | "appearance"
    | "dashboard"
    | "notifications"
    | "security"
    | "data"
  >("profile");

  const DEFAULT_BIO =
    "Senior E-Commerce Operations Lead & Systems Architect. Overseeing global catalog analytics, inventory management, and digital workflow optimizations.";

  const getEffectiveBio = (bio?: string) =>
    !bio || bio === "ddddddd" ? DEFAULT_BIO : bio;

  // Profile Form State
  const [profile, setProfile] = useState({
    fullName: userProfile.name,
    email: userProfile.email,
    role: userProfile.role,
    bio: getEffectiveBio(userProfile.bio),
  });

  // Sync form state when userProfile loads or changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProfile({
      fullName: userProfile.name,
      email: userProfile.email,
      role: userProfile.role,
      bio: getEffectiveBio(userProfile.bio),
    });
  }, [userProfile.name, userProfile.email, userProfile.role, userProfile.bio]);

  const PRESET_AVATARS = [
    "https://avatars.githubusercontent.com/u/68702059?v=4",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
  ];

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      notify(
        "error",
        t("settings.toasts.fileTooLarge", "File Too Large"),
        t(
          "settings.toasts.fileTooLargeMsg",
          "Please select an image under 5MB.",
        ),
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = document.createElement("img");
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const MAX_SIZE = 300;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
          setUserProfile((prev) => ({ ...prev, avatarUrl: dataUrl }));
          notify(
            "success",
            t("settings.toasts.avatarUpdated", "Avatar Photo Updated"),
            t(
              "settings.toasts.avatarUpdatedMsg",
              "Your new profile photo has been applied successfully across the dashboard.",
            ),
          );
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Appearance & Preferences State
  const [density, setDensity] = useState<"compact" | "default" | "comfy">(
    "default",
  );

  // Dashboard Preferences
  const [defaultTab, setDefaultTab] = useState("overview");
  const [defaultItemsPerPage, setDefaultItemsPerPage] = useState("8");
  const [demoModeSetting, setDemoModeSetting] = useState(false);

  // Notifications State
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushAlerts: false,
    stockAlerts: true,
    weeklyReport: true,
  });

  // Security State
  const [twoFactor, setTwoFactor] = useState(true);
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirmPass: "",
  });

  const notify = (
    type: "success" | "error" | "info",
    title: string,
    message: string,
  ) => {
    if (addToast) {
      addToast(type, title, message);
    } else {
      alert(`${title}: ${message}`);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile((prev) => ({
      ...prev,
      name: profile.fullName,
      email: profile.email,
      role: profile.role,
      bio: profile.bio,
    }));
    notify(
      "success",
      t("settings.toasts.profileSaved", "Profile Updated"),
      t(
        "settings.toasts.profileSavedMsg",
        "Your administrator profile changes have been saved successfully.",
      ),
    );
  };

  const handleExportData = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(
        JSON.stringify({ profile, notifications, timestamp: new Date() }),
      );
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "admindash-settings-export.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    notify(
      "success",
      t("settings.toasts.exportDone", "Export Complete"),
      t(
        "settings.toasts.exportDoneMsg",
        "Dashboard settings exported to JSON file.",
      ),
    );
  };

  const tabs = [
    {
      id: "profile",
      label: t("settings.tabs.profile", "Profile Settings"),
      icon: User,
    },
    {
      id: "appearance",
      label: t("settings.tabs.appearance", "Appearance"),
      icon: Palette,
    },
    {
      id: "dashboard",
      label: t("settings.tabs.preferences", "Preferences"),
      icon: LayoutDashboard,
    },
    {
      id: "notifications",
      label: t("settings.tabs.notifications", "Notifications"),
      icon: Bell,
    },
    {
      id: "security",
      label: t("settings.tabs.security", "Security & Auth"),
      icon: ShieldCheck,
    },
    {
      id: "data",
      label: t("settings.tabs.data", "Data & Export"),
      icon: Database,
    },
  ] as const;

  return (
    <main className="container mx-auto flex-1 p-4 pt-6 md:p-8">
      {/* Page Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-gray-200 pb-5 md:flex-row md:items-center dark:border-zinc-800">
        <div>
          <h1 className="flex items-center gap-2.5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            <LayoutDashboard className={`h-7 w-7 ${themePreset.text}`} />
            {t("settings.title", "Dashboard Settings")}
          </h1>
          <p className="mt-1 text-xs text-gray-500 dark:text-zinc-400">
            {t(
              "settings.subtitle",
              "Manage your account credentials, dark aesthetics, notifications, and data exports.",
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border border-gray-200 ${themePreset.badgeBg} ${themePreset.badgeText} px-3 py-1 text-xs font-semibold dark:border-zinc-800`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {t("common.enterpriseAdmin", "Enterprise Admin v2.4")}
          </span>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        {/* Navigation Sidebar */}
        <nav className="w-full shrink-0 space-y-1.5 rounded-2xl border border-gray-200/80 bg-white p-2 shadow-xs md:w-64 dark:border-zinc-800 dark:bg-zinc-900">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3.5 py-3 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? `${themePreset.bg} text-white shadow-md`
                    : "text-gray-700 hover:bg-gray-100 dark:text-zinc-300 dark:hover:bg-zinc-800/70"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-white" : ""}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Settings Content Area */}
        <div className="flex-1 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          {/* TAB 1: PROFILE SETTINGS */}
          {activeTab === "profile" && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">
                  {t("settings.profile.title", "Profile Information")}
                </h2>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-zinc-400">
                  {t(
                    "settings.profile.subtitle",
                    "Update your public profile details and administrative persona.",
                  )}
                </p>
              </div>

              {/* Avatar Section */}
              <div className="space-y-3 rounded-2xl border border-gray-200/80 bg-gray-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-800/40">
                <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300">
                  {t("settings.profile.photoAvatar", "Profile Photo & Avatar")}
                </label>
                <div className="flex flex-wrap items-center gap-5">
                  <div className="relative">
                    <img
                      src={userProfile.avatarUrl}
                      alt={userProfile.name}
                      className="h-20 w-20 rounded-full object-cover shadow-md ring-4 ring-white dark:ring-zinc-800"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className={`absolute inset-e-0 bottom-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full ${themePreset.bg} text-white shadow-lg transition-transform hover:scale-110 active:scale-95`}
                      title={t(
                        "settings.profile.uploadNewPhoto",
                        "Upload New Photo",
                      )}
                    >
                      <Upload className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-bold text-gray-800 shadow-2xs hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                      >
                        {t(
                          "settings.profile.uploadCustomPhoto",
                          "Upload Custom Photo",
                        )}
                      </button>
                    </div>
                    <p className="text-[11px] text-gray-400 dark:text-zinc-500">
                      {t(
                        "settings.profile.uploadHint",
                        "Upload any JPG, PNG or WebP image file from your device.",
                      )}
                    </p>

                    {/* Preset Avatars */}
                    <div className="pt-1">
                      <span className="mb-1.5 block text-[10px] font-semibold text-gray-400 uppercase dark:text-zinc-500">
                        {t(
                          "settings.profile.orPickPreset",
                          "Or Pick a Preset Avatar:",
                        )}
                      </span>
                      <div className="flex items-center gap-2">
                        {PRESET_AVATARS.map((url, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setUserProfile((prev) => ({
                                ...prev,
                                avatarUrl: url,
                              }));
                              notify(
                                "success",
                                t(
                                  "settings.toasts.avatarUpdated",
                                  "Avatar Photo Updated",
                                ),
                                t(
                                  "settings.toasts.avatarUpdatedMsg",
                                  "Preset avatar photo applied.",
                                ),
                              );
                            }}
                            className={`h-8 w-8 cursor-pointer overflow-hidden rounded-full transition-all ${
                              userProfile.avatarUrl === url
                                ? "ring-1.5 scale-105 ring-(--primary-accent) ring-offset-1 ring-offset-white dark:ring-offset-zinc-900"
                                : "opacity-75 hover:scale-105 hover:opacity-100"
                            }`}
                          >
                            <img
                              src={url}
                              alt="Preset"
                              className="h-full w-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-zinc-300">
                    {t("users.modal.fullName", "Full Name")}
                  </label>
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) =>
                      setProfile({ ...profile, fullName: e.target.value })
                    }
                    className="focus-accent w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-xs font-medium text-gray-900 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-zinc-300">
                    {t("users.modal.emailAddress", "Email Address")}
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    className="focus-accent w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-xs font-medium text-gray-900 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-zinc-300">
                  {t("settings.profile.roleDesc", "Role Description")}
                </label>
                <input
                  type="text"
                  value={profile.role}
                  onChange={(e) =>
                    setProfile({ ...profile, role: e.target.value })
                  }
                  className="focus-accent w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-xs font-medium text-gray-900 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-zinc-300">
                  {t("settings.profile.bioNotes", "Bio / Notes")}
                </label>
                <textarea
                  rows={3}
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                  className="focus-accent w-full rounded-xl border border-gray-200 bg-gray-50/50 p-3.5 text-xs font-medium text-gray-900 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-100"
                />
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  className="bg-accent hover:bg-accent-hover shadow-accent-glow flex items-center gap-2 text-xs font-semibold text-white shadow-xs transition-all duration-200"
                >
                  <Save className="h-4 w-4" />
                  {t("settings.profile.saveBtn", "Save Changes")}
                </Button>
              </div>
            </form>
          )}

          {/* TAB 2: APPEARANCE SETTINGS */}
          {activeTab === "appearance" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">
                  {t("settings.appearance.title", "Appearance & Theme")}
                </h2>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-zinc-400">
                  {t(
                    "settings.appearance.subtitle",
                    "Customize theme modes, density, and accent styling.",
                  )}
                </p>
              </div>

              {/* Dark Mode Switch */}
              <div className="flex items-center justify-between rounded-xl border border-gray-200/80 bg-gray-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                <div className="flex items-center gap-3">
                  {darkMode ? (
                    <Moon className="h-5 w-5 text-indigo-400" />
                  ) : (
                    <Sun className="h-5 w-5 text-amber-500" />
                  )}
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                      {t(
                        "settings.appearance.darkModeAesthetic",
                        "Dark Mode Aesthetic",
                      )}
                    </h4>
                    <p className="text-[11px] text-gray-500 dark:text-zinc-400">
                      {t(
                        "settings.appearance.darkModeHint",
                        "Toggle sleek Linear/Stripe dark mode theme.",
                      )}
                    </p>
                  </div>
                </div>

                <Toggle
                  checked={darkMode}
                  onChange={toggleDarkMode}
                  label={t(
                    "settings.appearance.darkModeAesthetic",
                    "Dark Mode Aesthetic",
                  )}
                />
              </div>

              {/* Accent Colors */}
              <div>
                <label className="mb-2 block text-xs font-semibold text-gray-700 dark:text-zinc-300">
                  {t(
                    "settings.appearance.primaryAccent",
                    "Primary Accent Color",
                  )}
                </label>
                <div className="flex items-center gap-3">
                  {(
                    [
                      "#4f46e5",
                      "#06b6d4",
                      "#10b981",
                      "#f43f5e",
                      "#8b5cf6",
                      "#ea580c",
                    ] as AccentColor[]
                  ).map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => {
                        setAccentColor(color);
                        notify(
                          "success",
                          t(
                            "settings.toasts.accentUpdated",
                            "Accent Color Updated",
                          ),
                          t(
                            "settings.toasts.accentUpdatedMsg",
                            "Primary accent color applied dynamically across dashboard.",
                          ),
                        );
                      }}
                      style={{ backgroundColor: color }}
                      className={`h-8 w-8 cursor-pointer rounded-full transition-transform ${
                        accentColor === color
                          ? "scale-110 ring-2 ring-white ring-offset-2 ring-offset-zinc-900"
                          : "opacity-80 hover:scale-105"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Layout Density */}
              <div>
                <label className="mb-2 block text-xs font-semibold text-gray-700 dark:text-zinc-300">
                  {t(
                    "settings.appearance.layoutDensity",
                    "Layout Spacing Density",
                  )}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(["compact", "default", "comfy"] as const).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDensity(d)}
                      className={`cursor-pointer rounded-xl border p-3 text-center text-xs font-bold capitalize transition-all ${
                        density === d
                          ? "border-accent bg-accent-light text-accent shadow-xs"
                          : "border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DASHBOARD PREFERENCES */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">
                  {t("settings.dashboard.title", "Dashboard Preferences")}
                </h2>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-zinc-400">
                  {t(
                    "settings.dashboard.subtitle",
                    "Configure default landing views, items per page, and Demo Mode options.",
                  )}
                </p>
              </div>

              {/* Demo Mode Setting */}
              <div className="flex items-center justify-between rounded-xl border border-gray-200/80 bg-gray-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                <div className="flex items-center gap-3">
                  <FlaskConical className="h-5 w-5 text-indigo-500" />
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                      {t(
                        "settings.dashboard.demoModeEngine",
                        "Global Demo Mode Engine",
                      )}
                    </h4>
                    <p className="text-[11px] text-gray-500 dark:text-zinc-400">
                      {t(
                        "settings.dashboard.demoModeHint",
                        "Simulate 250 enterprise catalog items across charts.",
                      )}
                    </p>
                  </div>
                </div>

                <Toggle
                  checked={demoModeSetting}
                  onChange={(val) => {
                    setDemoModeSetting(val);
                    if (addToast) {
                      addToast(
                        "info",
                        t("settings.toasts.settingUpdated", "Setting Updated"),
                        val
                          ? t(
                              "settings.toasts.demoModeOn",
                              "Demo mode set to default ON.",
                            )
                          : t(
                              "settings.toasts.demoModeOff",
                              "Demo mode set to default OFF.",
                            ),
                      );
                    }
                  }}
                  label={t(
                    "settings.dashboard.defaultDemoMode",
                    "Default Demo Mode State",
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Select
                  label={t(
                    "settings.dashboard.defaultAnalyticsTab",
                    "Default Analytics Tab",
                  )}
                  options={[
                    {
                      value: "overview",
                      label: t("nav.analyticsOverview", "Overview"),
                    },
                    {
                      value: "categories",
                      label: t(
                        "analytics.activeCategories",
                        "Categories & Valuation",
                      ),
                    },
                    {
                      value: "pricing",
                      label: t(
                        "analytics.valuationTrend",
                        "Pricing Tiers Deep Dive",
                      ),
                    },
                  ]}
                  value={defaultTab}
                  onChange={(val) => setDefaultTab(String(val))}
                />

                <Select
                  label={t(
                    "settings.dashboard.defaultItemsPerPage",
                    "Default Desktop Items Per Page",
                  )}
                  options={[
                    {
                      value: "4",
                      label: t("settings.dashboard.itemsCount", {
                        count: 4,
                        defaultValue: "4 Items",
                      }),
                    },
                    {
                      value: "6",
                      label: t("settings.dashboard.itemsCount", {
                        count: 6,
                        defaultValue: "6 Items",
                      }),
                    },
                    {
                      value: "8",
                      label: t("settings.dashboard.itemsCountStandard", {
                        count: 8,
                        defaultValue: "8 Items (Standard)",
                      }),
                    },
                    {
                      value: "12",
                      label: t("settings.dashboard.itemsCount", {
                        count: 12,
                        defaultValue: "12 Items",
                      }),
                    },
                  ]}
                  value={defaultItemsPerPage}
                  onChange={(val) => setDefaultItemsPerPage(String(val))}
                />
              </div>
            </div>
          )}

          {/* TAB 4: NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">
                  {t("settings.notifications.title", "Notifications & Alerts")}
                </h2>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-zinc-400">
                  {t(
                    "settings.notifications.subtitle",
                    "Control stock notifications, system events, and email digests.",
                  )}
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    key: "emailAlerts" as const,
                    title: t(
                      "settings.notifications.emailSystem",
                      "Email System Notifications",
                    ),
                    desc: t(
                      "settings.notifications.emailSystemDesc",
                      "Receive critical security and system update emails.",
                    ),
                  },
                  {
                    key: "stockAlerts" as const,
                    title: t(
                      "settings.notifications.stockAlerts",
                      "Low & Out of Stock Alerts",
                    ),
                    desc: t(
                      "settings.notifications.stockAlertsDesc",
                      "Notify when products drop below stock threshold (<=10 items).",
                    ),
                  },
                  {
                    key: "weeklyReport" as const,
                    title: t(
                      "settings.notifications.weeklyReport",
                      "Weekly Analytics Digest",
                    ),
                    desc: t(
                      "settings.notifications.weeklyReportDesc",
                      "Receive automated weekly revenue and valuation PDF reports.",
                    ),
                  },
                  {
                    key: "pushAlerts" as const,
                    title: t(
                      "settings.notifications.pushAlerts",
                      "Push Browser Notifications",
                    ),
                    desc: t(
                      "settings.notifications.pushAlertsDesc",
                      "Show real-time toast alerts for live user activities.",
                    ),
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between rounded-xl border border-gray-200/80 bg-gray-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-gray-500 dark:text-zinc-400">
                        {item.desc}
                      </p>
                    </div>

                    <Toggle
                      checked={notifications[item.key]}
                      onChange={(val) =>
                        setNotifications({
                          ...notifications,
                          [item.key]: val,
                        })
                      }
                      label={item.title}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SECURITY */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">
                  {t("settings.security.title", "Security & Authentication")}
                </h2>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-zinc-400">
                  {t(
                    "settings.security.subtitle",
                    "Manage password credentials, 2FA, and active admin sessions.",
                  )}
                </p>
              </div>

              {/* 2FA Card */}
              <div className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
                <div className="flex items-center gap-3">
                  <KeyRound className="h-5 w-5 text-emerald-500" />
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                      {t(
                        "settings.security.twoFactor",
                        "Two-Factor Authentication (2FA)",
                      )}
                    </h4>
                    <p className="text-[11px] text-gray-500 dark:text-zinc-400">
                      {t("settings.security.status", "Status")}:{" "}
                      <span className="font-semibold text-emerald-500">
                        {t(
                          "settings.security.enabled",
                          "ENABLED (Authenticator App)",
                        )}
                      </span>
                    </p>
                  </div>
                </div>

                <Toggle
                  checked={twoFactor}
                  onChange={setTwoFactor}
                  activeColor="bg-emerald-600"
                  label={t(
                    "settings.security.twoFactor",
                    "Two-Factor Authentication",
                  )}
                />
              </div>

              {/* Password Form */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-gray-900 dark:text-white">
                  {t("settings.security.changePassword", "Change Password")}
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <input
                    type="password"
                    placeholder={t(
                      "settings.security.currentPass",
                      "Current Password",
                    )}
                    value={passwords.current}
                    onChange={(e) =>
                      setPasswords({ ...passwords, current: e.target.value })
                    }
                    className="focus-accent rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-100"
                  />
                  <input
                    type="password"
                    placeholder={t("settings.security.newPass", "New Password")}
                    value={passwords.newPass}
                    onChange={(e) =>
                      setPasswords({ ...passwords, newPass: e.target.value })
                    }
                    className="focus-accent rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-100"
                  />
                  <input
                    type="password"
                    placeholder={t(
                      "settings.security.confirmPass",
                      "Confirm New Password",
                    )}
                    value={passwords.confirmPass}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        confirmPass: e.target.value,
                      })
                    }
                    className="focus-accent rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-100"
                  />
                </div>
                <div className="flex justify-end pt-1">
                  <Button
                    type="button"
                    onClick={() =>
                      notify(
                        "success",
                        t("settings.toasts.passwordSaved", "Password Saved"),
                        t(
                          "settings.toasts.passwordSavedMsg",
                          "Security credentials updated.",
                        ),
                      )
                    }
                    className="bg-accent hover:bg-accent-hover cursor-pointer text-xs font-semibold text-white"
                  >
                    {t("settings.security.updatePassword", "Update Password")}
                  </Button>
                </div>
              </div>

              {/* Active Sessions */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-gray-900 dark:text-white">
                  {t("settings.security.activeSessions", "Active Sessions")}
                </h3>
                <div className="rounded-xl border border-gray-200/80 bg-gray-50/50 p-3.5 dark:border-zinc-800 dark:bg-zinc-800/50">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <Smartphone className="h-4 w-4 text-indigo-500" />
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">
                          Chrome on Windows 11 (
                          {t(
                            "settings.security.currentSession",
                            "Current Session",
                          )}
                          )
                        </p>
                        <p className="text-[11px] text-gray-500 dark:text-zinc-400">
                          IP: 192.168.1.45 • Cairo, EG
                        </p>
                      </div>
                    </div>
                    <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-500">
                      {t("settings.security.activeNow", "Active Now")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: DATA MANAGEMENT */}
          {activeTab === "data" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">
                  {t("settings.data.title", "Data & Catalog Management")}
                </h2>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-zinc-400">
                  {t(
                    "settings.data.subtitle",
                    "Export product database, import catalog backup, or clear cached data.",
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Export Card */}
                <div className="rounded-xl border border-gray-200/80 bg-gray-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                  <Download className="text-accent h-6 w-6" />
                  <h4 className="mt-2 text-xs font-bold text-gray-900 dark:text-white">
                    {t("settings.data.exportTitle", "Export Dashboard Data")}
                  </h4>
                  <p className="mt-1 text-[11px] text-gray-500 dark:text-zinc-400">
                    {t(
                      "settings.data.exportDesc",
                      "Download full 64-product catalog and metrics as JSON.",
                    )}
                  </p>
                  <Button
                    type="button"
                    onClick={handleExportData}
                    className="bg-accent shadow-accent-glow hover:bg-accent-hover mt-4 w-full cursor-pointer text-xs font-semibold text-white shadow-xs"
                  >
                    {t("settings.data.downloadJson", "Download JSON Export")}
                  </Button>
                </div>

                {/* Import Card */}
                <div className="rounded-xl border border-gray-200/80 bg-gray-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                  <Upload className="h-6 w-6 text-emerald-500" />
                  <h4 className="mt-2 text-xs font-bold text-gray-900 dark:text-white">
                    {t("settings.data.importTitle", "Import Product Backup")}
                  </h4>
                  <p className="mt-1 text-[11px] text-gray-500 dark:text-zinc-400">
                    {t(
                      "settings.data.importDesc",
                      "Upload catalog JSON/CSV file to update dashboard.",
                    )}
                  </p>
                  <Button
                    type="button"
                    onClick={() =>
                      notify(
                        "info",
                        t("settings.data.importTitle", "Import Catalog"),
                        t(
                          "settings.data.importPrompt",
                          "File selection prompt open.",
                        ),
                      )
                    }
                    className="mt-4 w-full cursor-pointer bg-zinc-900 text-xs font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                  >
                    {t("settings.data.selectImportFile", "Select Import File")}
                  </Button>
                </div>
              </div>

              {/* Maintenance Tools */}
              <div className="space-y-3 border-t border-gray-200 pt-4 dark:border-zinc-800">
                <h3 className="text-xs font-bold text-gray-900 dark:text-white">
                  {t("settings.data.maintenanceTitle", "Dashboard Maintenance")}
                </h3>

                <div className="flex flex-col items-center justify-between gap-3 rounded-xl border border-rose-500/20 bg-rose-500/5 p-3.5 sm:flex-row">
                  <div>
                    <h4 className="text-xs font-bold text-rose-600 dark:text-rose-400">
                      {t("settings.data.resetCache", "Reset Analytics & Cache")}
                    </h4>
                    <p className="text-[11px] text-gray-500 dark:text-zinc-400">
                      {t(
                        "settings.data.resetCacheDesc",
                        "Clear client-side cached metric state and restore live values.",
                      )}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      notify(
                        "success",
                        t("settings.toasts.cacheCleared", "Cache Cleared"),
                        t(
                          "settings.toasts.cacheClearedMsg",
                          "Dashboard analytics cache reset.",
                        ),
                      )
                    }
                    className="cursor-pointer rounded-xl border border-rose-200 bg-rose-100 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-200 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-400 dark:hover:bg-rose-900/60"
                  >
                    {t("settings.data.resetCacheBtn", "Reset Cache")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
