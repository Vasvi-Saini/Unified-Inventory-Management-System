"use client";

import {
  Button,
  Dialog,
  Flex,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import React, { useContext, useState } from "react";

import { Pencil } from "lucide-react";

import { useUserContext } from "./contexts/UserContext";
import { Product } from "../../generated/prisma";
import { updateprod } from "@/lib/gql/mutation";
import gqlClient from "@/services/graphql";
import { toast } from "sonner";

function Updateproduct({prod}:{prod:Product}) {
    const {user}=useUserContext();
  const [title, settitle] = useState(prod.title);
  const [description, setdescription] = useState(prod.description);
  const [category, setcategory] = useState("others");
  const [price, setprice] = useState("99.9");
  const [stock, setstock] = useState("1");
  const [img_url, setimg] = useState(prod.imageUrl);

  async function handelupdateproduct(e: any) {
   e.preventDefault();
   e.stopPropagation();
    try {
      const resp: { updateproduct: Product } = await gqlClient.request(updateprod, {
            prodid:prod.id,
          title,
          description,
          category,
          price: parseFloat(price),
          stock: parseInt(stock),
          imgUrl: img_url,
        }
      );
      if (resp?.updateproduct) {
        alert("updated");
        settitle("");
        setdescription("");
        setcategory("others");
        setimg("");
        setprice("");
        setstock("");
      }
    } catch (e: any) {
      toast("Can't update product")
    }
  }

  if(user?.role!=="manager") return null;

  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <button className="hover:text-blue-600 cursor-pointer" onClick={(e)=> e.stopPropagation()}><Pencil size={20}/></button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Update product</Dialog.Title>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Title
              </Text>
              <TextField.Root
                value={title}
                placeholder="Enter your full name"
                onChange={(e) => settitle(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Description
              </Text>
              <TextField.Root
                placeholder="Enter your email"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Price
              </Text>
              <TextField.Root
                placeholder="Enter your email"
                value={price}
                onChange={(e) => setprice(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Stock
              </Text>
              <TextField.Root
                placeholder="Enter your email"
                value={stock}
                onChange={(e) => setstock(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Img_url
              </Text>
              <TextField.Root
                placeholder="Enter your email"
                value={img_url}
                onChange={(e) => setimg(e.target.value)}
              />
            </label>
            <Select.Root
              value={category}
              onValueChange={(value) => setcategory(value)}
            >
              <Select.Trigger />
              <Select.Content>
                <Select.Group>
                  <Select.Label>category</Select.Label>
                  <Select.Item value="food">food</Select.Item>
                  <Select.Item value="beauty">beauty</Select.Item>
                  <Select.Item value="accessories">accessories</Select.Item>
                  <Select.Item value="clothing">clothing</Select.Item>
                  <Select.Item value="furniture">furniture</Select.Item>
                  <Select.Item value="decor">decor</Select.Item>
                  <Select.Item value="electronics">electronics</Select.Item>
                  <Select.Item value="others">others</Select.Item>
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
              <Button onClick={handelupdateproduct}>Save</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}

export default Updateproduct;