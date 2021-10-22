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

      let subTotal = items.reduce(function (accumulator, item) {
        return accumulator + item.price;
      }, 0);

      let shipping = 4.99; // for now nothing

      let totalPrice = subTotal + shipping;

      console.log(totalPrice)

    return (
        <div class="container">
  <h2>Shopping Cart</h2>       
  <table class="table table-hover">
    <thead>
      <tr>
        <th>Item</th>
        <th>Price</th>
        <th class="text-center">Qty</th>
        <th class="text-center">Discard</th>

      </tr>
    </thead>
    <tbody>
            {items.map(item => (
            <tr key={item.itemid}>
              <td>{item.title}</td>
              <td >{item.price}</td>
              <td class="text-center" >placeholder</td>
              <div class="col text-center">
              <button type="button" class="btn btn-default btn-sm " onClick = {() => deleteCartItem(item.itemid)}>
                <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
                </div>
            </tr>
          ))}
    </tbody>
  </table>

  <div class="row">
      <div class="col">
          <div class="row justify-content-between">
              <div class="col-4">
                  <p class="mb-1"><b>Subtotal</b></p>
              </div>
              <div class="flex-sm-col col-auto">
                  <p class="mb-1"><b> {subTotal.toFixed(2)} USD</b></p>
              </div>
          </div>
          <div class="row justify-content-between">
              <div class="col">
                  <p class="mb-1"><b>Shipping</b></p>
              </div>
              <div class="flex-sm-col col-auto">
                  <p class="mb-1"><b>{shipping} USD</b></p>
              </div>
          </div>
          <div class="row justify-content-between">
              <div class="col-4">
                  <p><b>Total</b></p>
              </div>
              <div class="flex-sm-col col-auto">
                  <p class="mb-1"><b>{totalPrice.toFixed(2)} USD</b></p>
              </div>
          </div>
          
      </div>
  </div>
</div>
    )
}

export default ListItems;