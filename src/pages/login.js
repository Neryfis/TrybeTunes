import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      login: '',
      disableBtn: true,
      Loading: false,
    };
    this.Login = this.Login.bind(this);
    this.BtnEnter = this.BtnEnter.bind(this);
    this.Loading = this.Loading.bind(this);
  }

  Login(event) {
    const minLength = 3;
    this.setState({ login: event.target.value });
    if (event.target.value.length >= minLength) {
      this.setState({ disableBtn: false });
    } else {
      this.setState({ disableBtn: true });
    }
  }

  async BtnEnter() {
    this.setState({ Loading: true });
    const { login } = this.state;
    await createUser({ name: login });
    this.setState({ Loading: 'finish' });
  }

  Loading() {
    const { Loading, disableBtn } = this.state;
    if (Loading === true) {
      return (
        <p>Carregando...</p>
      );
    }
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <form>
          <input data-testid="login-name-input" type="text" onChange={ this.Login } />

          <button
            type="button"
            disabled={ disableBtn }
            onClick={ this.BtnEnter }
            data-testid="login-submit-button"
          >
            Entrar

          </button>

        </form>
      </div>
    );
  }

  Rota() {
    const { Loading } = this.state;
    if (Loading === 'finish') {
      return (
        <Redirect to="/search" />
      );
    }
  }

  render() {
    return (
      <div>
        {this.Loading()}
        {this.Rota()}
      </div>
    );
  }
}

export default Login;
