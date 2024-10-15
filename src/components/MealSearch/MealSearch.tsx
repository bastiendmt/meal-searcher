import { useDebounce, useLocalStorage } from '@uidotdev/usehooks';
import { generatePath, Link, useSearchParams } from 'react-router-dom';
import useSWR from 'swr';
import { MealDetails, MealDetailsResponse } from '../../types/types';
import { fetcher } from '../../utils/utils';
import { MEAL_DETAILS_URL } from '../../App';

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
        type='text'
        value={searchTerm ?? ''}
        onChange={(e) => setSearchParam({ s: e.target.value })}
        placeholder='beef, salmon, vegan...'
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

const MealItem = ({ meal }: { meal: MealDetails }) => {
  const [isFavorite, saveFavorite] = useLocalStorage(
    `fav-${meal.idMeal}`,
    false
  );

  return (
    <div
      key={meal.idMeal}
      style={{
        flexBasis: 'calc(33.33% - 16px)',
        border: '1px solid grey',
        borderRadius: '5px',
        padding: '8px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <button
        onClick={() => {
          saveFavorite((prev) => !prev);
        }}
      >
        {isFavorite ? '⭐' : 'Add to favorites'}
      </button>
      <Link
        to={generatePath(MEAL_DETAILS_URL, {
          mealID: meal.idMeal,
        })}
      >
        <strong>{meal.strMeal}</strong>
        <p>{meal.strCategory}</p>
        <img src={meal.strMealThumb} alt={meal.strMeal} height={100} />
      </Link>
    </div>
  );
};
