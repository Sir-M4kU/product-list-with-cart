import { useCallback } from "preact/hooks";
import { useComputed } from "@preact/signals";

import type { Product } from "../types";
import { CartIcon, IncrementIcon, DecrementIcon } from "./icons";
import { add, quantity, isAdded, increase, decrease } from "../store/cart";
import { cn } from "../utils";

interface Props {
  product: Product;
}

const style =
  "relative -mt-6 -translate-x-1/2 left-1/2 w-[164px] text-sm font-semibold flex items-center py-2.5 rounded-full";

export const AddToCart: preact.FunctionComponent<Props> = ({ product }) => {
  const { id, name, category, price, image } = product;
  const added = useComputed(() => isAdded(id));
  const totalQuantity = useComputed(() => quantity(id));

  const addToCart = useCallback(() => {
    add({ id, category, name, price, thumbnail: image.thumbnail });
  }, [id]);
  const hadleIncrease = useCallback(() => increase(id), [id]);
  const handleDecrease = useCallback(() => decrease(id), [id]);

  return added.value ? (
    <div
      class={cn(
        style,
        "bg-terracota border-terracota justify-between border px-3 text-white"
      )}
    >
      <button onClick={handleDecrease}>
        <DecrementIcon class="hover:text-terracota h-5 w-5 rounded-full border border-white p-1 hover:bg-white" />
      </button>
      <span class="flex h-6 items-center">{totalQuantity.value}</span>
      <button onClick={hadleIncrease}>
        <IncrementIcon class="hover:text-terracota h-5 w-5 rounded-full border border-white p-1 hover:bg-white" />
      </button>
    </div>
  ) : (
    <button
      onClick={addToCart}
      class={cn(
        style,
        "hover:border-terracota hover:text-terracota gap-3 border border-slate-400 bg-white px-6 font-semibold transition-colors"
      )}
    >
      <CartIcon class="h-6 w-6" />
      Add to Cart
    </button>
  );
};
