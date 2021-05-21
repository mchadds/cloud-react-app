import React, { useState, useEffect } from 'react';
import './App.css';
import { withAuthenticator, AmplifyAuthenticator, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';
import { API, Storage, Auth } from 'aws-amplify';
import { listNFTs } from './graphql/queries';
import { createNFT as createNFTMutation, deleteNFT as deleteNFTMutation } from './graphql/mutations';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
// intial form state

interface NFT {
  id?: string
  name: string,
  description: string,
  image?: string,
  creator: string
  soldfor?: number
  askingprice?: number
}

const initialFormState: NFT = { name: '', description: '', creator: '' };


const App = (() => {
  // set intital state of app component
  const [NFTs, setNFTs] = useState<NFT[] | []>([]);
  const [formData, setFormData] = useState(initialFormState);
  const [loggedIn, setLoggedIn] = useState(false);

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
    setNFTs(apiData.data.listNFTs.items)
  };

  // create NFT via api call
  const createNFT = async () => {
    if (!formData || !formData.description) return;
    await API.graphql({ query: createNFTMutation, variables: { input: formData} });
    if (formData.image) {
      const image: string = await Storage.get(formData.image) as string;
      formData.image= image;
    }
    setNFTs([ ...NFTs, formData]);
    setFormData(initialFormState);
  };

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
      debugger;
      console.log('logged in');
      setLoggedIn(true);
    })
    .catch(() => {
      debugger;
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
          {/* <div style={{ visibility: !loggedIn ? "hidden" : "visible"}}> */}
          <Link 
            to="/signup"
            style={{ visibility: !loggedIn ? "visible" : "hidden"}}
            >
              <Button variant="contained" color="primary">
                Sign Up
              </Button>
            </Link>
          {/* </div> */}
          
        </header>
        <Route exact path="/">
          <h1>My NFTs</h1>
          <input
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
          <button onClick={createNFT}>Create NFT</button>
          <div style={{marginBottom: 30}}>
            {
              NFTs.map((nft: NFT) => (
                <div key={nft.id || nft.name}>
                  <h2>{nft.name}</h2>
                  <p>{nft.description}</p>
                  <button onClick={() => deleteNFT(nft.id)}>Delete NFT</button>
                  {
                    nft.image && <img src={nft.image} style={{width: 400}} />
                  }
                </div>
              ))
            }
          </div>
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
