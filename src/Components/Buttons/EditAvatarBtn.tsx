import { Camera } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import gqlClient from "@/services/graphql";
import { UPDATE_USER } from "@/lib/gql/mutation";
import { useUserContext } from "../contexts/UserContext";
import { UserWithoutPassword } from "@/types";

export default function EditAvatarBtn({
  avatar,
  setAvatar,
}: {
  avatar: string | undefined | null;
  setAvatar: (val: string) => void;
}) {
  const { user, setUser } = useUserContext();

  async function handleEditAvatar() {
    if (!user) return;
    try {
      const res = await gqlClient.request(UPDATE_USER, {
        userId: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        avatar: avatar,
      });
      console.log("res from edit avatar", res);
      setUser({ ...user, avatar: avatar || null });
    } catch (err) {
      console.error("Failed to update avatar: ", err);
    }
  }

  return (
    <div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <button className="absolute cursor-pointer bottom-0 right-0 text-black bg-white border-2 border-black p-2 rounded-full hover:bg-black hover:text-white transition-colors duration-200">
              <Camera size={16} />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Set Avatar</DialogTitle>
              <DialogDescription>
                Enter URL of the image. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="avatar">Avatar</Label>
                <Input
                  id="avatar"
                  value={avatar || ""}
                  onChange={(e) => setAvatar(e.target.value || "")}
                  placeholder="Enter url"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={handleEditAvatar}>Save</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
