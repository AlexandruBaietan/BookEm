import express from "express";

const main = () => {
  const app = express();
  app.get("/", (req, res) => {
    res.send("Hello world");
  });

  app.listen(3000, () => {
    console.log("App on");
  });
};

main();
