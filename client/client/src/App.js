import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import Movies from './pages/Movies'
import TvSeries from './pages/TvSeries'
import AddMovies from './pages/AddMovies'
import MovieDetail from './pages/MovieDetail'
import EditMovie from './pages/EditMovie'
import FavMovies from './pages/FavMovie'
import { ApolloProvider } from '@apollo/client'
import client from './config/graphql'


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">

          <h1> Apollo Client </h1>
          <Navbar bg="dark" variant="dark">
            <Nav.Link as={Link} to="/movies">Movies</Nav.Link>
            {/* <Nav.Link as={Link} to="/tvseries">Tv Series</Nav.Link> */}
            <Nav.Link as={Link} to="/movies/favorites">Favorites</Nav.Link>
          </Navbar>

          <Switch>
            <Route exact path="/movies" component={Movies} />
            <Route exact path="/movies/add" component={AddMovies} />
            <Route exact path="/movies/favorites" component={FavMovies} />
            <Route exact path="/movies/:id" component={MovieDetail} />
            <Route exact path="/movies/edit/:id" component={EditMovie} />
          </Switch>

        </div>
      </Router>
    </ApolloProvider>



  );
}

export default App;
