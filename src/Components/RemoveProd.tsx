"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React from "react";
import { Trash } from "lucide-react";
import { useUserContext } from "./contexts/UserContext";
import gqlClient from "@/services/graphql";
import { removeProd } from "@/lib/gql/mutation";
function Removeprod({ id }: { id: string }) {
  const { user } = useUserContext();

  async function handleremove(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    try {
      const resp: { removeprod: boolean } = await gqlClient.request(
        removeProd,
        {
          removeprodId: id,
        }
      );
      if (resp?.removeprod) {
        alert("removed");
      }
    } catch (e: any) {
      alert("failed");
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
            <AlertDialog.Action asChild>
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
