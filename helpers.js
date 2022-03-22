const userRepository = require("./infrastructure/server");

//Will return users who's login begins with it-academy and are Users
const filterItAcademyUsers = (userArray) => {
  const regex = /^it-academy/i;

  return userArray.filter(
    (user) => regex.test(user.login) && user.type === "User"
  );
};

const upsertAndDelete = (localDBUsers, externalDBUsers, userRepository) => {
  let createdCount = 0;
  let updatedCount = 0;
  let deletedCount = 0;

  //Upsert
  externalDBUsers.forEach((eUser) => {
    let wasFound = userRepository.findByUserName(eUser.login);
    if (wasFound == undefined) {
      userRepository.addUser({
        userName: eUser.login,
        externalId: eUser.id.toString(),
        picture: eUser.avatar_url,
      });
      createdCount++;
    } else {
      userRepository.updateUser({
        userName: eUser.login,
        externalId: eUser.id.toString(),
        picture: eUser.avatar_url,
      });
      updatedCount++;
    }
  });
  //Delete
  let toBeDeleted = localDBUsers.filter(
    (localUser) =>
      !externalDBUsers.map((eUser) => eUser.login).includes(localUser.userName)
  );
  toBeDeleted.forEach((user) => {
    userRepository.deleteUserByUserName(user.userName);
    deletedCount++;
  });
  return {
    created: createdCount,
    updated: updatedCount,
    deleted: deletedCount,
  };
};

module.exports = { filterItAcademyUsers, upsertAndDelete };
