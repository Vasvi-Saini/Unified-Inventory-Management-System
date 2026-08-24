"use client";
import { CREATE_SALE } from "@/lib/gql/mutation";
import gqlClient from "@/services/graphql";
import { useState } from "react";
import { Product } from "../../../generated/prisma";
// import { toast } from "sonner";

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
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";


export default function AddSaleButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  function clearFields() {
    setQuantity(1);
  }

  async function handleSale() {
    if (product.stock < quantity || quantity <= 0) {
      toast("Sale quantity can not be more than available stock!");
      return;
    }

    setLoading(true);
    try {
      const data: { createSale: Boolean } = await gqlClient.request(
        CREATE_SALE,
        {
          createSaleId: product.id,
          quantity,
        }
      );
      if (data?.createSale) {
        toast("Sale Created Successfully!");
        clearFields();
        window.location.reload();
      } else {
        toast("Sale creation aborted!");
      }
    } catch (e: any) {
      console.log(e.message);
      toast("Error creating sale!");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button className="cursor-pointer" variant="outline">
              {" "}
              Sale Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Sale Product</DialogTitle>
              <DialogDescription>
                Select quantity. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Quantity</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value || "0"))}
                  placeholder="Enter quantity"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={handleSale}>Save</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
