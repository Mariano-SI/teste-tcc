import express from "express";
const app = express();
const port = process.env.PORT || 8080;
app.get("/:id", (req, res) => {
    const id = req.params.id;
    console.log("Cookies: ", id);
});

app.listen(port, () => {
  console.log("Server is running on port" + " " + port);
});