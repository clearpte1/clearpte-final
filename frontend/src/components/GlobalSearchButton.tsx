import React from 'react';
import FloatingSearchButton from '../components/common/FloatingSearchButton';
import { useSearch } from './contexts/SearchContext';

const GlobalSearchButton: React.FC = () => {
  const { searchData } = useSearch();

  if (!searchData) {
    return null;
  }

  return (
    <FloatingSearchButton
      topics={searchData.topics}
      title={searchData.title}
      type={searchData.type}
      onTopicSelect={searchData.onTopicSelect}
      disabled={false}
    />
  );
};

export default GlobalSearchButton;