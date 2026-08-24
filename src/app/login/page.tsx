"use client";
import { LOGIN_USER } from "@/lib/gql/queries";
import gqlClient from "@/services/graphql";
import { Button, Card, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

export default function page() {
  const [userCred, setUserCred] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{
    message?: string;
  }>({});

  const [loading, setLoading] = useState(false);

  async function performLogin(cred: string, pass: string) {
    setError({});
    setLoading(true);
    try {
      const data: { loginUser: boolean } = await gqlClient.request(LOGIN_USER, {
        userCred: cred,
        password: pass,
      });
      if (data.loginUser) {
        toast("LoggedIn successfully...");
        window.location.href = "/";
      } else {
        setError({
          message: "Invalid Credentials!",
        });
      }
    } catch (e) {
      setError({
        message: "Something went wrong",
      });
    }
    setLoading(false);
  }

  function handleDemoLogin() {
    const demoEmail = "admin04@gmail.com";
    const demoPass = "Admin@04";
    setUserCred(demoEmail);
    setPassword(demoPass);
    performLogin(demoEmail, demoPass);
  }

  return (
    <main className="px-4">
      <div className="w-full h-screen flex justify-center items-center">
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className="p-6 sm:p-8 w-full max-w-sm sm:w-96 shadow-lg border border-gray-200 dark:border-gray-800"
        >
          <div className="flex flex-col gap-4 p-2 items-center mb-2">
            <div className="flex items-center space-x-3">
              <Image
                src="/icon.png"
                alt="UIMS Logo"
                width={44}
                height={44}
                className="w-11 h-11 rounded-xl object-cover shadow-md"
              />
              <span className="dark:text-white text-black font-semibold text-xl">
                UIMS
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Inventory Management System</p>
          </div>

          <div className="w-full space-y-4">
            <TextField.Root
              placeholder="Enter Username or Email.."
              value={userCred}
              onChange={(e) => setUserCred(e.target.value)}
              className="w-full"
            />
            <TextField.Root
              type="password"
              placeholder="Enter Password.."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>

          {error.message && (
            <Text style={{ color: "red" }} className="mt-3 text-sm">{error.message}</Text>
          )}

          <div className="w-full flex flex-col gap-3 mt-6">
            <Button
              disabled={loading}
              onClick={() => performLogin(userCred, password)}
              className="w-full cursor-pointer py-2.5 font-medium"
            >
              <Text>{loading ? "Signing in..." : "Login"}</Text>
            </Button>
            <Button
              disabled={loading}
              onClick={handleDemoLogin}
              className="w-full cursor-pointer py-2.5 font-medium"
            >
              <Text>{loading ? "Signing in..." : "Try Demo Login"}</Text>
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
