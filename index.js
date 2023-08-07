const express = require('express');
const passport = require('passport');
const session = require('express-session');
const OAuth2Strategy = require('passport-oauth2');
const helmet = require('helmet');
const app = express();
const morgan = require('morgan')


if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
  console.log('Please provide a CLIENT_ID and CLIENT_SECRET env var.');
  process.exit(1);
}

/******* BOILER PLATE ********/
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const callbackURL = process.env.CALLBACK_URL;

app.use(helmet());

app.use(morgan('tiny'));

app.use(session({
  secret: 'unsafe-temporary-secret-for-testing',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(undefined, { id: user.id });
});

passport.deserializeUser((user, done) => {
  done(undefined, user);
});

/***** LINODE OAUTH2 CONFIGURATION ******/
passport.use('linode', new OAuth2Strategy({
    authorizationURL: 'https://login.linode.com/oauth/authorize',
    tokenURL: 'https://login.linode.com/oauth/token',
    clientID,
    clientSecret,
    callbackURL,
    passReqToCallback: true,
    customHeaders: {
      Accept: 'application/json',
      "Accept-Language": "en-US,en;q=0.5"
    },
  },
  (req, accessToken, refreshToken, profile, cb) => {
    // Profile translates to a success in this app. Would normally do additional user verification.
    return cb(null, { id: 123 });
  }
));

app.get('/auth',
  passport.authenticate('linode'));

app.get('/auth/callback', 
  passport.authenticate('linode', { failureRedirect: '/failed' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
/***** END OAUTH2 CONFIGURATION ******/


app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).send('success');
  } else {
    res.redirect('/auth');
  }
});

app.get('/failed', (req, res) => {
  res.status(200).send('authentication failed');
})

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err) }
    res.redirect('/');
  })
})

// Error handler for when strategy fails
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500);
});

app.listen(3000, () => {
  console.log('Linode OAuth2 app listening on port 3000');
});
