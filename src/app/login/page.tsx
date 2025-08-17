"use client";
import { LOGIN_USER } from "@/lib/gql/queries";
import gqlClient from "@/services/graphql";
import { Button, Card, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { toast } from "sonner";

export default function page() {
  const [userCred, setUserCred] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{
    message?: string;
  }>({});

  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError({});
    setLoading(true);
    try {
      const data: { loginUser: boolean } = await gqlClient.request(LOGIN_USER, {
        userCred,
        password,
      });
      if (data.loginUser) {
        toast("LoggedIn successfully...");
        window.location.href = "/";
      }
       else {
        setError({
          message: "Invalid Credentials!",
        });
      }
    }
     catch (e) {
      setError({
        message: "Something went wrong",
      });
    }
    setLoading(false);
  }

  return (
    <main>
      <div className="w-full h-screen flex justify-center items-center gap-5  ">
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border : "2"
          }}
        >
         <div className=" gap-5 p-4 ">

           <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="dark:text-white text-black font-semibold text-xl">UIMS</span>
            </div>
           </div>
          
          {/* <Heading align={"center"} style={{margin : "20px 0"}}>Store Management </Heading> */}
          <TextField.Root
            placeholder="Enter Username or Email.."
            value={userCred}
            onChange={(e) => setUserCred(e.target.value)}
            className="w-96 mb-5"
          />
          <TextField.Root
            placeholder="Enter Password.."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-96 mb-5"
          />
          {error.message && (
            <Text style={{ color: "red" }}>{error.message}</Text>
          )}
          <Button
            disabled={loading}
            onClick={handleLogin}
            style={{ width: "100%", margin: "20px 0" }}
          >
            <Text>Login</Text>
          </Button>
        </Card>
      </div>
     
    </main>
  );
}
