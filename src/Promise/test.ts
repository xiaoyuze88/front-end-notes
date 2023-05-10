// import promisesAplusTests from "promises-aplus-tests";
// import { Promise } from "./Promise";

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

promise
  .then((data) => {
    console.log("promise 1 then data: ", data);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data + "2");
      }, 1000);
    });
  })
  .then((data) => {
    console.log("promise 2 then data: ", data);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data + "3");
      }, 1000);
    });
  })
  .then((ok) => {
    console.log("final then", ok);
  })
  .catch((error) => {
    console.log("catch error", error);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("resolve after reject");
      }, 1000);
    });
  })
  .then((data) => {
    console.log("real final", data);
  });
