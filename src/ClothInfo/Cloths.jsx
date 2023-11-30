import React from 'react'

import { MdDeleteOutline } from "react-icons/md";

const Cloths = ({item, deleteHandler}) => {
    const {ClothName, ClothId, price, quantity, colors, size, manufacDate, description} = item;
    
  return (
    <tr>
        <td style={{textAlign: "center"}}>{ClothId}</td>
        <td>{ClothName}</td>
        <td>{price}</td>
        <td>{quantity}</td>
        <td>{size}</td>
        <td>{colors}</td>
        <td style={{wordWrap: "break-word"}}>{description}</td>
        <td>{manufacDate}</td>
        <td onClick={() => deleteHandler(ClothId)} style={{textAlign: "center", color: "red", fontSize: "25px"}}>
            <MdDeleteOutline />
        </td>
    </tr>
  )
}

export default Cloths