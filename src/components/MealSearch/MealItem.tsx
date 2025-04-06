import { useLocalStorage } from '@uidotdev/usehooks';
import { Link, generatePath } from 'react-router-dom';
import { MEAL_DETAILS_URL } from '../../App';
import type { MealDetails } from '../../types/types';

export const MealItem = ({ meal }: { meal: MealDetails }) => {
  const [isFavorite, saveFavorite] = useLocalStorage(
    `fav-${meal.idMeal}`,
    false
  );

  return (
    <div
      key={meal.idMeal}
      style={{
        flexBasis: 'calc(33.33% - 16px)',
        border: '1px solid lightgray',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: '5px',
        padding: '8px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <button
        type="button"
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
