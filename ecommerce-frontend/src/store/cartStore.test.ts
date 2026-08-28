import { beforeEach, describe, expect, it } from 'vitest'
import { useCartStore } from './cartStore'

const product = {
  productId: 'p-1',
  name: 'Keyboard',
  price: 25,
  quantity: 1,
  image: '/keyboard.png',
}

describe('cart store', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart()
  })

  it('merges quantities for an existing product', () => {
    useCartStore.getState().addItem(product)
    useCartStore.getState().addItem({ ...product, quantity: 2 })

    expect(useCartStore.getState().items).toHaveLength(1)
    expect(useCartStore.getState().items[0].quantity).toBe(3)
  })

  it('calculates the cart total and removes products', () => {
    useCartStore.getState().addItem(product)
    useCartStore.getState().addItem({ ...product, productId: 'p-2', price: 10, quantity: 2 })

    expect(useCartStore.getState().total()).toBe(45)
    useCartStore.getState().removeItem('p-1')
    expect(useCartStore.getState().items.map((item) => item.productId)).toEqual(['p-2'])
  })
})