const filterItAcademyUsers = (userArray) => {
  const regex = /^it-academy/i;

  return users.filter((user) => regex.test(user.login));
};

//!Validar todo con joi?????

//añade los usuario que no existen en la bd local. Los comprueba con el nombre de usuario.
//Si el userid existe en EDB pero no EN LDB, LO CREA. username es obligatorio, y va a ser el login de la base comun
//Va a ser un filter usando la funcion findByUserName de LDB
const AdNonExistingUsersToDB = (userRepository, externalUsers) => {
  users.filter((user) => regex.test(user.login));
};

//para borrar los usuario de la base de datos es exactamente al revez

//el update te lo debo:: compara los objetos por unique key (username/login), si isEqual devuelve false, hace update

module.exports = { filterItAcademyUsers };
