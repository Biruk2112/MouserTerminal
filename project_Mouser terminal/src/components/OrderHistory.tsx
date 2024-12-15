import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getOrderHistory } from '../services/orderApi';
import { Clock, Loader, AlertCircle } from 'lucide-react';
import CartItem from './CartItem';

const OrderHistory = () => {
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orderHistory'],
    queryFn: getOrderHistory,
    retry: 1
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
        <span>{error instanceof Error ? error.message : 'Error loading order history'}</span>
      </div>
    );
  }

  if (!orders?.length) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-cyan-300/70">
        <Clock className="h-16 w-16 mb-4" />
        <p>No orders found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order: any) => (
        <div key={order.OrderNumber} className="cyber-card">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-bold">Order #{order.OrderNumber}</h3>
              <p className="text-sm text-cyan-300/70">
                {new Date(order.OrderDate).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">${order.Total}</p>
              <span className={`text-sm px-2 py-1 rounded-full ${
                order.Status === 'Completed' ? 'bg-green-400/20 text-green-400' :
                order.Status === 'Processing' ? 'bg-yellow-400/20 text-yellow-400' :
                'bg-red-400/20 text-red-400'
              }`}>
                {order.Status}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {order.Items?.map((item: any) => (
              <div key={item.MouserPartNumber} className="border-t border-cyan-900 pt-2">
                <CartItem item={item} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;