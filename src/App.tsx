import './App.css';
import { MealDetails } from './components/MealDetails/MealDetails';
import { MealSearch } from './components/MealSearch/MealSearch';

function App() {
  return (
    <>
      <h1>Meal Searcher</h1>
      {/* <MealDetails /> */}
      <MealSearch />
    </>
  );
}

export default App;
