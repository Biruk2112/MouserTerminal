import { orderApi, handleResponse } from './apiClient';
import { toast } from 'react-hot-toast';

export interface CartItem {
  mouserPartNumber: string;
  quantity: number;
  customerPartNumber?: string;
}

export interface OrderHistoryItem {
  orderNumber: string;
  orderDate: string;
  status: string;
  total: number;
  currency: string;
  items: CartItem[];
}

export const addToCart = async (items: CartItem[]) => {
  try {
    const response = await orderApi.post('/cart', {
      CartItems: items.map(item => ({
        MouserPartNumber: item.mouserPartNumber,
        Quantity: item.quantity,
        CustomerPartNumber: item.customerPartNumber
      }))
    });

    return handleResponse(response, 'Failed to add items to cart').CartResponse;
  } catch (error) {
    console.error('Add to cart error:', error);
    toast.error('Failed to add items to cart');
    return null;
  }
};

export const getCart = async () => {
  try {
    const response = await orderApi.get('/cart');
    return handleResponse(response, 'Failed to fetch cart').CartResponse?.CartItems || [];
  } catch (error) {
    console.error('Get cart error:', error);
    toast.error('Failed to fetch cart');
    return [];
  }
};

export const getOrderHistory = async () => {
  try {
    const response = await orderApi.get('/orderhistory', {
      params: {
        pageSize: 50,
        pageNumber: 1
      }
    });

    return handleResponse(response, 'Failed to fetch order history').OrderHistoryResponse?.Orders || [];
  } catch (error) {
    console.error('Get order history error:', error);
    toast.error('Failed to fetch order history');
    return [];
  }
};

export const placeOrder = async (cartId: string) => {
  try {
    const response = await orderApi.post('/submit', {
      CartId: cartId,
      OrderReference: `ORDER-${Date.now()}`
    });

    return handleResponse(response, 'Failed to place order').OrderResponse;
  } catch (error) {
    console.error('Place order error:', error);
    toast.error('Failed to place order');
    return null;
  }
};