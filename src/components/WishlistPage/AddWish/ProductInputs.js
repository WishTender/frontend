import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

function CurrencyWarning(props) {
  let currencyWarning;
  if (props.currency !== 'USD' && props.price !== '' && props.price != null) {
    currencyWarning = (
      <div>
        Price populated from {props.currency || 'an unknown currency'}. Please make sure to convert
        to USD.
      </div>
    );

    return currencyWarning;
  }
}

export default function ProductInputs(props) {
  const [name, setName] = useState(props.name);
  const [price, setPrice] = useState(props.price);
  const [loadedClassName, setLoadedClassName] = useState('not_loaded');
  const classes = useStyles();
  console.log(props);
  useEffect(() => {
    setName(props.name);
    setPrice(props.price);
    if (props.retrieved) setLoadedClassName('loaded'); //wat if there is noname? NULL BUT RETRIEVED NOT WORIKING
  }, [props]);

  return (
    <div className={loadedClassName}>
      {/* should only appear after recieved */}
      {props.retrieved ? CurrencyWarning(props) : null}
      <div id="product_inputs">
        <TextField
          className="input name"
          variant="outlined"
          id="name_of_product"
          value={name}
          label="Product Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <TextField
          className="input price"
          variant="outlined"
          id="price_of_product"
          value={'$' + (price || '')}
          label="Price"
          onChange={(e) => {
            setPrice(e.target.value.slice(1));
          }}
        />
      </div>
    </div>
  );
}
