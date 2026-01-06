import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import { ProductCard } from './ProductCard';
import cartReducer from '../../cart/CartSlice';
import authReducer from '../../auth/AuthSlice';
import wishlistReducer from '../../wishlist/WishlistSlice';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
  },
}));

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      auth: authReducer,
      wishlist: wishlistReducer,
    },
    preloadedState: {
      cart: { items: [], status: 'idle' },
      auth: { loggedInUser: { _id: 'user1' }, status: 'idle' },
      wishlist: { items: [], status: 'idle' },
      ...initialState,
    },
  });
};

const renderWithProviders = (component, store = createMockStore()) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

describe('ProductCard', () => {
  const mockProduct = {
    id: 'product1',
    title: 'Test Product',
    price: 99.99,
    thumbnail: 'https://example.com/image.jpg',
    brand: 'Test Brand',
    stockQuantity: 50,
  };

  const mockHandleAddRemoveFromWishlist = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders product information correctly', () => {
    renderWithProviders(
      <ProductCard
        {...mockProduct}
        handleAddRemoveFromWishlist={mockHandleAddRemoveFromWishlist}
      />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Brand')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  test('displays product image with correct alt text', () => {
    renderWithProviders(
      <ProductCard
        {...mockProduct}
        handleAddRemoveFromWishlist={mockHandleAddRemoveFromWishlist}
      />
    );

    const image = screen.getByAltText('Test Product photo unavailable');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockProduct.thumbnail);
  });

  test('shows "Add To Cart" button when product is not in cart', () => {
    const store = createMockStore({
      cart: { items: [], status: 'idle' },
    });

    renderWithProviders(
      <ProductCard
        {...mockProduct}
        handleAddRemoveFromWishlist={mockHandleAddRemoveFromWishlist}
      />,
      store
    );

    expect(screen.getByText('Add To Cart')).toBeInTheDocument();
  });

  test('shows "Added to cart" when product is already in cart', () => {
    const store = createMockStore({
      cart: {
        items: [{ product: { _id: 'product1' }, quantity: 1 }],
        status: 'idle',
      },
    });

    renderWithProviders(
      <ProductCard
        {...mockProduct}
        handleAddRemoveFromWishlist={mockHandleAddRemoveFromWishlist}
      />,
      store
    );

    expect(screen.getByText('Added to cart')).toBeInTheDocument();
    expect(screen.queryByText('Add To Cart')).not.toBeInTheDocument();
  });

  test('displays low stock warning when stock is low', () => {
    renderWithProviders(
      <ProductCard
        {...mockProduct}
        stockQuantity={5}
        handleAddRemoveFromWishlist={mockHandleAddRemoveFromWishlist}
      />
    );

    expect(screen.getByText(/Only few are left/i)).toBeInTheDocument();
  });

  test('displays single stock warning when stock is 1', () => {
    renderWithProviders(
      <ProductCard
        {...mockProduct}
        stockQuantity={1}
        handleAddRemoveFromWishlist={mockHandleAddRemoveFromWishlist}
      />
    );

    expect(screen.getByText(/Only 1 stock is left/i)).toBeInTheDocument();
  });
});

