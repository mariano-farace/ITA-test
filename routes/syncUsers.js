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
    //Internal DB users
    const localDBUsers = userRepository.findAllUsers();

    //Delete users that exist on localDB but not externalDB
    const deleteResult = deleteSync(
      localDBUsers,
      externalDBUsers,
      userRepository
    );
    const upsertResult = upsert(externalDBUsers, userRepository);

    res.json({
      message: "Synchronization succeeded",
      upsertResult,
      deleteResult,
    });
  };
};

module.exports = syncUsers;
