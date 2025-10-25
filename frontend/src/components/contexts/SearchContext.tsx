import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchData {
  topics: any[];
  title: string;
  type: string;
  onTopicSelect?: (topic: any) => void;
}

interface SearchContextType {
  searchData: SearchData | null;
  setSearchData: (data: SearchData | null) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchData, setSearchData] = useState<SearchData | null>(null);

  return (
    <SearchContext.Provider value={{ searchData, setSearchData }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};