'use client'
import { ADD_PRODUCT } from "@/lib/gql/mutation";
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

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(99.99);
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState("")

  async function handleAddUser(){
	try{
     const data : { addProduct : User}= await gqlClient.request(ADD_PRODUCT,{
		category,
    description,
    imageUrl,
    price,
    stock,
    title
	 })
	 if(data?.addProduct){
		alert("Product created successfully")
		setTitle("");
		setDescription("");		
		setCategory("");
		setPrice(0);			
		setImageUrl("");
        setStock(0)
		}
		else{
		alert("Failed to add Product");
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
          <Button>Add Product</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Add a new product to your store</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Enter product details..
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Title
              </Text>
              <TextField.Root
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Description
              </Text>
              <TextField.Root
                placeholder="Enter description "
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
               Price
              </Text>
              <TextField.Root
               type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(Number.parseInt(e.target.value))}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Stock
              </Text>
              <TextField.Root
              type="number"
                placeholder="Enter Stock"
                value={stock}
                onChange={(e) => setStock(Number.parseInt(e.target.value))}
              />
            </label>
            <Select.Root value={category} onValueChange={setCategory}>
              <Select.Trigger placeholder="Select a product" />
              <Select.Content>
                <Select.Group>
                  <Select.Label>Category</Select.Label>
                  <Select.Item value="electronics">Electronics</Select.Item>
                  <Select.Item value="clothing">Clothing</Select.Item>
                  <Select.Item value="food">Food</Select.Item>
                  <Select.Item value="accessories">Accessories</Select.Item>
                  <Select.Item value="beauty">Beauty</Select.Item>
                  <Select.Item value="furniture">Furniture</Select.Item>
                  <Select.Item value="decor">Decor</Select.Item>
                  <Select.Item value="others">Others</Select.Item>
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
