import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { MealDetails } from './components/MealDetails/MealDetails';
import { MealSearch } from './components/MealSearch/MealSearch';

export const MEALS_URL = '/';
export const MEAL_DETAILS_URL = '/meal/:mealID';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={MEAL_DETAILS_URL} element={<MealDetails />} />
        <Route path={MEALS_URL} element={<MealSearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
