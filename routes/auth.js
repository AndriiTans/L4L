var express = require('express');
var router = express.Router();
const {
  ClientCredentials,
  ResourceOwnerPassword,
  AuthorizationCode,
} = require('simple-oauth2');

router.post('/oath2/token', async function (req, res, next) {
  const { client_id, client_secret, email, password } = req.body;
  const config = {
    client: {
      id: client_id,
      secret: client_secret,
    },
    auth: {
      tokenHost: 'https://launch-your-lunch.herokuapp.com/oauth/token',
    },
  };

  const client = new ResourceOwnerPassword(config);
  const tokenParams = {
    username: email,
    password: password,
  };

  try {
    const accessToken = await client.getToken(tokenParams);
    res.send(JSON.stringify(accessToken));
  } catch (error) {
    const message = (error.data.payload || {}).error_description;
    const status = ((error.data || {}).res || {}).statusCode;

    res.status(status);
    res.send(message);
  }
});

module.exports = router;
