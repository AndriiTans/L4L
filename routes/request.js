var express = require('express');
var router = express.Router();
var axios = require('axios');

const config = {
  baseURL: 'https://launch-your-lunch.herokuapp.com',
  headers: { 'Content-Type': 'application/json' },
  transformResponse: [
    (data) => {
      return data;
    },
  ],
};

const requestInstance = axios.create(config);

router.get('/', async function (req, res, next) {
  const { url } = req.query;
  const { authorization } = req.headers;

  try {
    const response = await requestInstance({
      headers: authorization ? { authorization } : {},
      params: req.params,
      method: 'get',
      url,
    });
    res.send(response.data);
  } catch (error) {
    console.log('error', error.code);
    res.status(401);
    res.send(error);
  }
});

router.post('/', async function (req, res, next) {
  const { url } = req.query;
  const { authorization } = req.headers;

  try {
    const response = await requestInstance({
      headers: authorization ? { authorization } : {},
      params: req.params,
      data: req.body,
      method: 'post',
      url,
    });
    res.send(response.data);
  } catch (error) {
    console.log('error', error.status);
    res.status(401);
    res.send(error);
  }
});

module.exports = router;
