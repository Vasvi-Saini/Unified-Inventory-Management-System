"use client";
import { DELETE_PRODUCT } from "@/lib/gql/mutation";
import gqlClient from "@/services/graphql";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import { useUserContext } from "./contexts/UserContext";
import { toast } from "sonner";
import { Spinner } from "./ui/Spinner";

function Removeprod({ id }: { id: string }) {
  const { user } = useUserContext();
  const [deleting, setDeleting] = useState(false);

  async function handleremove() {
    setDeleting(true);
    try {
      const resp: { deleted: boolean } = await gqlClient.request(
        DELETE_PRODUCT,
        {
          id,
        }
      );
      if (resp?.deleted) {
        toast("product deleted successfully");
        window.location.reload();
      } else {
        toast("product deletion failed");
      }
    } catch (e: any) {
      toast("product deletion failed");
    } finally {
      setDeleting(false);
    }
  }

  if (user?.role != "manager") return null;
  return (
    <div>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <button onClick={(e) => e.stopPropagation()} className="cursor-pointer hover:text-red-500 transition-colors">
            <Trash size={20} />
          </button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Remove Product</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure? You want to remove this product.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray" disabled={deleting}>
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <button
              disabled={deleting}
              onClick={handleremove}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-medium cursor-pointer disabled:opacity-50"
            >
              {deleting ? <Spinner size={16} /> : null}
              {deleting ? "Removing..." : "Remove"}
            </button>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
}

export default Removeprod;
