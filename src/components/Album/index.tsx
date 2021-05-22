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
    //height: '70%',
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

const Album = ( { nfts } : NFT[] | any) => {
  const classes = useStyles();

  const [showModal, setShowModal] = useState(false);
  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {nfts.map((nft: NFT) => (
              <Grid item key={nfts.indexOf(nft)} xs={12} sm={6} md={4}>
                <Card className={classes.card}
                  onClick={() => setShowModal(true)}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={nft.image}
                    title={nft.name}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {nft.name}
                    </Typography>
                    <Typography>
                      {nft.creator}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {/* <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button> */}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
      <Dialog open={showModal}
          
          // open={this.state.open} onEnter={console.log('Hey.')}
          >
            <Button 
              variant="contained"
              className={classes.close}
              onClick={() => setShowModal(false)}
            >
              <Close />
            </Button>
            <DialogTitle>Hello CodeSandbox</DialogTitle>
            <DialogContent>
              < ViewNFT />
              Start editing to see some magic happen!</DialogContent>
            </Dialog>
    </React.Fragment>
  );
}

export default Album;