import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { searchComponents, getManufacturers, SearchParams } from '../services/mouserApi';
import { toast } from 'react-hot-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const searchSchema = z.object({
  keyword: z.string(),
  manufacturer: z.string().optional(),
  inStockOnly: z.boolean().optional(),
});

type SearchFormData = z.infer<typeof searchSchema>;

interface ComponentSearchProps {
  onSelect?: (component: any) => void;
}

const ComponentSearch: React.FC<ComponentSearchProps> = ({ onSelect }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [manufacturers, setManufacturers] = useState<string[]>([]);

  const { register, handleSubmit, watch, reset } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      keyword: '',
      inStockOnly: false,
    },
  });

  const searchValues = watch();

  const { data: components, isLoading } = useQuery({
    queryKey: ['components', searchValues],
    queryFn: () => searchComponents(searchValues as SearchParams),
    enabled: searchValues.keyword?.length > 2,
  });

  useEffect(() => {
    const loadManufacturers = async () => {
      const mfrList = await getManufacturers();
      setManufacturers(mfrList);
    };
    loadManufacturers();
  }, []);

  const handleComponentSelect = (component: any) => {
    if (onSelect) {
      onSelect(component);
      toast.success(`Added ${component.MouserPartNumber} to cart`);
    }
  };

  const resetFilters = () => {
    reset();
    setShowFilters(false);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <div className="flex items-center space-x-4 cyber-card">
          <Search className="h-5 w-5 text-cyan-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by part number, keyword, or description"
            className="cyber-input flex-1"
            {...register('keyword')}
          />
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`cyber-button flex items-center space-x-2 ${
              showFilters ? 'bg-cyan-400/10' : ''
            }`}
          >
            <SlidersHorizontal className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>

        {showFilters && (
          <div className="cyber-card mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">Manufacturer</label>
              <select {...register('manufacturer')} className="cyber-input">
                <option value="">All Manufacturers</option>
                {manufacturers.map((mfr) => (
                  <option key={mfr} value={mfr}>
                    {mfr}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="cyber-checkbox"
                {...register('inStockOnly')}
              />
              <label>In Stock Only</label>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="cyber-button flex items-center space-x-2"
            >
              <X className="h-4 w-4" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </form>

      {isLoading ? (
        <div className="cyber-card text-center py-4">
          <div className="animate-pulse">Searching components...</div>
        </div>
      ) : components && components.length > 0 ? (
        <div className="space-y-2">
          {components.map((component) => (
            <div
              key={component.MouserPartNumber}
              className="cyber-card hover:border-cyan-400 cursor-pointer transition-colors"
              onClick={() => handleComponentSelect(component)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold text-lg">{component.MouserPartNumber}</h3>
                  <p className="text-sm text-cyan-300/70 mb-2">
                    {component.Manufacturer}
                  </p>
                  <p className="text-sm">{component.Description}</p>
                  {component.ProductAttributes && (
                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                      {component.ProductAttributes.slice(0, 4).map((attr, index) => (
                        <div key={`${component.MouserPartNumber}-${attr.AttributeName}-${index}`}>
                          <span className="text-cyan-300/70">{attr.AttributeName}:</span>{' '}
                          {attr.AttributeValue}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end justify-between">
                  <div className="text-right">
                    {component.PriceBreaks && component.PriceBreaks.length > 0 && (
                      <div className="text-2xl font-bold">
                        ${component.PriceBreaks[0].Price}
                        <span className="text-sm text-cyan-300/70">
                          /{component.PriceBreaks[0].Currency}
                        </span>
                      </div>
                    )}
                    <div className="text-sm text-cyan-300/70">
                      {component.Availability}
                    </div>
                  </div>
                  {component.DataSheetUrl && (
                    <a
                      href={component.DataSheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cyber-button mt-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Datasheet
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : searchValues.keyword?.length > 2 ? (
        <div className="cyber-card text-center py-4">No components found</div>
      ) : null}
    </div>
  );
};

export default ComponentSearch;