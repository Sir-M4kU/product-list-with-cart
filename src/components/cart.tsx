import { useCallback } from "preact/hooks";

import type { Item } from "../types";
import { RemoveIcon, CarbonNeutralIcon, Cake } from "./icons";
import { ConfirmOrder } from "./confirm-order";
import { cart, totalQuantity, remove, total } from "../store/cart";

const EmptyCart: preact.FunctionComponent = () => (
  <>
    <Cake class="" />
    <p class="text-sm font-semibold text-antique-rose-500">
      Your added items will appear here
    </p>
  </>
);

const Item: preact.FunctionComponent<Item> = ({
  id,
  name,
  quantity,
  price,
  total
}) => {
  const handleRemove = useCallback(() => {
    remove(id);
  }, [id]);

  return (
    <li class="w-full border-slate-100 py-[18px] has-[+li]:border-b">
      <article class="flex items-center">
        <section class="flex-grow space-y-2 text-sm">
          <h3 class="font-semibold">{name}</h3>
          <section class="inline-flex">
            <p class="text-terracota mr-4 font-semibold">{quantity}x</p>
            <p class="mr-2 text-antique-rose-500">@ ${price.toFixed(2)}</p>
            <p class="font-semibold text-antique-rose-500">${total.toFixed(2)}</p>
          </section>
        </section>

        <button
          onClick={handleRemove}
          class="rounded-full border border-antique-rose-400 text-antique-rose-400 transition-colors hover:border-antique-rose-500 hover:text-antique-rose-500"
        >
          <RemoveIcon class="h-4 w-4 p-1" />
        </button>
      </article>
    </li>
  );
};

export const Cart: preact.FunctionComponent = () => {
  const items = cart.value;

  return (
    <section class="space-y-2 rounded-lg border border-slate-100 bg-white p-6 lg:h-fit lg:min-w-96">
      <h2 class="text-terracota text-2xl font-bold">
        Your Cart ({totalQuantity.value})
      </h2>

      <section class="flex flex-col items-center gap-4">
        {items.length > 0 ? (
          <section class="w-full">
            <section class="space-y-6">
              <ul class="border-b-2">
                {items.map((item) => (
                  <Item key={item.id} {...item} />
                ))}
              </ul>

              <section class="flex items-center justify-between">
                <p class="text-sm">Order Total</p>
                <p class="text-2xl font-bold text-antique-rose-900">
                  ${total.value.toFixed(2)}
                </p>
              </section>

              <section class="flex w-full items-center justify-center gap-1 rounded-lg bg-antique-rose-50 p-4 text-sm text-antique-rose-900">
                <CarbonNeutralIcon class="h-6 w-6" />
                <p>
                  This is a <span class="font-semibold">carbon-neutral</span>{" "}
                  delivery
                </p>
              </section>
            </section>

            <ConfirmOrder order={items} />
          </section>
        ) : (
          <EmptyCart />
        )}
      </section>
    </section>
  );
};
