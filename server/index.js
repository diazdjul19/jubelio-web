const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routers/routes");
const dotenv = require("dotenv");

dotenv.config();
//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

app.use("/", routes);

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
