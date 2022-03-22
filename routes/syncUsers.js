const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const { filterItAcademyUsers, deleteSync, upsert } = require("../helpers");

const syncUsers = (userRepository) => {
  return async (req, res) => {
    const response = await fetch(
      "https://api.github.com/search/users?q=it-academy"
    );

    const data = await response.json();
    const totalExternalDBUsers = data.items;
    //External DB users
    const externalDBUsers = filterItAcademyUsers(totalExternalDBUsers);
    console.log("externalDBUsers lenght", externalDBUsers.length);
    //Internal DB users
    const localDBUsers = userRepository.findAllUsers();

    //Delete users that exist on localDB but not externalDB
    deleteSync(localDBUsers, externalDBUsers, userRepository);
    upsert(externalDBUsers, userRepository);

    res.send("Synchronization succeeded");
  };
};

module.exports = syncUsers;
