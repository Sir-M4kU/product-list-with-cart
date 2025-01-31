import { useComputed } from "@preact/signals";
import type { Product as Data } from "../types";
import { AddToCart } from "./add-to-cart";
import { isAdded } from "../store/cart";
import { cn } from "../utils";

interface Props {
  product: Data;
}

const addedClass = "border-terracota";

export const Product: preact.FunctionComponent<Props> = ({ product }) => {
  const { id, name, price, category, image } = product;
  const added = useComputed(() => isAdded(id));

  return (
    <article class="space-y-4">
      <section>
        <img
          src={image.desktop}
          alt={name}
          width={237}
          height={227}
          class={cn(
            "hidden h-auto rounded-lg border-2 border-transparent lg:block",
            added.value && addedClass
          )}
          loading="lazy"
          decoding="async"
        />
        <img
          src={image.mobile}
          alt={name}
          width={654}
          height={424}
          class={cn(
            "h-auto rounded-lg border-2 border-transparent md:hidden",
            added.value && addedClass
          )}
          loading="lazy"
          decoding="async"
        />
        <img
          src={image.tablet}
          alt={name}
          width={427}
          height={424}
          class={cn(
            "hidden h-auto rounded-lg border-2 border-transparent md:block lg:hidden",
            added.value && addedClass
          )}
          loading="lazy"
          decoding="async"
        />
        <AddToCart product={product} />
      </section>

      <section class="lg:space-y-1">
        <p class="text-slate-500">{category}</p>
        <h2 class="font-semibold">{name}</h2>
        <p class="text-terracota font-semibold">${price.toFixed(2)}</p>
      </section>
    </article>
  );
};
