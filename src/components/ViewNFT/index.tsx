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

import {  createStyles, Theme } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

import ButtonBase from '@material-ui/core/ButtonBase';

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

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       flexGrow: 1,
//     },
//     paper: {
//       padding: theme.spacing(2),
//       margin: 'auto',
//       maxWidth: 500,
//     },
//     image: {
//       width: 128,
//       height: 128,
//     },
//     img: {
//       margin: 'auto',
//       display: 'block',
//       maxWidth: '100%',
//       maxHeight: '100%',
//     },
//   }),
// );

const initialFormState: NFT = { name: '', description: '', creator: '' };

const ViewNFT = ({ createNFT }: any) => {
  const classes = useStyles();

  const [formData, setFormData] = useState(initialFormState);

  // create NFT via api call
  const passNFT = async () => {
      createNFT(formData);
  };

  return (
    <Container component="main" maxWidth="md">
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
{/* <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" />
            </ButtonBase>
          </Grid> */}
            <Grid item xs={6}>
                <TextField
                    variant="outlined"
                    required
                    //fullWidth
                    name="name"
                    label="Name"
                    type="name"
                    id="name"
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    variant="outlined"
                    required
                    //fullWidth
                    name="description"
                    label="Description"
                    type="name"
                    id="description"
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    variant="outlined"
                    required
                   // fullWidth
                    name="creator"
                    label="Creator"
                    type="name"
                    id="creator"
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    variant="outlined"
                    //fullWidth
                    id="purchasedprice"
                    label="Purchased Price"
                    name="purchasedprice"
                    type="number"
                >
                    {/* <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel> */}
                </TextField>
            </Grid>
            <Grid item xs={6}>
                <TextField
                    variant="outlined"
                    //fullWidth
                    id="askingprice"
                    label="Asking Price"
                    name="askingprice"
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
            Sign Up
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );

// return (
//     <div className={classes.root}>
//       <Paper className={classes.paper}>
//         <Grid container spacing={2}>
//           <Grid item>
//             <ButtonBase className={classes.image}>
//               <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" />
//             </ButtonBase>
//           </Grid>
//           <Grid item xs={12} sm container>
//             <Grid item xs container direction="column" spacing={2}>
//               <Grid item xs>
//                 <Typography gutterBottom variant="subtitle1">
//                   Standard license
//                 </Typography>
//                 <Typography variant="body2" gutterBottom>
//                   Full resolution 1920x1080 • JPEG
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   ID: 1030114
//                 </Typography>
//               </Grid>
//               <Grid item>
//                 <Typography variant="body2" style={{ cursor: 'pointer' }}>
//                   Remove
//                 </Typography>
//               </Grid>
//             </Grid>
//             <Grid item>
//               <Typography variant="subtitle1">$19.00</Typography>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Paper>
//     </div>
//   );
}

export default ViewNFT;