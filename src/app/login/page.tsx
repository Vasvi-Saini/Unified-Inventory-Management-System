"use client";
import { LOGIN_USER } from "@/lib/gql/queries";
import gqlClient from "@/services/graphql";
import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Spinner } from "@/Components/ui/Spinner";
import { Lock, Mail, Sparkles } from "lucide-react";

export default function page() {
  const [userCred, setUserCred] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{
    message?: string;
  }>({});

  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  async function performLogin(cred: string, pass: string, isDemo = false) {
    if (!cred || !pass) {
      setError({ message: "Please fill in all fields." });
      return;
    }
    setError({});
    if (isDemo) setDemoLoading(true);
    else setLoading(true);

    try {
      const data: { loginUser: boolean } = await gqlClient.request(LOGIN_USER, {
        userCred: cred,
        password: pass,
      });
      if (data.loginUser) {
        toast.success("Logged in successfully!");
        window.location.href = "/";
      } else {
        setError({
          message: "Invalid credentials! Please try again.",
        });
      }
    } catch (e: any) {
      setError({
        message: e?.message || "Something went wrong during authentication.",
      });
    } finally {
      setLoading(false);
      setDemoLoading(false);
    }
  }

  function handleDemoLogin() {
    const demoEmail = "admin04@gmail.com";
    const demoPass = "Admin@04";
    setUserCred(demoEmail);
    setPassword(demoPass);
    performLogin(demoEmail, demoPass, true);
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      performLogin(userCred, password);
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center px-4 relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6">
          {/* Header & Logo */}
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="relative">
              <Image
                src="/icon.png"
                alt="UIMS Logo"
                width={56}
                height={56}
                className="w-14 h-14 rounded-2xl object-cover shadow-xl border border-white/10 transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Welcome to <span className="text-blue-400">UIMS</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Unified Inventory Management System
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1.5 ml-1">
                Username or Email
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Enter username or email..."
                  value={userCred}
                  onChange={(e) => setUserCred(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1.5 ml-1">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="password"
                  placeholder="Enter password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Error Banner */}
          {error.message && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium text-center animate-shake">
              {error.message}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              disabled={loading || demoLoading}
              onClick={() => performLogin(userCred, password)}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white rounded-xl font-semibold text-sm shadow-lg shadow-blue-600/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && <Spinner size={18} />}
              <span>{loading ? "Signing in..." : "Login"}</span>
            </button>

            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-white/10 w-full" />
              <span className="bg-gray-900/80 px-3 text-[11px] font-medium text-gray-400 uppercase tracking-wider absolute">
                OR
              </span>
            </div>

            <button
              disabled={loading || demoLoading}
              onClick={handleDemoLogin}
              className="w-full py-3 px-4 bg-white/10 hover:bg-white/15 active:scale-[0.99] text-white border border-white/10 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {demoLoading ? (
                <Spinner size={18} />
              ) : (
                <Sparkles className="w-4 h-4 text-blue-400" />
              )}
              <span>{demoLoading ? "Logging into Demo..." : "Try Demo Login"}</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
