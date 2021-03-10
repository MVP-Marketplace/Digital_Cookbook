import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar'
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import GalleryPage from './components/GalleryPage';
import RecipePage from './components/RecipePage';
import PageNotFound from './components/PageNotFound';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <BrowserRouter>
     <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/gallery" component={GalleryPage} />
        <Route exact path="/recipe/:id" component={RecipePage} />
        <Route component={PageNotFound} /> 
      </Switch>
    </BrowserRouter>
  );
}

export default App;
