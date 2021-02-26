import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavMenu from './components/NavMenu';
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import GalleryPage from './components/GalleryPage';
import RecipePage from './components/RecipePage';
import PageNotFound from './components/PageNotFound';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <NavMenu />
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
