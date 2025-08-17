'use client'
import { CREATE_USER } from "@/lib/gql/mutation";
import gqlClient from "@/services/graphql";
import {
	Button,
	Dialog,
	Flex,
	Select,
	Text,
	TextField,
} from "@radix-ui/themes";
import { useState } from "react";
import { User } from "../../../generated/prisma";

export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff");

  async function handleAddUser(){
	try{
     const data : {createUser : User}  = await gqlClient.request(CREATE_USER,{
		name, email, role, username, password
	 })
	 if(data?.createUser){
		alert("User created successfully")
		setName("");
		setEmail("");		
		setUserName("");
		setPassword("");			
		setRole("staff");
		}
		else{
		alert("Failed to create user");
		}
	}
	catch(e: any){
      alert(e.message);
	}
  }

  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button className="flex gap-2">
          <img src="plus.png" alt="" height={1} width={15}/>
             Member</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Add a new member to your store</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Enter user details..
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Name
              </Text>
              <TextField.Root
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Username
              </Text>
              <TextField.Root
                placeholder="Enter username "
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Email
              </Text>
              <TextField.Root
                placeholder="Enter Eamil"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Password
              </Text>
              <TextField.Root
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <Select.Root value={role} onValueChange={setRole}>
              <Select.Trigger />
              <Select.Content>
                <Select.Group>
                  <Select.Label>Role</Select.Label>
                  <Select.Item value="manager">Manager</Select.Item>
                  <Select.Item value="staff">Staff</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={handleAddUser}>Save</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
