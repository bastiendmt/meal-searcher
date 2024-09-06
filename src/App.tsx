import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import { MealDetails } from './components/MealDetails/MealDetails';
import { MealSearch } from './components/MealSearch/MealSearch';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to='/'>Home</Link>
        </nav>

        <Routes>
          <Route path='/meal/:mealID' element={<MealDetails />}></Route>
          <Route path='/' element={<MealSearch />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
