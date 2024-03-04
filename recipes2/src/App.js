import './App.css';
import RecipesP from './components/RecipesP';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowUpRightFromSquare, faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RecipeC from './components/RecipeC';
import RecipeP from './components/RecipeP';

library.add(
  faCartShopping,
  faArrowUpRightFromSquare, 
  faBackWardStep
  faSquarePlus,
  faSquareMinus
);
function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route index element={<RecipesP/>}/>
            <Route path="/recipe/:id" element={<RecipeP/>}/>
        </Routes>
    </BrowserRouter>
    );  
}

export default App;
