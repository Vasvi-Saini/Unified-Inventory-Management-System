import { getUserFromCookies } from "@/lib/helper";
import { generateToken } from "@/services/jwt";
import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";
import { RoleType } from "../../../../../generated/prisma";

export async function loginUser(
  _: any,
  args: { userCred: string; password: string }
) {
  try {
    const cookieStore = await cookies();

    const user = await prismaClient.user.findFirst({
      where: {
        OR: [
          {
            email: args.userCred,
          },
          {
            username: args.userCred,
          },
        ],
      },
    });

    if (!user) return false;

    if (user.password == args.password) {
      //set token

      const token = generateToken({ id: user.id });
      cookieStore.set("token", token);
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}

export async function createUser(
  _: any,
  args: {
    name: string;
    email: string;
    username: string;
    password: string;
    role: RoleType;
  }
) {
  try {
    const user = await getUserFromCookies();
    if (!user) return null;

    if (user.role != "admin") return null;

    const Createduser = await prismaClient.user.create({
      data: args,
    });

    return Createduser;
  } catch (e) {
    return null; // no user created
  }
}

export async function updateUserRole(
  _: any,
  args: { userId: string; role: RoleType }
) {
  try {
    const user = await getUserFromCookies();

    if (user?.role != "admin") return false;

    const updatedUser = await prismaClient.user.update({
      where: {
        id: args.userId,
      },
      data: {
        role: args.role,
      },
    });
    console.log("User role updated")
    return true;
  } catch (e : any) {
    console.log("err in role updation resolver", e.message)
    return false;
  }
}

export async function updateUserProfile(
  _: any,
  args: {
    name: string;
    username: string;
    email: string;
    avatar: string;
    userId: string;
  }
) {
  try {
    const user = await getUserFromCookies();

    const dataToSave = {
      name: args.name,
      email: args.email,
      username: args.username,
      avatar: args.avatar,
    };

    if (user?.role != "admin" && user?.id != args.userId) return false;

    await prismaClient.user.update({
      where: {
        id: args.userId,
      },
      data: dataToSave,
    });
    return true;
  } catch (e: any) {
    console.log("res err track",e.message)
    return false;
  }
}

export async function getAllUsers(_: any, args: { role: "staff" | "manager" }) {
  const roleToFind = args?.role || "";
  try {
    const users = await prismaClient.user.findMany({
      where: {
        role: {
          not : "admin",
        },
      }
    });
    return users;
  } catch (e) {
    return null;
  }
}

export async function logoutUser() {
  try {
    const cookie = await cookies();
    cookie.delete("token");
    return true;
  } catch (err: any) {
    console.log("error on logout ", err.message);
    return false;
  }
}

export async function deleteUser(
  _: any,
  args: {
    id: string;
  }
) {
  try {
    const res = await prismaClient.user.delete({
      where: {
        id: args.id,
      },
    });
    if (res.id) return true;
    return false;
  } catch (err: any) {
    console.log(err.message);
    return false;
  }
}

