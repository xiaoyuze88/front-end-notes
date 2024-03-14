// import promisesAplusTests from "promises-aplus-tests";
import { Promise } from "./Promise";

// promisesAplusTests(Promise, function(err) {
//   // All done; output is in the console. Or check `err` for number of failures.
//   if (err) {
//     console.error(err);
//   }
// });

const promise = new Promise((resolve, reject) => {
  console.log("kick off");

  setTimeout(() => {
    // if (Math.random() > 0.5) {
    //   return reject("oops");
    // }

    resolve("helloworld");
  }, 1000);
});

// A
promise
  .then((data) => {
    console.log("promise 1 then data: ", data);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // resolve(data + "2");
        reject(data + "2");
      }, 1000);
    });
  })
  // B
  .then((data) => {
    console.log("promise 2 then data: ", data);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data + "3");
      }, 1000);
    });
  })
  // C
  .then((ok) => {
    // return new P
    console.log("final then", ok);
  })
  // C
  .catch((error) => {
    console.log("catch error", error);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("resolve after reject");
      }, 1000);
    });
  })
  // C
  // .catch()
  // ()
  // D
  .then(
    (data) => {
      console.log("real final", data);
    },
    (error) => {
      console.error("error", error);
    }
  )
  .finally(() => {
    console.log("finally");
  });

// const genPromise = (data, duration) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(data);
//     }, duration);
//   });
// };

// console.time("race");

// Promise.race([genPromise(1, 1000), genPromise(2, 2000), genPromise(3, 3000)]).then((datas) => {
//   console.log(datas);
//   console.timeEnd("race");
// });

// sync 1
console.log("script start");

// @ts-ignore
setImmediate(() => {
  console.log("Immediate");
});

process.nextTick(() => {
  console.log("nextTick");
});

async function async1() {
  await async2();
  // micro 1
  console.log("async1 end");
}
async function async2() {
  // sync 2
  console.log("async2 end");
}
async1();

setTimeout(function() {
  // macro 1
  console.log("setTimeout");
}, 0);

new Promise((resolve) => {
  // sync 3
  console.log("Promise");
  resolve();
})
  .then(function() {
    // micro 2
    console.log("promise1");
  })
  .then(function() {
    console.log("promise2");
  });

// sync 4
console.log("script end");

// script start
// async2 end
// Promise
// script end
// async1 end
// promise1
// promise2
// setTimeout

// const fs = require('fs');

// console.time('fs');

// fs.readFile('Promise.ts', () => {
//   console.timeEnd('fs');
//   setTimeout(() => {
//     console.log('timeout');
//   }, 0);
//   setImmediate(() => {
//     console.log('immediate');
//   });
// });

// setImmediate(() => {
//   console.log('immediate');
// });

// setTimeout(() => {
//   console.log('timeout');
// }, 0);
