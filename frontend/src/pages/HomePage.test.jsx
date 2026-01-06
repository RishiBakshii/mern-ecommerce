import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import { HomePage } from './HomePage';
import addressReducer from '../features/address/AddressSlice';

// Mock components
jest.mock('../features/navigation/components/Navbar', () => ({
  Navbar: () => <div data-testid="navbar">Navbar</div>,
}));

jest.mock('../features/products/components/ProductList', () => ({
  ProductList: () => <div data-testid="product-list">ProductList</div>,
}));

jest.mock('../features/footer/Footer', () => ({
  Footer: () => <div data-testid="footer">Footer</div>,
}));

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      address: addressReducer,
    },
    preloadedState: {
      address: {
        status: 'idle',
        ...initialState.address,
      },
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

describe('HomePage', () => {
  test('renders all main components', () => {
    renderWithProviders(<HomePage />);

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('product-list')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});

