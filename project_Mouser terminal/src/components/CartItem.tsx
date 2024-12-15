import React from 'react';
import { Trash2 } from 'lucide-react';

interface CartItemProps {
  item: any;
  onRemove?: (partNumber: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  return (
    <div className="cyber-card">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h3 className="font-bold">{item.Description || item.PartDescription}</h3>
          <p className="text-sm text-cyan-300/70">{item.MouserPartNumber}</p>
          <p className="text-sm">Quantity: {item.Quantity}</p>
        </div>
        <div className="text-right ml-4">
          <p className="text-lg font-bold">${item.UnitPrice}</p>
          <p className="text-sm text-cyan-300/70">
            Total: ${(item.UnitPrice * item.Quantity).toFixed(2)}
          </p>
          {onRemove && (
            <button
              onClick={() => onRemove(item.MouserPartNumber)}
              className="cyber-button mt-2 p-2"
              title="Remove from cart"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;