import React from "react"
import { FaCheckCircle } from "@meronex/icons/fa"
import "./styles.scss"

function ItemList({ items}) {
  return (
    <ul styleName={`item-list`}>
      {items.map((item, index) => (
        <li key={index} styleName={item.disabled ? "disabled" : ""} onClick={item.action}>
          <FaCheckCircle />
          <div styleName={item.description ? "with-description" : ""}>
            <div styleName="title">{item.title}</div>
            {item.description && <div styleName="description">{item.description}</div>}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ItemList
