"use client";
import { UPDATE_ROLE } from "@/lib/gql/mutation";
import gqlClient from "@/services/graphql";
import { Button, Dialog, Flex, Select } from "@radix-ui/themes";
import { Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { RoleType, User } from "../../../generated/prisma";

export default function EditUserBtn({user} : {user : User}) {
  
  const [role, setRole] = useState(user?.role);

  async function handleEditRole() {
    try {
      const res: { updateUserRole: boolean } = await gqlClient.request(
        UPDATE_ROLE,
        {
          userId: user?.id,
          role: role,
        }
      );
      console.log("res from user role updation", res);

      if (res.updateUserRole) {
        toast("user role updated successfully! ");
        return;
      }
      toast("Something went wrong while updating user");
    } catch (err: any) {
      console.log("err in updating role", err.message);
    }
  }
  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <Edit />
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Edit Role</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Select user role..
          </Dialog.Description>

          <Select.Root value={role} onValueChange={(val : RoleType)=>setRole(val)}>
            <Select.Trigger placeholder="Role" />
            <Select.Content>
              <Select.Group>
                <Select.Label>Role</Select.Label>
                <Select.Item value="manager">Manager</Select.Item>
                <Select.Item value="staff">Staff</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={handleEditRole}>Save</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
