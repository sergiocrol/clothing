const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// path is included in de core of node, dependency is not necessary here
const path = require('path');

// If env is not production (so, it is development or testing), load the dotenv into our process env (allowing it to access to the secret key)
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// this returns us a function which in require the secret key as first parameter
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

// BodyParser middleware converts into JSON the body content comming from the requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// In Production, we get the actual route (__dirname) and we serve all the files in https://mydomain.com/client/build
// we can also pass as first parameter a string if we want to serve it under certain domain
// app.use(express.static('public', path.join(__dirname, 'client/build'))) -> https://mydomain.com/public/client/build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  // for any route not covered by any other defined routes, we send as response de index.html -> So all of our frontend 
  // code will be built into index.html
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, error => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});

app.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'eur'
  };

  // Before send a response to the client, we communicate with Stripe API sending the body.
  // if there is any error with the payment we send the response with the error, if not, with the success
  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});