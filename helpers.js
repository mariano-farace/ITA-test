const userRepository = require("./infrastructure/server");

//Will return users who's login begins with it-academy and are Users
const filterItAcademyUsers = (userArray) => {
  const regex = /^it-academy/i;

  return userArray.filter(
    (user) => regex.test(user.login) && user.type === "User"
  );
};

//!Validar todo con joi?????

//Primero deberias extrar el campo "login" de la EDB que mapea a la key userID

//Para cada ebd.login, hacer una busqueda por nombre en la LDB. Si no existe, crealo, si existe, verifici

//añade los usuario que no existen en la bd local. Los comprueba con el nombre de usuario.
//Si el userid existe en EDB (como login) pero no EN LDB(como userid), LO CREA. username es obligatorio, y va a ser el login de la base comun
//Va a ser un filter usando la funcion findByUserName de LDB
const upsert = (externalDBUsers, userRepository) => {
  externalDBUsers.forEach((eUser) => {
    let wasFound = userRepository.findByUserName(eUser.login);
    if (wasFound == undefined) {
      console.log("paso por el crear nuevo!");
      userRepository.addUser({
        userName: eUser.login,
        externalId: eUser.id.toString(),
        picture: eUser.avatar_url,
      });
    } else {
      console.log("habia uno repetido");
      userRepository.updateUser({
        userName: eUser.login,
        externalId: eUser.id.toString(),
        picture: eUser.avatar_url,
      });
    }
  });
};

//para borrar los usuario de la base de datos es exactamente al revez

const deleteSync = (localDBUsers, externalDBUsers, userRepository) => {
  let toBeDeleted = localDBUsers.filter(
    (localUser) =>
      !externalDBUsers.map((eUser) => eUser.login).includes(localUser.userName)
  );
  toBeDeleted.forEach((user) =>
    userRepository.deleteUserByUserName(user.userName)
  );
};

//el update te lo debo:: compara los objetos por unique key (username/login), si isEqual devuelve false, hace update

module.exports = { filterItAcademyUsers, deleteSync, upsert };
