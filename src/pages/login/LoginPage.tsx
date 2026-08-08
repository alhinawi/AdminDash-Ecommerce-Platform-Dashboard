import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Package,
  Mail,
  Lock,
  Eye,
  EyeOff,
  TrendingUp,
  DollarSign,
  Layers,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 800);
  };

  return (
    <div className="flex min-h-screen w-full flex-col overflow-hidden bg-zinc-950 font-sans text-zinc-100 selection:bg-indigo-500 selection:text-white lg:flex-row">
      {/* ================= LEFT COLUMN: HERO & FLOATING STATS ================= */}
      <div className="relative flex w-full flex-col justify-between overflow-hidden border-b border-zinc-800/60 bg-linear-to-br from-zinc-950 via-zinc-900 to-indigo-950/40 p-8 md:p-12 lg:w-1/2 lg:border-r lg:border-b-0 lg:p-16">
        {/* Ambient Glowing Orbs */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 left-1/3 h-80 w-80 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl" />

        {/* Top Header / Branding */}
        <div className="relative z-10 flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-tr from-zinc-100 to-zinc-300 text-zinc-900 shadow-md transition-transform group-hover:scale-105">
              <Package className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Admin<span className="text-indigo-400">Dash</span>
            </span>
          </Link>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            System Operational
          </span>
        </div>

        {/* Hero Content Section */}
        <div className="relative z-10 my-12 space-y-8 lg:my-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-medium text-indigo-300 backdrop-blur-md">
            <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
            Enterprise Access Management
          </div>

          <div className="space-y-4">
            <h1 className="bg-linear-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-5xl lg:text-6xl lg:leading-tight">
              Manage your business <br />
              <span className="bg-linear-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                with confidence
              </span>
            </h1>

            <p className="max-w-lg text-base leading-relaxed text-zinc-400 md:text-lg">
              Streamline inventory, analyze real-time revenue performance, and
              manage team permissions with an intuitive, enterprise-grade
              control panel.
            </p>
          </div>

          {/* Three Floating Statistic Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Card 1: Active Products */}
            <div className="group relative rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700/80 hover:bg-zinc-900/80">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-400">
                  Products
                </span>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                  <TrendingUp className="h-3.5 w-3.5" />
                </div>
              </div>
              <p className="text-2xl font-bold tracking-tight text-white">
                1,248
              </p>
              <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                <span>+14% this month</span>
              </div>
            </div>

            {/* Card 2: Monthly Revenue */}
            <div className="group relative rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700/80 hover:bg-zinc-900/80">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-400">
                  Revenue
                </span>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <DollarSign className="h-3.5 w-3.5" />
                </div>
              </div>
              <p className="text-2xl font-bold tracking-tight text-white">
                $128.4k
              </p>
              <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-zinc-400">
                <span>Real-time sync</span>
              </div>
            </div>

            {/* Card 3: Categories */}
            <div className="group relative rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700/80 hover:bg-zinc-900/80">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-400">
                  Categories
                </span>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                  <Layers className="h-3.5 w-3.5" />
                </div>
              </div>
              <p className="text-2xl font-bold tracking-tight text-white">24</p>
              <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-purple-400">
                <span>100% active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="relative z-10 pt-4 text-xs text-zinc-500">
          Trusted by over 10,000+ modern SaaS & eCommerce platforms worldwide.
        </div>
      </div>

      {/* ================= RIGHT COLUMN: SIGN IN FORM ================= */}
      <div className="relative flex w-full items-center justify-center bg-zinc-950 p-6 sm:p-12 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="space-y-2 text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Welcome back
            </h2>
            <p className="text-sm text-zinc-400">
              Enter your admin credentials to access your dashboard.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-xs font-semibold tracking-wider text-zinc-300 uppercase"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@company.com"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 py-3 pr-4 pl-10 text-sm text-white placeholder-zinc-500 outline-hidden transition-all focus:border-indigo-500 focus:bg-zinc-900 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold tracking-wider text-zinc-300 uppercase"
                >
                  Password
                </label>
                <a
                  href="#forgot-password"
                  onClick={(e) => e.preventDefault()}
                  className="text-xs font-medium text-indigo-400 transition-colors hover:text-indigo-300"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 py-3 pr-11 pl-10 text-sm text-white placeholder-zinc-500 outline-hidden transition-all focus:border-indigo-500 focus:bg-zinc-900 focus:ring-2 focus:ring-indigo-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3.5 text-zinc-400 hover:text-zinc-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex cursor-pointer items-center gap-2.5 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 cursor-pointer rounded-md border-zinc-700 bg-zinc-900 text-indigo-600 accent-indigo-600 focus:ring-indigo-500/20"
                />
                <span className="text-xs font-medium text-zinc-400">
                  Remember me for 30 days
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-indigo-500 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:from-indigo-500 hover:to-indigo-400 active:scale-[0.99] disabled:opacity-70"
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <span>Sign in to Dashboard</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800/80" />
            </div>
            <div className="relative inline-block bg-zinc-950 px-3 text-xs font-medium tracking-wider text-zinc-500 uppercase">
              or continue with
            </div>
          </div>

          {/* Social OAuth Buttons */}
          <div className="grid grid-cols-2 gap-3">
            {/* Google Button */}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex h-11 cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 text-xs font-semibold text-zinc-200 transition-all hover:bg-zinc-800 hover:text-white"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.3-.8-.4-1.8-.4-2.8s.1-2 .4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                />
              </svg>
              <span>Google</span>
            </button>

            {/* GitHub Button */}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex h-11 cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 text-xs font-semibold text-zinc-200 transition-all hover:bg-zinc-800 hover:text-white"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </button>
          </div>

          {/* Footer Info */}
          <p className="text-center text-xs text-zinc-500">
            Protected by reCAPTCHA and subject to Privacy Policy and Terms of
            Service.
          </p>
        </div>
      </div>
    </div>
  );
}
