import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/login';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import Search from './pages/Search';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  constructor() {
    super();
    this.getAlbumID = this.getAlbumID.bind(this);
    this.state = {
      albumId: '',
    };
  }

  getAlbumID(value) {
    console.log('a');
    this.setState({ albumId: value });
  }

  render() {
    const { albumId } = this.state;
    console.log(albumId);
    return (
      <BrowserRouter>
        <main>
          <Switch>
            <Route exact path="/"><Login onChangePage={ this.ChangePage } /></Route>
            <Route
              exact
              path="/search"
              render={ (props) => (<Search
                { ...props }
                callbackParant={ this.getAlbumID }
              />) }
            />
            <Route exact path="/album/:id" component={ Album } />
            <Route exact path="/Favorites" component={ Favorites } />
            <Route exact path="/Profile" component={ Profile } />
            <Route exact path="/profile/edit" component={ ProfileEdit } />
            <Route path="" component={ NotFound } />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
