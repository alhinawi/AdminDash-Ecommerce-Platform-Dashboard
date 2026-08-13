import { AlertTriangle, Scale, UserCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function TermsPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-zinc-50 pb-16 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="mx-auto max-w-4xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-zinc-200 pb-6 dark:border-zinc-800/80">
          <div className="flex items-center gap-2">
            <span className="rounded-xs bg-zinc-200 px-2 py-0.5 font-mono text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              LEGAL / USER AGREEMENT
            </span>
          </div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {t("footer.terms", "Terms of Service")}
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Last Updated: August 13, 2026. Please read these terms carefully before using our dashboard tools.
          </p>
        </div>

        {/* Content */}
        <div className="mt-8 space-y-8 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <UserCheck className="h-4.5 w-4.5 text-zinc-500" />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using this Admin Dashboard workspace, you agree to comply with and be bound by these Terms of Service. If you do not agree, please discontinue use immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Scale className="h-4.5 w-4.5 text-zinc-500" />
              2. User Obligations & Conduct
            </h2>
            <p>
              You agree to provide accurate registration details, keep credentials secure, and refrain from utilizing our database endpoints for malicious activities, reverse engineering, or scraping operations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="h-4.5 w-4.5 text-zinc-500" />
              3. Limitation of Liability
            </h2>
            <p>
              The application is provided "as is" without warranty of any kind. We shall not be liable for any direct or indirect damages, data loss, or server downtime resulting from the usage or inability to use this platform.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
