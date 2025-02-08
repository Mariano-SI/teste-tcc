import express from "express";
const app = express();

app.get("/:id", (req, res) => {
    const id = req.params.id;
    console.log("Cookies: ", id);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});