import type { CollectionEntry } from "astro:content";

export type Product = CollectionEntry<"products">["data"];

export type Category = Product["category"] | "All";

export interface Item extends Omit<Product, "image"> {
  added: boolean;
  thumbnail: string;
  quantity: number;
  total: number;
}

export type PartialItem = Omit<Item, "total" | "quantity" | "added">;
