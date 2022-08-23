import React, { useContext } from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

export default function Drinks() {
  return (
    <div>
      <Header title="Drinks" />
      <Recipes />
    </div>
  );
}
