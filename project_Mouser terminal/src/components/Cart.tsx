import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCart, placeOrder } from '../services/orderApi';
import { ShoppingCart, Loader, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import CartItem from './CartItem';

const Cart = () => {
  const queryClient = useQueryClient();

  const { data: cartItems, isLoading, error } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    retry: 1
  });

  const placeMutation = useMutation({
    mutationFn: placeOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['orderHistory'] });
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="h-8 w-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-red-400">
        <AlertCircle className="h-6 w-6 mr-2" />
        <span>{error instanceof Error ? error.message : 'Error loading cart'}</span>
      </div>
    );
  }

  if (!cartItems?.length) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-cyan-300/70">
        <ShoppingCart className="h-16 w-16 mb-4" />
        <p>Your cart is empty</p>
      </div>
    );
  }

  const handleCheckout = async () => {
    try {
      await placeMutation.mutateAsync(cartItems[0].CartId);
    } catch (error) {
      // Error is already handled by the API service
    }
  };

  const cartTotal = cartItems.reduce((acc: number, item: any) => 
    acc + (item.UnitPrice * item.Quantity), 0);

  return (
    <div className="space-y-4">
      {cartItems.map((item: any) => (
        <CartItem key={item.MouserPartNumber} item={item} />
      ))}

      <div className="cyber-card bg-cyan-900/20">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">Total</span>
          <span className="text-2xl font-bold">
            ${cartTotal.toFixed(2)}
          </span>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        disabled={placeMutation.isPending}
        className="cyber-button w-full"
      >
        {placeMutation.isPending ? (
          <Loader className="h-4 w-4 animate-spin mx-auto" />
        ) : (
          'Proceed to Checkout'
        )}
      </button>
    </div>
  );
}

export default Cart;