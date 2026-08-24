"use client";
import React, { useEffect, useState } from "react";
import { useUserContext } from "./contexts/UserContext";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOutIcon, UserIcon } from "lucide-react";
import gqlClient from "@/services/graphql";
import { LOGOUT } from "@/lib/gql/queries";
import { toast } from "sonner";
import { Spinner } from "./ui/Spinner";

export default function ProfileDropDown() {
  const { user, setUser } = useUserContext();
  const router = useRouter();
  const pathname = usePathname();
  const [loggingOut, setLoggingOut] = useState(false);
  const [navigatingProfile, setNavigatingProfile] = useState(false);

  useEffect(() => {
    setNavigatingProfile(false);
  }, [pathname]);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      const res: { logoutUser: boolean } = await gqlClient.request(LOGOUT);
      if (res.logoutUser) {
        toast("User logged out successfully!");
        setUser(null);
        window.location.href = "/";
      } else {
        toast("Something went wrong!");
      }
    } catch (err: any) {
      console.log(err.message);
      toast("Something went wrong!");
    } finally {
      setLoggingOut(false);
    }
  }

  const handleProfileClick = () => {
    setNavigatingProfile(true);
    router.push("/profile");
  };

  return (
    <div>
      {!user?.id ? (
        <div className="flex gap-4 items-center font-medium">
          <Button className="font-bold cursor-pointer">
            <Link href={"/login"} className="font-medium flex items-center gap-2">
              Login
            </Link>
          </Button>
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <Box maxWidth="240px">
              <Card className="hover:opacity-90 transition-opacity">
                <Flex gap="3" align="center">
                  <Avatar
                    size="3"
                    src={user?.avatar || ""}
                    radius="full"
                    fallback={user?.name.charAt(0).toUpperCase() || ""}
                  />
                  <Box>
                    <Text as="div" size="2" weight="bold">
                      {user?.name}
                    </Text>
                    <Text as="div" size="2" color="gray">
                      {user?.role}
                    </Text>
                  </Box>
                </Flex>
              </Card>
            </Box>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-50 bg-[#18191B] text-white border border-gray-800 font-medium"
            align="start"
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleProfileClick} className="cursor-pointer">
                <div className="flex gap-2 items-center w-full">
                  {navigatingProfile ? (
                    <Spinner size={16} />
                  ) : (
                    <UserIcon className="dark:text-white w-4 h-4" />
                  )}
                  <span>Profile</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} disabled={loggingOut} className="cursor-pointer">
              <div className="flex gap-2 items-center w-full text-red-400">
                {loggingOut ? (
                  <Spinner size={16} />
                ) : (
                  <LogOutIcon className="w-4 h-4" />
                )}
                <span>Logout</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
