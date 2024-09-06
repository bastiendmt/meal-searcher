import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { MealDetails } from './components/MealDetails/MealDetails';
import { MealSearch } from './components/MealSearch/MealSearch';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/meal/:mealID' element={<MealDetails />}></Route>
        <Route path='/' element={<MealSearch />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
