import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { Auth } from 'aws-amplify';
import { Link as RouteLink, useHistory } from 'react-router-dom';

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
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = ({ onSignUp }: any) => {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [submittedSignUp, setSubmittedSignUp] = useState(false);
  const history = useHistory();

  const signUp = async () => {
    try {
        const { user } = await Auth.signUp({
            username,
            password,
            attributes: {
                email 
            }
        });
        debugger;
        console.log(user);
        setSubmittedSignUp(true);
        onSignUp();
    } catch (error) {
        console.log('error signing up:', error);
    }
  }

  const confirmSignUp = async() => {
    try {
        debugger;
      await Auth.confirmSignUp(username, confirmationCode);
      history.push('/');
      onSignUp();

    } catch (error) {
        console.log('error confirming sign up', error);
    }
}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        
        { !submittedSignUp ? <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        : <Typography component="h1" variant="h5">
            Awaiting Confirmation Code
        </Typography>}
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
                <Grid item xs={12}>
                <TextField
                    InputProps={{ readOnly: submittedSignUp }}
                    variant="outlined"
                    required
                    fullWidth
                    name="username"
                    label="Username"
                    type="username"
                    id="username"
                    onChange={e => setUsername(e.target.value.toLowerCase())}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    InputProps={{ readOnly: submittedSignUp }}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={e => setPassword(e.target.value)}
                />
                </Grid>
                <Grid item xs={12} //style={{ visibility: !submittedSignUp ? "visible" : "hidden"}}
                >
                <TextField
                    InputProps={{ readOnly: submittedSignUp }}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={e => setEmail(e.target.value)}
                />
            </Grid>
            
            <Grid item xs={12} style={{ visibility: submittedSignUp ? "visible" : "hidden"}}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmationcode"
                label="Confirmation Code"
                type="code"
                id="confirmationCode"
                onChange={e => setConfirmationCode(e.target.value)}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          { !submittedSignUp ? <Button
            //type="submit"
            id="signUpButton"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signUp}
          >
            Sign Up
          </Button> : 
          <Button
            //type="submit"
            id="confirmCodeButton"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={confirmSignUp}
            >
            Submit Confirmation Code
            </Button>}
          <Grid container justify="flex-end">
            <Grid item>
            <RouteLink to="/signup">
                Already have an account? Sign in
              </RouteLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignUp;