import { Mail, MessageSquare, ShieldQuestion } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function HelpPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-zinc-50 pb-16 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-zinc-200 pb-6 dark:border-zinc-800/80">
          <div className="flex items-center gap-2">
            <span className="rounded-xs bg-zinc-200 px-2 py-0.5 font-mono text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              SUPPORT / HELP CENTER
            </span>
          </div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {t("footer.helpCenter", "Help Center")}
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Find answers to frequently asked questions or contact our support team.
          </p>
        </div>

        {/* FAQs */}
        <div className="mt-8 space-y-6">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <ShieldQuestion className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">How do I add a new product?</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                Simply click the + Add Product button in the navbar or top of the products catalog. Fill in the title, description, colors, categories and submit.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Can I change user permissions?</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                Yes, navigate to the User Management page from the navigation bar. Click edit on any user account to adjust their roles and status.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Where is theme context saved?</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                The application saves light/dark theme presets inside the browser's localStorage, persisting user choices automatically across page reloads.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">How to connect with the AI chatbot?</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                Click the floating AI assistance button in the bottom right corner of the dashboard screen to prompt suggestions, filter products or ask dashboard statistics.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <Mail className="h-10 w-10 text-zinc-500" />
            <div>
              <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Email Support</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">support@admindash.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <MessageSquare className="h-10 w-10 text-zinc-500" />
            <div>
              <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Live Chat</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Available 24/7 inside your workspace</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
