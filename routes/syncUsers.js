const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const { filterItAcademyUsers, upsertAndDelete } = require("../helpers");

const syncUsers = (userRepository) => {
  return async (req, res) => {
    const response = await fetch(
      "https://api.github.com/search/users?q=it-academy"
    );

    const data = await response.json();
    const totalExternalDBUsers = data.items;
    //External DB users
    const externalDBUsers = filterItAcademyUsers(totalExternalDBUsers);
    //Internal DB users
    const localDBUsers = userRepository.findAllUsers();

    const result = upsertAndDelete(
      localDBUsers,
      externalDBUsers,
      userRepository
    );

    res.json({
      message: "Synchronization succeeded",
      result,
    });
  };
};

module.exports = syncUsers;
