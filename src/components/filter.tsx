import type { Category } from "../types";
import { useId, useCallback } from "preact/hooks"

import { change } from "../store/filter"

const categories: Category[] = ["All", "Cake", "Panna Cotta", "Pie", "Brownie", "Baklava", "Macaron", "Tiramisu", "Crème Brûlée", "Waffle"]

export const Filter = () => {
  const id = useId()

  const handleChange = useCallback<preact.JSX.GenericEventHandler<HTMLSelectElement>>((e) => {
    change(e.currentTarget.value as Category)
  }, [])
  return (
    <section >
      <label class="block" for={id}>Select a category:</label>

      <select class="w-full" onChange={handleChange} name="category" id={id}>
        {categories.map(category => (
          <option value={category}>{category}</option>
        ))}
      </select>
    </section>
  )
}
