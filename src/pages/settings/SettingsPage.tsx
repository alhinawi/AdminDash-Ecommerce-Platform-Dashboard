import { useState, useRef, useEffect } from "react";
import {
  User,
  Palette,
  LayoutDashboard,
  Bell,
  ShieldCheck,
  Database,
  Save,
  Download,
  Upload,
  Sun,
  Moon,
  FlaskConical,
  KeyRound,
  Smartphone,
  Sparkles,
} from "lucide-react";
import Button from "../../components/ui/Button";
import Toggle from "../../components/ui/Toggle";
import Select from "../../components/ui/Select";
import { useThemeContext, type AccentColor } from "../../context/ThemeContext";

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

  // Profile Form State
  const [profile, setProfile] = useState({
    fullName: userProfile.name,
    email: userProfile.email,
    role: userProfile.role,
    bio: userProfile.bio || "",
  });

  // Sync form state when userProfile loads or changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProfile({
      fullName: userProfile.name,
      email: userProfile.email,
      role: userProfile.role,
      bio: userProfile.bio || "",
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
      notify("error", "File Too Large", "Please select an image under 5MB.");
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
            "Avatar Photo Updated",
            "Your new profile photo has been applied successfully across the dashboard.",
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
      "Profile Updated",
      "Your administrator profile changes have been saved successfully.",
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
      "Export Complete",
      "Dashboard settings exported to JSON file.",
    );
  };

  const tabs = [
    { id: "profile", label: "Profile Settings", icon: User },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "dashboard", label: "Preferences", icon: LayoutDashboard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security & Auth", icon: ShieldCheck },
    { id: "data", label: "Data & Export", icon: Database },
  ] as const;

  return (
    <main className="container mx-auto flex-1 p-4 pt-6 md:p-8">
      {/* Page Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-gray-200 pb-5 md:flex-row md:items-center dark:border-zinc-800">
        <div>
          <h1 className="flex items-center gap-2.5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            <LayoutDashboard className={`h-7 w-7 ${themePreset.text}`} />
            Dashboard Settings
          </h1>
          <p className="mt-1 text-xs text-gray-500 dark:text-zinc-400">
            Manage your account credentials, dark aesthetics, notifications, and
            data exports.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border border-gray-200 ${themePreset.badgeBg} ${themePreset.badgeText} px-3 py-1 text-xs font-semibold dark:border-zinc-800`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Enterprise Admin v2.4
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
                  Profile Information
                </h2>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-zinc-400">
                  Update your public profile details and administrative persona.
                </p>
              </div>

              {/* Avatar Section */}
              <div className="space-y-3 rounded-2xl border border-gray-200/80 bg-gray-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-800/40">
                <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300">
                  Profile Photo & Avatar
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
                      className={`absolute right-0 bottom-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full ${themePreset.bg} text-white shadow-lg transition-transform hover:scale-110 active:scale-95`}
                      title="Upload New Photo"
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
                        Upload Custom Photo
                      </button>
                    </div>
                    <p className="text-[11px] text-gray-400 dark:text-zinc-500">
                      Upload any JPG, PNG or WebP image file from your device.
                    </p>

                    {/* Preset Avatars */}
                    <div className="pt-1">
                      <span className="mb-1.5 block text-[10px] font-semibold text-gray-400 uppercase dark:text-zinc-500">
                        Or Pick a Preset Avatar:
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
                                "Avatar Updated",
                                "Preset avatar photo applied.",
                              );
                            }}
                            className={`h-8 w-8 cursor-pointer overflow-hidden rounded-full transition-all ${
                              userProfile.avatarUrl === url
                                ? `ring-2 ${themePreset.border} scale-110 ring-offset-2`
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
                    Full Name
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
                    Email Address
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
                  Role Description
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
                  Bio / Notes
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
                  Save Changes
                </Button>
              </div>
            </form>
          )}

          {/* TAB 2: APPEARANCE SETTINGS */}
          {activeTab === "appearance" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">
                  Appearance & Theme
                </h2>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-zinc-400">
                  Customize theme modes, density, and accent styling.
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
                      Dark Mode Aesthetic
                    </h4>
                    <p className="text-[11px] text-gray-500 dark:text-zinc-400">
                      Toggle sleek Linear/Stripe dark mode theme.
                    </p>
                  </div>
                </div>

                <Toggle
                  checked={darkMode}
                  onChange={toggleDarkMode}
                  label="Dark Mode Aesthetic"
                />
              </div>

              {/* Accent Colors */}
              <div>
                <label className="mb-2 block text-xs font-semibold text-gray-700 dark:text-zinc-300">
                  Primary Accent Color
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
                          "Accent Color Updated",
                          "Primary accent color applied dynamically across dashboard.",
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
                  Layout Spacing Density
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
                  Dashboard Preferences
                </h2>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-zinc-400">
                  Configure default landing views, items per page, and Demo Mode
                  options.
                </p>
              </div>

              {/* Demo Mode Setting */}
              <div className="flex items-center justify-between rounded-xl border border-gray-200/80 bg-gray-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                <div className="flex items-center gap-3">
                  <FlaskConical className="h-5 w-5 text-indigo-500" />
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                      Global Demo Mode Engine
                    </h4>
                    <p className="text-[11px] text-gray-500 dark:text-zinc-400">
                      Simulate 250 enterprise catalog items across charts.
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
                        "Setting Updated",
                        val
                          ? "Demo mode set to default ON."
                          : "Demo mode set to default OFF.",
                      );
                    }
                  }}
                  label="Default Demo Mode State"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Select
                  label="Default Analytics Tab"
                  options={[
                    { value: "overview", label: "Overview" },
                    {
                      value: "categories",
                      label: "Categories & Valuation",
                    },
                    {
                      value: "pricing",
                      label: "Pricing Tiers Deep Dive",
                    },
                  ]}
                  value={defaultTab}
                  onChange={(val) => setDefaultTab(String(val))}
                />

                <Select
                  label="Default Desktop Items Per Page"
                  options={[
                    { value: "4", label: "4 Items" },
                    { value: "6", label: "6 Items" },
                    { value: "8", label: "8 Items (Standard)" },
                    { value: "12", label: "12 Items" },
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
                  Notifications & Alerts
                </h2>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-zinc-400">
                  Control stock notifications, system events, and email digests.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    key: "emailAlerts" as const,
                    title: "Email System Notifications",
                    desc: "Receive critical security and system update emails.",
                  },
                  {
                    key: "stockAlerts" as const,
                    title: "Low & Out of Stock Alerts",
                    desc: "Notify when products drop below stock threshold (<=10 items).",
                  },
                  {
                    key: "weeklyReport" as const,
                    title: "Weekly Analytics Digest",
                    desc: "Receive automated weekly revenue and valuation PDF reports.",
                  },
                  {
                    key: "pushAlerts" as const,
                    title: "Push Browser Notifications",
                    desc: "Show real-time toast alerts for live user activities.",
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
                  Security & Authentication
                </h2>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-zinc-400">
                  Manage password credentials, 2FA, and active admin sessions.
                </p>
              </div>

              {/* 2FA Card */}
              <div className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
                <div className="flex items-center gap-3">
                  <KeyRound className="h-5 w-5 text-emerald-500" />
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                      Two-Factor Authentication (2FA)
                    </h4>
                    <p className="text-[11px] text-gray-500 dark:text-zinc-400">
                      Status:{" "}
                      <span className="font-semibold text-emerald-500">
                        ENABLED (Authenticator App)
                      </span>
                    </p>
                  </div>
                </div>

                <Toggle
                  checked={twoFactor}
                  onChange={setTwoFactor}
                  activeColor="bg-emerald-600"
                  label="Two-Factor Authentication"
                />
              </div>

              {/* Password Form */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-gray-900 dark:text-white">
                  Change Password
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <input
                    type="password"
                    placeholder="Current Password"
                    value={passwords.current}
                    onChange={(e) =>
                      setPasswords({ ...passwords, current: e.target.value })
                    }
                    className="focus-accent rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-100"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={passwords.newPass}
                    onChange={(e) =>
                      setPasswords({ ...passwords, newPass: e.target.value })
                    }
                    className="focus-accent rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-100"
                  />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
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
                        "Password Saved",
                        "Security credentials updated.",
                      )
                    }
                    className="bg-accent hover:bg-accent-hover text-xs font-semibold text-white"
                  >
                    Update Password
                  </Button>
                </div>
              </div>

              {/* Active Sessions */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-gray-900 dark:text-white">
                  Active Sessions
                </h3>
                <div className="rounded-xl border border-gray-200/80 bg-gray-50/50 p-3.5 dark:border-zinc-800 dark:bg-zinc-800/50">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <Smartphone className="h-4 w-4 text-indigo-500" />
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">
                          Chrome on Windows 11 (Current Session)
                        </p>
                        <p className="text-[11px] text-gray-500 dark:text-zinc-400">
                          IP: 192.168.1.45 • Cairo, EG
                        </p>
                      </div>
                    </div>
                    <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-500">
                      Active Now
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
                  Data & Catalog Management
                </h2>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-zinc-400">
                  Export product database, import catalog backup, or clear
                  cached data.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Export Card */}
                <div className="rounded-xl border border-gray-200/80 bg-gray-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                  <Download className="text-accent h-6 w-6" />
                  <h4 className="mt-2 text-xs font-bold text-gray-900 dark:text-white">
                    Export Dashboard Data
                  </h4>
                  <p className="mt-1 text-[11px] text-gray-500 dark:text-zinc-400">
                    Download full 64-product catalog and metrics as JSON.
                  </p>
                  <Button
                    type="button"
                    onClick={handleExportData}
                    className="bg-accent shadow-accent-glow hover:bg-accent-hover mt-4 w-full text-xs font-semibold text-white shadow-xs"
                  >
                    Download JSON Export
                  </Button>
                </div>

                {/* Import Card */}
                <div className="rounded-xl border border-gray-200/80 bg-gray-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                  <Upload className="h-6 w-6 text-emerald-500" />
                  <h4 className="mt-2 text-xs font-bold text-gray-900 dark:text-white">
                    Import Product Backup
                  </h4>
                  <p className="mt-1 text-[11px] text-gray-500 dark:text-zinc-400">
                    Upload catalog JSON/CSV file to update dashboard.
                  </p>
                  <Button
                    type="button"
                    onClick={() =>
                      notify(
                        "info",
                        "Import Catalog",
                        "File selection prompt open.",
                      )
                    }
                    className="mt-4 w-full bg-zinc-900 text-xs font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                  >
                    Select Import File
                  </Button>
                </div>
              </div>

              {/* Maintenance Tools */}
              <div className="space-y-3 border-t border-gray-200 pt-4 dark:border-zinc-800">
                <h3 className="text-xs font-bold text-gray-900 dark:text-white">
                  Dashboard Maintenance
                </h3>

                <div className="flex flex-col items-center justify-between gap-3 rounded-xl border border-rose-500/20 bg-rose-500/5 p-3.5 sm:flex-row">
                  <div>
                    <h4 className="text-xs font-bold text-rose-600 dark:text-rose-400">
                      Reset Analytics & Cache
                    </h4>
                    <p className="text-[11px] text-gray-500 dark:text-zinc-400">
                      Clear client-side cached metric state and restore live
                      values.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      notify(
                        "success",
                        "Cache Cleared",
                        "Dashboard analytics cache reset.",
                      )
                    }
                    className="cursor-pointer rounded-xl border border-rose-200 bg-rose-100 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-200 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-400 dark:hover:bg-rose-900/60"
                  >
                    Reset Cache
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
