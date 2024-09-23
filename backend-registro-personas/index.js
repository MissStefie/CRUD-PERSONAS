const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const methods = require("./controllers/CRUDBD");

dotenv.config();

const app = express();
app.set("port", 4000);

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://127.0.0.1:5501",
      "http://127.0.0.1:5500",
      "http://localhost:3000",
    ],
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*"); // Permite todas las orígenes
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,PUT,PATCH,POST,DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.get("/people", methods.get_personas);
app.delete("/delete_person/:id", methods.delete_personas);
app.post("/create_person", methods.create_personas);
app.put("/update_person/:id", methods.update_personas);

app.listen(app.get("port"), () => {
  console.log("Servidor corriendo en puerto", app.get("port"));
  console.log("Base de datos: ", process.env.DATABASE);
});
