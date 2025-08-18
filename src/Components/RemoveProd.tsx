"use client";
import { DELETE_PRODUCT } from "@/lib/gql/mutation";
import gqlClient from "@/services/graphql";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { Trash } from "lucide-react";
import React from "react";
import { useUserContext } from "./contexts/UserContext";
import { toast } from "sonner";
function Removeprod({ id }: { id: string }) {
  const { user } = useUserContext();

  async function handleremove() {
   
    try {
      const resp: { deleted: boolean } = await gqlClient.request(
        DELETE_PRODUCT,
        {
         id,
        }
      );
      if (resp?.deleted) {
        toast("product deleted successfully");
      }
    } catch (e: any) {
      toast("product deletion failed");
    }
  }
  if (user?.role != "manager") return null;
  return (
    <div>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <button onClick={(e) => e.stopPropagation()}>
            <Trash size={20} />
          </button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Remove Product</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure? you want to remove this Product.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action >
              <button
                onClick={handleremove}
                className="px-3 py-1 bg-red-600 text-white rounded"
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

export default Removeprod;
