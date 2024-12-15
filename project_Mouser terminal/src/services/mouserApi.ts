import { searchApi, handleResponse } from './apiClient';
import { toast } from 'react-hot-toast';

export interface SearchParams {
  keyword?: string;
  manufacturer?: string;
  inStockOnly?: boolean;
}

export interface ComponentDetails {
  MouserPartNumber: string;
  Manufacturer: string;
  Description: string;
  PriceBreaks: Array<{
    Price: string;
    Quantity: number;
    Currency: string;
  }>;
  Availability: string;
  DataSheetUrl: string;
  ProductAttributes: Array<{
    AttributeName: string;
    AttributeValue: string;
  }>;
}

export const searchComponents = async (params: SearchParams) => {
  try {
    const response = await searchApi.post('/search/keyword', {
      SearchByKeywordRequest: {
        keyword: params.keyword || '',
        records: 50,
        startingRecord: 0,
        searchOptions: params.inStockOnly ? 'InStock' : '',
        searchWithYourSignUpLanguage: true
      }
    });

    const result = handleResponse<any>(response, 'Error searching components');
    return result?.SearchResults?.Parts || [];
  } catch (error) {
    console.error('Search error:', error);
    toast.error('Failed to search components. Please try again.');
    return [];
  }
};

export const getManufacturers = async () => {
  try {
    const response = await searchApi.get('/search/manufacturerlist');
    const result = handleResponse<any>(response, 'Error fetching manufacturers');
    return result?.MouserManufacturerList?.ManufacturerList?.map(
      (m: { ManufacturerName: string }) => m.ManufacturerName
    ) || [];
  } catch (error) {
    console.error('Error fetching manufacturers:', error);
    toast.error('Failed to fetch manufacturers. Please try again.');
    return [];
  }
};

export const getBOMPricing = async (partNumbers: string[]) => {
  try {
    const response = await searchApi.post('/search/partnumber', {
      SearchByPartRequest: {
        mouserPartNumber: partNumbers,
        partSearchOptions: ''
      }
    });

    const result = handleResponse<any>(response, 'Error fetching BOM pricing');
    return result?.SearchResults || [];
  } catch (error) {
    console.error('Error fetching BOM pricing:', error);
    toast.error('Failed to fetch BOM pricing. Please try again.');
    return [];
  }
};