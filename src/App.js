import './App.css';
import {
    BrowserRouter  as Router, 
    Route, 
    Redirect, 
    Switch,
    BrowserRouter
} from 'react-router-dom';
import Home from './home/Home';
import Product from './products/Product';
import Navigation from './components/Navigation';

function App() {
    return (
        <BrowserRouter>
            <div className="container">
                <h3 className="m-3 d-flex justify-content-center">Products - ArandaSoft Test</h3>            
                <Navigation />
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/products" component={Product} exact />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
