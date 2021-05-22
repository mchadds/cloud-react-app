import React, { useState, useEffect } from 'react';
import './App.css';
import { withAuthenticator, AmplifyAuthenticator, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';
import { API, Storage, Auth } from 'aws-amplify';
import { listNFTs } from './graphql/queries';
import { createNFT as createNFTMutation, deleteNFT as deleteNFTMutation } from './graphql/mutations';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Album from './components/Album';
import NFT from './interfaces';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddNFT from './components/AddNFT';
import { makeStyles } from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  close: {
    cursor:'pointer',
   // height:'20rem',
   //width:'20rem',
    position:'absolute',
    top:'7px',
    right:'10px',
    backgroundColor: 'rgb(231, 120, 120)'
    // &:'after', &:'before' {
    // content:"",
    // height:'20px',
    // width:'20px',
    // border-top:'1px' solid #000,
    // position:'absolute',
     // top:7px,
    //  right:-8px,
     // @include rotate(-45deg)
    // }
  },
  paper: {
    marginTop: theme.spacing(2),
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

// intial form state
const initialFormState: NFT = { name: '', description: '', creator: '' };


const App = (() => {
  const classes = useStyles();
  // set intital state of app component
  const [NFTs, setNFTs] = useState<NFT[]>([]);
  const [formData, setFormData] = useState(initialFormState);
  const [loggedIn, setLoggedIn] = useState(false);

  const [showModal, setShowModal] = useState(false);

  // hook to run after componenent render
  useEffect (() => {
    checkLoginState();
    fetchNFTs();
  }, []);

  // retrieve NFTs via api call
  const fetchNFTs = async () => {
    const apiData: any = await API.graphql({ query: listNFTs, authMode: GRAPHQL_AUTH_MODE.AWS_IAM });
    const NFTsFromAPI: NFT[] = apiData.data.listNFTs.items;
    await Promise.all(NFTsFromAPI.map(async nft => {
      if (nft.image) {
        const image: string = await Storage.get(nft.image) as string;
        nft.image = image;
      }
      return nft;
    }))
    return setNFTs(apiData.data.listNFTs.items)
  };

  // create NFT via api call
  const createNFT = async (nft: NFT) => {
    debugger;
    if (!nft || !nft.description) return;
      await API.graphql({ query: createNFTMutation, variables: { input: nft} });
    if (nft.image) {
      const image: string = await Storage.get(nft.image) as string;
      nft.image= image;
    }
    setNFTs([ ...NFTs, formData]);
    setShowModal(false);
  };

   // create NFT via api call
  //  const createNFT = async () => {
  //   if (!formData || !formData.description) return;
  //   await API.graphql({ query: createNFTMutation, variables: { input: formData} });
  //   if (formData.image) {
  //     const image: string = await Storage.get(formData.image) as string;
  //     formData.image= image;
  //   }
  //   setNFTs([ ...NFTs, formData]);
  //   setShowModal(false);
  //   //setFormData(initialFormState);
  // };

  // delete a NFT via api call
  const deleteNFT = async (id: string | undefined) => {
    const newNFTsArray = NFTs.filter(NFT => NFT.id !== id);
    setNFTs(newNFTsArray);
    await API.graphql({ query: deleteNFTMutation, variables: { input: { id } } });
  };

  const onChange = async (e: any) => {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchNFTs();
  };

  const checkLoginState = () => {
    Auth.currentAuthenticatedUser()
    .then(session => {
      console.log('logged in');
      setLoggedIn(true);
    })
    .catch(() => {
      console.log('not logged in');
      setLoggedIn(false);
    });
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      setLoggedIn(false);
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <header >
          { loggedIn ? <Button onClick={signOut} variant="contained" color="primary">
              Log Out
          </Button> : <Link to="/signin">    
                        <Button variant="contained" color="primary">
                          Log In
                        </Button>
                      </Link>}
          <Link 
            to="/signup"
            style={{ visibility: !loggedIn ? "visible" : "hidden"}}
            >
              <Button variant="contained" color="primary">
                Sign Up
              </Button>
            </Link>    
        </header>
        <Route exact path="/">
          <h1>Noteworthy NFTs</h1>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => setShowModal(true)} 
            style={{ visibility: loggedIn ? "visible" : "hidden"}}>
            Add NFT
          </Button>
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
            {/* <DialogTitle>Hello CodeSandbox</DialogTitle> */}
            <DialogContent>
              < AddNFT createNFT={createNFT}/>
              Start editing to see some magic happen!</DialogContent>
            </Dialog>
          {/* <input
            onChange={e => setFormData({ ...formData, 'name': e.target.value })}
            placeholder="NFT name"
            value={formData.name}
          />
          <input
            onChange={e => setFormData({ ...formData, 'description': e.target.value })}
            placeholder="NFT description"
            value={formData.description}
          />
           <input
            onChange={e => setFormData({ ...formData, 'creator': e.target.value })}
            placeholder="NFT creator"
            value={formData.creator}
          />
          <input
            type="file"
            onChange={onChange}
          />
          <button onClick={createNFT}>Create NFT</button> */}
          <Album 
          nfts={NFTs}
          />
        </Route>
        <Route path='/signin'>
            <SignIn onSignIn={checkLoginState} />
        </Route>
        <Route path='/signup'>
            <SignUp onSignUp={checkLoginState}/>
        </Route>
      </div>
    </Router>
  );
});

export default App;
