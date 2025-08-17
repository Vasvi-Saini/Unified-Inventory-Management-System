import { DELETE_USER } from "@/lib/gql/mutation";
import gqlClient from "@/services/graphql";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { toast } from "sonner";
import { useUserContext } from "../contexts/UserContext";
import { Trash } from "lucide-react";

export default function DeleteUserBtn() {
  const { user } = useUserContext();
  async function handleremove() {
    try {
      const res: { deleteUser: boolean } = await gqlClient.request(
        DELETE_USER,
        {
          userId: user?.id,
        }
      );
      if (res.deleteUser) {
        toast("User deleted successfully");
      } else {
        toast("Something went wrong while deleteting user");
      }
    } catch (err: any) {
      console.log("err in deleting user", err.message);
    }
  }

  return (
    <div>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Trash />
        </AlertDialog.Trigger>

        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Remove user</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure? you want to remove this user.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray" style={{ cursor: "pointer" }}>
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <button
                onClick={handleremove}
                className="px-3 py-1 bg-red-600 text-white rounded"
                style={{ cursor: "pointer" }}
              >
                Remove
              </button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
}
