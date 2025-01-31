import type { Category } from "../types"

import { signal } from "@preact/signals"

const category = signal<Category>("All")

function change(value: Category) {
  category.value = value
}

export { category, change }
