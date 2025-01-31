import { signal, computed } from "@preact/signals";

import type { Item, PartialItem } from "../types";

const cart = signal<Item[]>([]);

/**
 * @returns Return the index of the item if exists, otherwise returns -1
*/
const findItem = (id: number) => cart.value.findIndex((i) => i.id == id);

function add(item: PartialItem) {
  if (findItem(item.id) != -1) return

  cart.value = cart.value.concat({ ...item, quantity: 1, total: item.price, added: true });
}
function increase(id: number) {
  const item = findItem(id)

  if (item != -1) {
    const updatedItem = cart.value[item];
    updatedItem.quantity++;
    updatedItem.total = updatedItem.price * updatedItem.quantity;

    cart.value = cart.value.toSpliced(item, 1, updatedItem);
  }
}
function isAdded(id: number) {
  return findItem(id) != -1;
}
function decrease(id: number) {
  const item = findItem(id);

  if (item != -1) {
    const updatedItem = cart.value[item];
    updatedItem.quantity--;
    updatedItem.total = updatedItem.price * updatedItem.quantity;

    if (updatedItem.quantity <= 0) return remove(id);

    cart.value = cart.value.toSpliced(item, 1, updatedItem);
  }
}
function quantity(id: number) {
  const item = findItem(id);
  if (item != -1) return cart.value[item].quantity;
}
function remove(id: number) {
  const item = cart.value.findIndex((i) => i.id == id);

  if (item != -1) cart.value = cart.value.toSpliced(item, 1);
}
function clear() {
  cart.value = [];
}
const totalQuantity = computed(() =>
  cart.value.reduce((acc, item) => acc + item.quantity, 0)
);
const total = computed(() =>
  cart.value.reduce((acc, item) => acc + item.total, 0)
);

export {
  cart,
  total,
  totalQuantity,
  isAdded,
  clear,
  quantity,
  add,
  increase,
  decrease,
  remove
};
