import { useComputed } from "@preact/signals";

import { Product } from "./product";
import { category } from "../store/filter";
import type { Product as ProductType } from "../types";

interface Props {
  products: ProductType[]
}

export const Products = ({ products }: Props) => {
  const filtered = useComputed(() => {
    if (category.value === "All")
      return products

    return products.filter(product => product.category.toLocaleLowerCase() === category.value.toLocaleLowerCase())
  })

  return filtered.value.map(product => (
    <Product key={product.id} product={product} />
  ))
}
