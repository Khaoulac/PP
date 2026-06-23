// Lightweight client-side cart helper for the demo app.
// Stores cart in localStorage under the key `pp_cart`.

const STORAGE_KEY = 'pp_cart'

function readCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    console.error('readCart error', e)
    return []
  }
}

function writeCart(cart) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  } catch (e) {
    console.error('writeCart error', e)
  }
}

export async function addToCartApi(item) {
  if (!item) throw new Error('No item provided')
  const cart = readCart()
  const idx = cart.findIndex((c) => c.id === item.id)
  if (idx >= 0) {
    cart[idx].quantity = (cart[idx].quantity || 1) + 1
  } else {
    cart.push({ ...item, quantity: 1 })
  }
  writeCart(cart)
  return cart
}

export async function getCart() {
  return readCart()
}

export async function removeFromCart(id) {
  const cart = readCart().filter((c) => c.id !== id)
  writeCart(cart)
  return cart
}

export async function clearCart() {
  writeCart([])
  return []
}

export async function setCart(cart) {
  writeCart(cart || [])
  return cart
}

export default {
  addToCartApi,
  getCart,
  removeFromCart,
  clearCart,
}
