import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import NFT from '../../interfaces';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Close from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import ViewNFT from '../ViewNFT';


// import { API, Storage } from 'aws-amplify';
// import { listNFTs } from '../../graphql/queries';
// import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api'

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
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    height: '70%',
    paddingTop: '100%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  close: {
    cursor:'pointer',
    position:'absolute',
    top:'7px',
    right:'10px',
    backgroundColor: 'rgb(231, 120, 120)'
  },
}));

// why wont this display the card ? (nft : NFT | any)
const NFTCard = (props: any) => {
  debugger;
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  
  return (
    <React.Fragment>
      {/* <CssBaseline /> */}
      {/* <main> */}
        <Grid item key={props.nft.id} xs={12} sm={6} md={4}>
          <Card className={classes.card}
            onClick={(e) => setShowModal(true)}>
            <CardMedia
            className={classes.cardMedia}
            image={props.nft.image}
            title={props.nft.name}
            />
            <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
                {props.nft.name}
            </Typography>
            <Typography>
                {props.nft.creator}
            </Typography>
            </CardContent>
            {/* <CardActions> */}
            {/* <Button size="small" color="primary">
                View
            </Button>
            <Button size="small" color="primary">
                Edit
            </Button> */}
            {/* </CardActions> */}
          </Card>
        </Grid>
      {/* </main> */}
      <Dialog open={showModal}>
        <Button 
            variant="contained"
            className={classes.close}
            onClick={() => setShowModal(false)}
        >
            <Close />
        </Button>
        <DialogContent>
            < ViewNFT nft={props.nft}/>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default NFTCard;