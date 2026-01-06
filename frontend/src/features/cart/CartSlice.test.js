import cartReducer, {
  addToCartAsync,
  removeFromCartAsync,
  updateCartAsync,
  fetchCartByUserIdAsync,
  selectCartItems,
  selectCartStatus,
} from './CartSlice';

describe('CartSlice', () => {
  const initialState = {
    items: [],
    status: 'idle',
    error: null,
  };

  test('should return initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should handle addToCartAsync.pending', () => {
    const action = { type: addToCartAsync.pending.type };
    const state = cartReducer(initialState, action);
    expect(state.status).toBe('pending');
  });

  test('should handle addToCartAsync.fulfilled', () => {
    const mockCartItem = {
      _id: 'cart1',
      user: 'user1',
      product: { _id: 'product1', name: 'Test Product' },
      quantity: 1,
    };

    const action = {
      type: addToCartAsync.fulfilled.type,
      payload: mockCartItem,
    };

    const state = cartReducer(initialState, action);
    expect(state.status).toBe('idle');
    expect(state.items).toContainEqual(mockCartItem);
  });

  test('should handle removeFromCartAsync.fulfilled', () => {
    const mockItems = [
      { _id: 'cart1', product: { _id: 'product1' } },
      { _id: 'cart2', product: { _id: 'product2' } },
    ];

    const stateWithItems = {
      ...initialState,
      items: mockItems,
    };

    const action = {
      type: removeFromCartAsync.fulfilled.type,
      payload: 'cart1',
    };

    const state = cartReducer(stateWithItems, action);
    expect(state.items).toHaveLength(1);
    expect(state.items[0]._id).toBe('cart2');
  });

  test('should handle updateCartAsync.fulfilled', () => {
    const mockItems = [
      { _id: 'cart1', product: { _id: 'product1' }, quantity: 1 },
    ];

    const stateWithItems = {
      ...initialState,
      items: mockItems,
    };

    const updatedItem = {
      _id: 'cart1',
      product: { _id: 'product1' },
      quantity: 3,
    };

    const action = {
      type: updateCartAsync.fulfilled.type,
      payload: updatedItem,
    };

    const state = cartReducer(stateWithItems, action);
    expect(state.items[0].quantity).toBe(3);
  });

  test('should handle fetchCartByUserIdAsync.fulfilled', () => {
    const mockItems = [
      { _id: 'cart1', product: { _id: 'product1' } },
      { _id: 'cart2', product: { _id: 'product2' } },
    ];

    const action = {
      type: fetchCartByUserIdAsync.fulfilled.type,
      payload: mockItems,
    };

    const state = cartReducer(initialState, action);
    expect(state.items).toEqual(mockItems);
    expect(state.status).toBe('idle');
  });

  test('selectCartItems should return cart items', () => {
    const state = {
      cart: {
        items: [{ _id: 'cart1' }],
        status: 'idle',
        error: null,
      },
    };

    expect(selectCartItems(state)).toEqual([{ _id: 'cart1' }]);
  });

  test('selectCartStatus should return cart status', () => {
    const state = {
      cart: {
        items: [],
        status: 'pending',
        error: null,
      },
    };

    expect(selectCartStatus(state)).toBe('pending');
  });
});

