import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";

const product = z.object({
  id: z.number(),
  image: z.object({
    thumbnail: z.string(),
    mobile: z.string(),
    tablet: z.string(),
    desktop: z.string()
  }),
  name: z.string(),
  category: z.enum(["Cake", "Panna Cotta", "Pie", "Brownie", "Baklava", "Macaron", "Tiramisu", "Crème Brûlée", "Waffle"]),
  price: z.number()
});

const products = defineCollection({
  loader: file("src/assets/data.json"),
  schema: product
});

export const collections = {
  products
};
