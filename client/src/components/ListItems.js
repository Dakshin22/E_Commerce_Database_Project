import React, { Fragment, useEffect, useState } from "react";

const ListItems = () => {

    const [items, setCartItems] = useState([]);

    const deleteCartItem = async id => {
        try {
          const deleteCartItem = await fetch(`http://localhost:5000/cart-items/${id}`, {
            method: "DELETE"
          });
    
          setCartItems(items.filter(item => item.itemid !== id));
        } catch (err) {
          console.error(err.message);
        }
      };

    const getCartItems = async () => {
        try {
          const response = await fetch("http://localhost:5000/cart-items");
          const jsonData = await response.json();
    
          setCartItems(jsonData);
        } catch (err) {
          console.error(err.message);
        }
      };

    useEffect(() => {
        getCartItems();
      }, []);

      console.log(items)


    return (
        <div class="container">
  <h2>Shopping Cart</h2>       
  <table class="table table-hover">
    <thead>
      <tr>
        <th>Item</th>
        <th>Price</th>
        <th>Qty</th>
        <th>Discard</th>

      </tr>
    </thead>
    <tbody>
            {items.map(item => (
            <tr key={item.itemid}>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>placeholder</td>
              <button type="button" class="btn btn-default btn-sm ml-4" onClick = {() => deleteCartItem(item.itemid)}>
                <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
            </tr>
          ))}
    </tbody>
  </table>
</div>
    )
}

export default ListItems;