import { useRef, useCallback } from "preact/hooks";

import type { Item } from "../types";
import { total, clear } from "../store/cart";
import { ConfirmOrderIcon } from "./icons";

interface Props {
  order: Item[];
}

const Button: preact.FunctionComponent<{
  label: string;
  onClick: preact.JSX.MouseEventHandler<HTMLButtonElement>;
}> = ({ label, onClick }) => (
  <button
    onClick={onClick}
    class="bg-terracota mt-6 w-full rounded-full p-4 font-semibold text-white transition-colors hover:bg-amber-800"
  >
    {label}
  </button>
);

const Order: preact.FunctionComponent<Item> = ({
  name,
  thumbnail,
  quantity,
  price,
  total
}) => (
  <li class="w-full border-slate-100 py-3 has-[+li]:border-b-2 lg:py-4">
    <article class="flex items-center gap-3">
      <img
        src={thumbnail}
        class="rounded-md"
        alt={name}
        width={50}
        height={50}
        loading="lazy"
        decoding="async"
      />
      <section class="flex-grow overflow-hidden text-sm">
        <h3 class="mb-2 truncate font-semibold">{name}</h3>
        <p class="text-terracota mr-3 inline font-semibold">{quantity}x</p>
        <p class="inline text-antique-rose-500">@ ${price.toFixed(2)}</p>
      </section>
      <p class="font-semibold">${total.toFixed(2)}</p>
    </article>
  </li>
);

export const ConfirmOrder: preact.FunctionComponent<Props> = ({ order }) => {
  const dialog = useRef<HTMLDialogElement>(null);

  const closeDialog = useCallback(() => {
    if (dialog.current) {
      dialog.current.close();
      clear();
    }
  }, []);
  const openDialog = useCallback(() => {
    if (dialog.current) {
      dialog.current.showModal();
    }
  }, []);

  return (
    <>
      <Button label="Confirm Order" onClick={openDialog} />
      <dialog
        class="m-0 h-full w-full bg-transparent backdrop:bg-black/50 lg:m-auto lg:h-fit lg:w-fit"
        ref={dialog}
      >
        <section class="fixed bottom-0 flex flex-col left-0 max-h-[90vh] lg:max-h-fit w-full gap-6 rounded-t-lg bg-white p-6 lg:static lg:m-auto lg:w-[590px] lg:rounded-lg lg:p-10">
          <ConfirmOrderIcon class="w-12 h-12" />
          <section class="space-y-2">
            <h3 class="text-[40px] font-bold leading-tight lg:whitespace-normal">
              Order Confirmed
            </h3>
            <p class="text-antique-rose-500">We hope you enjoy your food!</p>
          </section>

          <section class="space-y-4 rounded-lg bg-antique-rose-50 px-6 py-4">
            <ul class="border-b-2 overflow-y-auto max-h-[30svh] md:max-h-[40svh] lg:h-fit pb-3">
              {order.map((order) => (
                <Order key={order.id} {...order} />
              ))}
            </ul>

            <section class="inline-flex w-full items-center justify-between">
              <p class="text-sm">Order Total</p>
              <p class="py-3 text-2xl font-bold">${total.value.toFixed(2)}</p>
            </section>
          </section>

          <Button label="Place New Order" onClick={closeDialog} />
        </section>
      </dialog>
    </>
  );
};
