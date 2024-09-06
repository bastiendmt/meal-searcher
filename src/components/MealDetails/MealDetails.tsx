import useSWR from 'swr';
import { fetcher } from '../../utils/utils';
import { MealDetailsResponse } from '../../types/types';
import { useNavigate, useParams } from 'react-router-dom';

export const MealDetails = () => {
  const { mealID } = useParams();
  const navigate = useNavigate();
  const mealURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;

  const { isLoading, error, data } = useSWR<MealDetailsResponse>(
    mealURL,
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
    <div className='mealDetails'>
      <button onClick={() => navigate(-1)}>Back to Results</button>
      <h2>{mealDetails.strMeal}</h2>
      <div>
        <i>{mealDetails.strCategory}</i> - <span>{mealDetails.strArea}</span>
      </div>

      <img
        src={mealDetails.strMealThumb}
        alt={mealDetails.strMeal}
        height={250}
        style={{ borderRadius: '20px' }}
      />

      <h3>Tags</h3>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
        {mealDetails.strTags?.split(',').map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <h3>Preparation</h3>
      <h4>Ingredients</h4>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient} style={{ textAlign: 'left' }}>
            {ingredient}
          </li>
        ))}
      </ul>

      <h4>Instructions</h4>
      <p style={{ textAlign: 'justify' }}>{mealDetails.strInstructions}</p>

      <h4>Video</h4>
      {mealDetails.strYoutube ? (
        <a href={mealDetails.strYoutube}>{mealDetails.strYoutube}</a>
      ) : (
        <p>No video available</p>
      )}
    </div>
  );
};
