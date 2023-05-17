// function Parent() {
//   this.name = "Paul";
//   this.age = 30;
//   this.job = 'engineer'
// }

// Parent.prototype = {
//   constructor: Parent,
//   sayHi() {
//     console.log(`hi, i am ${this.name}, i'm ${this.age} years old`);
//   }
// };

// function Child() {
//   Parent.call(this);

//   this.name = "Tom";
//   this.age = 5;
//   this.job = null
// }

// // Child.prototype = new Parent();
// // Child.prototype.constructor = Child;
// Child.prototype = Object.create(Parent.prototype);

// Child.prototype.sayChildHi = () => {
//   console.log("hi i am child");
// };

// const parent = new Parent();
// const child = new Child();

// parent.sayHi();

// // parent.sayChildHi();

// child.sayHi();
// child.sayChildHi();

// Child.prototype.__proto__ = Parent.prototype;
// const child = new Child();

// child.__proto__.__proto__ = Child.prototype.__proto__ = Parent.prototype;


// debugger;
