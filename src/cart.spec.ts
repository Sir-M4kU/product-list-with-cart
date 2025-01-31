import type { PartialItem } from "./types"
import { describe, afterEach, expect, test } from "vitest"

import { cart, clear, add, remove, increase, decrease } from "./store/cart"

describe("Cart tests", () => {
  afterEach(() => {
    clear()
  })

  const item: PartialItem = {
    name: "Item 1",
    price: 100,
    id: 1,
    thumbnail: ""
  }

  test("Add to cart", () => {
    expect(cart.value).toHaveLength(0)

    add(item)

    expect(cart.value).toHaveLength(1)
    expect(cart.value[0].name).toBe(item.name)
  })

  test("Remove from cart", () => {
    add(item)
    expect(cart.value).toHaveLength(1)

    remove(item.id)
    expect(cart.value).toHaveLength(0)
  })

  test("Increase quantity", () => {
    add(item)
    expect(cart.value).toHaveLength(1)

    increase(item.id)
    expect(cart.value[0].quantity).toBe(2)
  })

  test("Decrease quantity", () => {
    add(item)
    expect(cart.value[0].quantity).toBe(1)

    increase(item.id)
    expect(cart.value[0].quantity).toBe(2)

    decrease(item.id)
    expect(cart.value[0].quantity).toBe(1)
  })

  test("Decrease and remove", () => {
    add(item)

    expect(cart.value[0].quantity).toBe(1)

    decrease(item.id)
    expect(cart.value).toHaveLength(0)
  })
})
