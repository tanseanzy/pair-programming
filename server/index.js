const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
// const () = require("./routes/())");

// app.use
app.use(cors());
app.use(express.json());

app.use(express.static("public/images"));

// app.use("/())", ()));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
