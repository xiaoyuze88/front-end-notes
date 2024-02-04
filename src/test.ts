// // const strictUriEncode = require('strict-uri-encode')
// // const queryString = require('query-string');

// // const str = '[{"TagKey":"负责人","TagValue":"yuewangchen"}]'

// // console.log(queryString.stringify({
// //   helloworld: str,
// // }))

// const { EventEmitter } = require('node:events');
// const util = require('util');

// function Helloworld() {
//   EventEmitter.call(this);

//   console.log('emit', this.emit);
// }

// util.inherits(Helloworld, EventEmitter);

// const helloworld = new Helloworld();

import { requestTrafficControl } from "./trafficControl";

export const delay = (duration: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), duration);
  });

let count = 0;

const request = async () => {
  count++;

  const result = count;

  await delay(1000 + Math.random() * 500);

  return result;
};

Promise.all([...Array(100)].map(() => request())).then((resp) => {
  console.log("resp", resp);
});
