const express = require("express");
const InMemoryUserRepository = require("./in-memory-user.repository");
const app = express();
app.use(express.json());

const userRepository = new InMemoryUserRepository();

const getUsersRoute = require("../routes/getUsers")(userRepository);
const syncUsersRoute = require("../routes/syncUsers")(userRepository);

app.get("/users", getUsersRoute);
app.get("/users/sync", syncUsersRoute);
app.post("/users/seed", (req, res) => {
  try {
    userRepository.addUser({
      userName: "pepe",
      externalId: "some id",
      picture: "some url",
      email: "somee@mial.com",
    });

    userRepository.addUser({
      userName: "It-academy-web",
      externalId: "Info Vieja",
      picture: "https://avatars.githubusercontent.com/u/66022964?v=4",
    });

    res.send("Some user added");
  } catch (err) {
    console.log("error:", err);
    res.json("some error");
  }
});

//module.exports = {app, userRepository}
exports.server = userRepository;
exports.server = app;
