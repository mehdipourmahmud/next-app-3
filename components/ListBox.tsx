import { useState, Fragment } from 'react'
import { Combobox } from '@headlessui/react'
import {categoryFilters} from '../constants/index'



export default function MyCombobox({setsetCategory}) {
  const [selectedLink, setSelectedLink] = useState(categoryFilters[0])
  const [query, setQuery] = useState('')
  setsetCategory(selectedLink)
  const filteredLinks =
    query === ''
      ? categoryFilters
      : categoryFilters.filter((category) => {
          return category.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox value={selectedLink} onChange={setSelectedLink}>
      {/* Render a `Fragment` instead of an `input` */}
      <Combobox.Input
        as={Fragment}
        onChange={(event) => setQuery(event.target.value)}
        displayValue={(category) => category}
      >
        <input />
      </Combobox.Input>
      <Combobox.Options>
        {filteredLinks.map((category) => (
          <Combobox.Option key={category} value={category}>
            {category}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  )
}
