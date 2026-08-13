import { Key, Server, Terminal } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ApiPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-zinc-50 pb-16 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-zinc-200 pb-6 dark:border-zinc-800/80">
          <div className="flex items-center gap-2">
            <span className="rounded-xs bg-zinc-200 px-2 py-0.5 font-mono text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              SUPPORT / DEVELOPERS
            </span>
          </div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {t("footer.apiReference", "API Reference")}
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Integrate your business applications with the Admin Dashboard API endpoints.
          </p>
        </div>

        {/* Code Block Example Section */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">Authentication</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                Authenticate your API requests by including your secret API key in the request headers. Keep your keys secure and do not share them in public spaces.
              </p>
              <div className="mt-4 flex items-center gap-3 rounded-xl bg-zinc-50 p-3.5 dark:bg-zinc-800/50">
                <Key className="h-4 w-4 text-zinc-500" />
                <code className="text-xs font-mono text-zinc-700 dark:text-zinc-300">
                  Authorization: Bearer YOUR_API_KEY
                </code>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">Endpoint Overview</h3>
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                All requests are secure HTTPS calls directed to the following production base URL.
              </p>
              <div className="mt-4 flex items-center gap-3 rounded-xl bg-zinc-50 p-3.5 dark:bg-zinc-800/50">
                <Server className="h-4 w-4 text-zinc-500" />
                <code className="text-xs font-mono text-zinc-700 dark:text-zinc-300">
                  https://api.admindash.com/v2
                </code>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-zinc-900 p-6 text-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <Terminal className="h-5 w-5 text-zinc-400" />
              <span className="font-mono text-xs font-bold text-zinc-300">Example Request</span>
            </div>
            <pre className="mt-4 overflow-x-auto rounded-xl bg-black p-4 font-mono text-[10px] leading-relaxed text-emerald-400">
{`curl -X GET \\
  https://api.admindash.com/v2/products \\
  -H "Authorization: Bearer key_live_abc" \\
  -H "Content-Type: application/json"`}
            </pre>
            <div className="mt-4 border-t border-zinc-800 pt-4">
              <span className="font-mono text-[10px] text-zinc-400">Response Status</span>
              <div className="mt-1 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="font-mono text-xs text-zinc-200">200 OK</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
