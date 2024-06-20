import * as randomProgram from "./random";

const callTheFunction = async () => {
  console.log("Triggering functions , please wait !");
  // ==============================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // await randomProgram.init();
  // await randomProgram.fetchRandomNumber();
  await randomProgram.generateRandomNumber();

  console.log("Functions Triggered, success !");
  console.log("sent =>>>>>>>>");
  // ==============================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // ==============================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
};

callTheFunction();

// npm start run
