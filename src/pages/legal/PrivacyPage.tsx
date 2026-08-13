import { Eye, Lock, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function PrivacyPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-zinc-50 pb-16 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="mx-auto max-w-4xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-zinc-200 pb-6 dark:border-zinc-800/80">
          <div className="flex items-center gap-2">
            <span className="rounded-xs bg-zinc-200 px-2 py-0.5 font-mono text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              LEGAL / SECURITY
            </span>
          </div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {t("footer.privacyPolicy", "Privacy Policy")}
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Last Updated: August 13, 2026. Review how we protect and manage your personal data.
          </p>
        </div>

        {/* Content */}
        <div className="mt-8 space-y-8 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Eye className="h-4.5 w-4.5 text-zinc-500" />
              1. Information We Collect
            </h2>
            <p>
              We collect information that you directly provide to us, including registration profile credentials, product updates inside your workspace catalogs, and preference themes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Lock className="h-4.5 w-4.5 text-zinc-500" />
              2. How We Protect Your Data
            </h2>
            <p>
              Your security is our priority. We enforce industry-standard TLS encryption, strict password hashing protocols, and role-based workspace permissions to secure credentials from unauthorized access.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="h-4.5 w-4.5 text-zinc-500" />
              3. Data Retention & Deletion
            </h2>
            <p>
              You retain full ownership of your records. You may update or delete product listings, request database purges, or deactivate admin user access points directly from your dashboard settings.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
