const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const { filterItAcademyUsers } = require("../helpers");

const syncUsers = (userRepository) => {
  return async (req, res) => {
    const response = await fetch(
      "https://api.github.com/search/users?q=it-academy"
    );
    const data = await response.json();
    const externalUsers = data.items;
    console.log("type of", typeof externalUsers);

    const allUsersFoundInDB = userRepository.findAllUsers();
    console.log(externalUsers);

    res.sendStatus(501);
  };
};

module.exports = syncUsers;
