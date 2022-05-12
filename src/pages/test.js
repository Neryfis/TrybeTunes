import React from 'react';
import PropTypes from 'prop-types';
import { Link, Switch, BrowserRouter, Route } from 'react-router-dom';
import Carrinho from '../Carrinho';

class ItemCard extends React.Component {
  constructor() {
    super();
    this.AddToCard = this.AddToCard.bind(this);
  }

  AddToCard(title, thumbnail, price) {
    const { AddItemOnCart } = this.props;
    const newItem = {
      title,
      thumbnail,
      price,
    };
    AddItemOnCart(newItem);
  }

  render() {
    const {
      thumbnail,
      title,
      price } = this.props;

    return (
      <div>
        <p>{ title }</p>
        <img src={ thumbnail } alt={ title } />
        <span>{`Valor: ${price}`}</span>
        <button
        type="button"
          data-testid="product-add-to-cart"
          onClick={ () => this.AddToCard(title, thumbnail, price) }
        >
          Adicionar ao carrinho

        </button>
      </div>
    );
  }
}

ItemCard.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ItemCard;
