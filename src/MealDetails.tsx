import useSWR from 'swr';
import { fetcher } from './utils/utils';
import { MealDetailsResponse } from './types/types';

export const MealDetails = () => {
  const { isLoading, error, data } = useSWR<MealDetailsResponse>(
    'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772',
    fetcher
  );

  if (isLoading) return <div>Loading meal details...</div>;

  if (error)
    return <div>Error while loading meal details: {error.message}</div>;

  const mealDetails = data?.meals[0];
  if (!mealDetails) return <div>No meal details found</div>;

  /** Filter out ingredients that are empty or null */
  const ingredients = Object.keys(mealDetails)
    .filter((key) => key.startsWith('strIngredient'))
    .map((key) => mealDetails[key])
    .filter((ingredient) => ingredient !== '' && ingredient !== null);

  return (
    <div>
      <h2>{mealDetails.strMeal}</h2>
      <div>
        <i>{mealDetails.strCategory}</i> - <span>{mealDetails.strArea}</span>
      </div>

      <img
        src={mealDetails.strMealThumb}
        alt={mealDetails.strMeal}
        height={250}
      />

      <h3>Preparation</h3>
      <h4>Ingredients</h4>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>

      <h4>Instructions</h4>
      <p>{mealDetails.strInstructions}</p>

      <h4>Video</h4>
      {mealDetails.strYoutube ? (
        <a href={mealDetails.strYoutube}>{mealDetails.strYoutube}</a>
      ) : (
        <p>No video available</p>
      )}
    </div>
  );
};
