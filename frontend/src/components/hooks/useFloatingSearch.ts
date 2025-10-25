import { useEffect } from 'react';
import { useSearch } from '../contexts/SearchContext';

interface UseFloatingSearchOptions {
  topics: any[];
  title: string;
  type: string;
  onTopicSelect?: (topic: any) => void;
  enabled?: boolean;
}

export const useFloatingSearch = ({
  topics,
  title,
  type,
  onTopicSelect,
  enabled = true
}: UseFloatingSearchOptions) => {
  const { setSearchData } = useSearch();

  useEffect(() => {
    if (enabled && topics.length > 0) {
      setSearchData({
        topics,
        title,
        type,
        onTopicSelect
      });
    } else {
      setSearchData(null);
    }

    // Cleanup when component unmounts
    return () => {
      setSearchData(null);
    };
  }, [enabled]); // Only depend on enabled to avoid infinite loops

  // Update search data when component values change, but don't cause re-renders
  useEffect(() => {
    if (enabled && topics.length > 0) {
      setSearchData({
        topics,
        title,
        type,
        onTopicSelect
      });
    }
  }, [topics.length, title, type]); // Depend on topics.length instead of topics array
};