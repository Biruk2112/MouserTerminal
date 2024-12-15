import React from 'react';
import { Link } from 'react-router-dom';
import { CircuitBoard, Cpu, Database, GitBranch } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="cyber-card">
    <Icon className="h-8 w-8 mb-4 text-cyan-400" />
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-cyan-300/70">{description}</p>
  </div>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">
            NEXT_GEN <span className="text-cyan-400">COMPONENT</span> PROCUREMENT
          </h1>
          <p className="text-xl mb-8 text-cyan-300/70">
            Access Mouser's extensive electronic component database through our advanced terminal interface
          </p>
          <Link to="/auth" className="cyber-button text-lg">
            INITIALIZE_ACCESS →
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={CircuitBoard}
            title="Real-Time Data"
            description="Access live component availability, pricing, and specifications directly from Mouser's database"
          />
          <FeatureCard
            icon={Cpu}
            title="Smart Search"
            description="Advanced filtering and search capabilities for precise component matching"
          />
          <FeatureCard
            icon={Database}
            title="Inventory Tracking"
            description="Monitor stock levels and receive alerts for critical components"
          />
          <FeatureCard
            icon={GitBranch}
            title="Workflow Integration"
            description="Seamlessly integrate with your existing development tools and processes"
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">ACCESS_TIERS</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'BASIC_ACCESS',
                price: '0',
                features: ['Basic Component Search', 'Real-time Availability', 'Standard API Access'],
              },
              {
                name: 'PRO_ACCESS',
                price: '49',
                features: ['Advanced Search', 'Bulk Operations', 'Priority Support', 'Custom Integration'],
              },
              {
                name: 'ENTERPRISE',
                price: 'Custom',
                features: ['Unlimited Access', 'Dedicated Support', 'Custom Solutions', 'SLA Guarantee'],
              },
            ].map((tier) => (
              <div key={tier.name} className="cyber-card text-center">
                <h3 className="text-xl font-bold mb-4">{tier.name}</h3>
                <div className="text-3xl font-bold mb-6">
                  ${tier.price}
                  {tier.price !== 'Custom' && <span className="text-lg">/mo</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <Link to="/auth" className="cyber-button inline-block">
                  SELECT_PLAN
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;