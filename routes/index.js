const express = require('express');
const router = express.Router();
const {FusionAuthClient} = require('@fusionauth/node-client');
const client = new FusionAuthClient('9822f717-6a43-419a-a2f1-764100a3f50f', 'http://localhost:9011');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {user: req.session.user, title: 'FusionAuth Example'});
});

/* OAuth return from FusionAuth */
router.get('/oauth-redirect', function (req, res, next) {
  // This code stores the user in a server-side session
  client.exchangeOAuthCodeForAccessToken(req.query.code,
                                         '9822f717-6a43-419a-a2f1-764100a3f50f',
                                         'Hx7mEG8oXJ-NwjiAqMNBpXUKy-Xtf_t8hbNub9DGHGw',
                                         'http://localhost:3000/oauth-redirect')
      .then((response) => {
        return client.retrieveUserUsingJWT(response.successResponse.access_token);
      })
      .then((response) => {
        req.session.user = response.successResponse.user;
      })
      .then(() => {
        res.redirect(302, '/');
      });
});

module.exports = router;
