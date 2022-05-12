import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import './Component.css';

class Header extends React.Component {
  constructor() {
    super();
    this.Loading = this.Loading.bind(this);
    this.state = {
      login: '',
      Loading: false,
    };
  }

  componentDidMount() {
    this.GetUser();
  }

  async GetUser() {
    this.setState({ Loading: true });
    await getUser().then((data) => this.setState({ login: data.name }));
    this.setState({ Loading: false });
  }

  Loading() {
    const { Loading, login } = this.state;
    if (Loading === false) {
      return <p data-testid="header-user-name">{login}</p>;
    }
    return <p>Carregando...</p>;
  }

  render() {
    return (
      <header data-testid="header-component" className="header">
        {this.Loading()}
        <ul>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorito</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </ul>
      </header>
    );
  }
}

export default Header;
