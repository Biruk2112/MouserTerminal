import React, { useState } from 'react';
import { Search, Upload, ShoppingCart, Clock, BarChart } from 'lucide-react';
import ComponentSearch from '../components/ComponentSearch';
import BOMUploader from '../components/BOMUploader';
import Cart from '../components/Cart';
import OrderHistory from '../components/OrderHistory';
import { useQuery } from '@tanstack/react-query';
import { getBOMPricing } from '../services/mouserApi';

const Dashboard = () => {
  const [selectedComponents, setSelectedComponents] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('search');

  const { data: bomPricing } = useQuery({
    queryKey: ['bom-pricing', selectedComponents],
    queryFn: () => getBOMPricing(selectedComponents.map(c => c.partNumber)),
    enabled: selectedComponents.length > 0
  });

  const handleBOMUpload = (data: any[]) => {
    setSelectedComponents(data);
    setActiveTab('cart');
  };

  const handleComponentSelect = (component: any) => {
    setSelectedComponents(prev => [...prev, component]);
  };

  const tabs = [
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'bom', icon: Upload, label: 'BOM Upload' },
    { id: 'cart', icon: ShoppingCart, label: 'Cart' },
    { id: 'orders', icon: Clock, label: 'Orders' },
    { id: 'analytics', icon: BarChart, label: 'Analytics' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex space-x-4 mb-8">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`cyber-button flex items-center space-x-2 ${
              activeTab === id ? 'bg-cyan-400/10' : ''
            }`}
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="cyber-card">
        {activeTab === 'search' && (
          <ComponentSearch onSelect={handleComponentSelect} />
        )}

        {activeTab === 'bom' && (
          <BOMUploader onBOMUpload={handleBOMUpload} />
        )}

        {activeTab === 'cart' && <Cart />}

        {activeTab === 'orders' && <OrderHistory />}

        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold mb-4">Procurement Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="cyber-card">
                <h3 className="text-lg font-bold mb-4">Most Ordered Components</h3>
                {/* Add chart component here */}
              </div>
              <div className="cyber-card">
                <h3 className="text-lg font-bold mb-4">Price Trends</h3>
                {/* Add chart component here */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;