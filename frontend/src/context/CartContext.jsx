import { createContext, useState, useEffect } from "react"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {

  // LOAD CART FROM LOCALSTORAGE
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart")
    return savedCart ? JSON.parse(savedCart) : []
  })

  // SAVE CART TO LOCALSTORAGE WHENEVER IT CHANGES
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  // ADD TO CART
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id)

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  // INCREASE
  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  // DECREASE
  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  // REMOVE
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem
      }}
    >
      {children}
    </CartContext.Provider>
  )
}