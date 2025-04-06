import { useDebounce } from '@uidotdev/usehooks';
import { useSearchParams } from 'react-router-dom';
import useSWR from 'swr';
import type { MealDetailsResponse } from '../../types/types';
import { fetcher } from '../../utils/utils';
import { MealItem } from './MealItem';

const searchURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export const MealSearch = () => {
  const [searchParams, setSearchParam] = useSearchParams('');

  const searchTerm = searchParams.get('s');

  const debouncedSearchTerm = useDebounce(searchTerm, 500) ?? '';

  // fetch if no term ?
  const { isLoading, error, data } = useSWR<MealDetailsResponse>(
    searchURL + debouncedSearchTerm,
    fetcher
  );

  return (
    <div>
      <h2>Search meals</h2>
      <input
        type="text"
        value={searchTerm ?? ''}
        onChange={(e) => setSearchParam({ s: e.target.value })}
        placeholder="beef, salmon, vegan..."
      />

      <h3>Results</h3>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        {data?.meals === null && <div>No results found, try another term</div>}
        {data?.meals?.map((meal) => (
          <MealItem key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </div>
  );
};
