import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { Link as RouteLink, useHistory } from 'react-router-dom';
import NFT from '../../interfaces';
import { API, Storage, Auth } from 'aws-amplify';
import { createNFT as createNFTMutation } from '../../graphql/mutations';
import InputLabel from '@material-ui/core/InputLabel';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'green',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialFormState: NFT = { name: '', description: '', creator: '' };

const AddNFT = ({ createNFT }: any) => {
  const classes = useStyles();

  const [formData, setFormData] = useState(initialFormState);

  // create NFT via api call
  const passNFT = async () => {
      createNFT(formData);
  };

  const onChange = async (e: any) => {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add NFT
        </Typography>
        <form className={classes.form} >
          <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="name"
                    label="Name"
                    type="name"
                    id="name"
                    onChange={e => setFormData({ ...formData, 'name': e.target.value })}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="description"
                    label="Description"
                    type="name"
                    id="description"
                    onChange={e => setFormData({ ...formData, 'description': e.target.value })}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="creator"
                    label="Creator"
                    type="name"
                    id="creator"
                    onChange={e => setFormData({ ...formData, 'creator': e.target.value })}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    fullWidth
                    id="purchasedprice"
                    label="Purchased Price"
                    name="purchasedprice"
                    type="number"
                    onChange={e => setFormData({ ...formData, 'soldfor': parseInt(e.target.value) })}
                >
                    {/* <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel> */}
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    fullWidth
                    id="askingprice"
                    label="Asking Price"
                    name="askingprice"
                    onChange={e => setFormData({ ...formData, 'askingprice': parseInt(e.target.value) })}
                />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="file"
                type="file"
                id="file"
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            id="addNFTButton"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={passNFT}
          >
            Add NFT
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default AddNFT;