import { Info, Settings, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function CookiesPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-zinc-50 pb-16 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="mx-auto max-w-4xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-zinc-200 pb-6 dark:border-zinc-800/80">
          <div className="flex items-center gap-2">
            <span className="rounded-xs bg-zinc-200 px-2 py-0.5 font-mono text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              LEGAL / COOKIES
            </span>
          </div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {t("footer.cookies", "Cookie Policy")}
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Last Updated: August 13, 2026. Understand how we use cookies and caching to improve your dashboard performance.
          </p>
        </div>

        {/* Content */}
        <div className="mt-8 space-y-8 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Info className="h-4.5 w-4.5 text-zinc-500" />
              1. What are Cookies?
            </h2>
            <p>
              Cookies are small text files stored on your computer or device that help us remember preferences, user session details, and layout states (such as active sidebars and preset styles).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Shield className="h-4.5 w-4.5 text-zinc-500" />
              2. How We Use Cookies
            </h2>
            <p>
              We use strictly functional cookies and localStorage settings to:
            </p>
            <ul className="list-disc ps-5 space-y-1">
              <li>Keep you signed in during active sessions.</li>
              <li>Store your theme selection (Light vs. Dark mode).</li>
              <li>Cache dashboard configuration presets and translations.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Settings className="h-4.5 w-4.5 text-zinc-500" />
              3. Managing Cookie Preferences
            </h2>
            <p>
              You can block or delete cookies in your browser settings. Note that disabling necessary functional cookies may limit dashboard feature availability or sign you out.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
