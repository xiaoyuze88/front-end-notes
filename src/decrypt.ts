import jwt, { VerifyOptions } from 'jsonwebtoken';
// import crypto from 'crypto';
import nodeUtils from 'util';

const token = jwt.sign(
  {
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
    dat: 'foobar',
  },
  'secret'
);

console.log('token', token)

const resp = jwt.verify(token, 'secret');

console.log('resp', resp);