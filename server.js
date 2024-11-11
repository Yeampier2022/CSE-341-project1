const express = require("express");
const mongodb = require("./data/database");
const app = express();

const port = process.env.PORT || 3000;

app.use("/", require("./routes"));

mongodb.initDb((err, db) => {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});
