import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

export default function Search(props) {
  const [url, setUrl] = useState('');
  const classes = useStyles();

  function onSubmit(e) {
    e.preventDefault();
    props.submit(url);
  }
  return (
    <div>
      <form autoComplete="off" className={classes.root} onSubmit={onSubmit} noValidate>
        <div className="container get_product_info">
          <TextField
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            className="input get_product_info"
            label="Enter Item URL"
            variant="outlined"
            id="mui-theme-provider-outlined-input"
          />
          <IconButton
            className="icon get_product_info"
            type="submit"
            color="primary"
            aria-label="directions"
          >
            <DirectionsIcon />
          </IconButton>
        </div>
      </form>
    </div>
  );
}
