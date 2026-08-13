import { BookOpen, Compass, FileText, Search } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function DocsPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-zinc-50 pb-16 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-zinc-200 pb-6 dark:border-zinc-800/80">
          <div className="flex items-center gap-2">
            <span className="rounded-xs bg-zinc-200 px-2 py-0.5 font-mono text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              SUPPORT / DOCUMENTATION
            </span>
          </div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {t("footer.documentation", "Documentation")}
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Learn how to manage, configure, and scale your Admin Dashboard experience.
          </p>
        </div>

        {/* Content Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <BookOpen className="h-8 w-8 text-zinc-700 dark:text-zinc-300" />
            <h3 className="mt-4 text-base font-bold text-zinc-900 dark:text-white">Getting Started</h3>
            <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              Step-by-step setup guides to deploy, connect database environments, and run localized builds.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <Compass className="h-8 w-8 text-zinc-700 dark:text-zinc-300" />
            <h3 className="mt-4 text-base font-bold text-zinc-900 dark:text-white">Core Concepts</h3>
            <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              Understand data models, user roles, state preset configurations, and localization structures.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <FileText className="h-8 w-8 text-zinc-700 dark:text-zinc-300" />
            <h3 className="mt-4 text-base font-bold text-zinc-900 dark:text-white">Advanced Guides</h3>
            <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              Integrate custom analytics widgets, export charts data, and manage secure server mutations.
            </p>
          </div>
        </div>

        {/* Search Bar Placeholder */}
        <div className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-100/50 p-8 text-center dark:border-zinc-800 dark:bg-zinc-900/50">
          <Search className="mx-auto h-8 w-8 text-zinc-400" />
          <h3 className="mt-4 text-sm font-semibold text-zinc-900 dark:text-white">Need quick help?</h3>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Search our comprehensive documentation database.
          </p>
          <div className="mx-auto mt-4 max-w-md">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
