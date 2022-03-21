const InMemoryUserRepository = require("../infrastructure/in-memory-user.repository");

describe("In-Memory User Repository", () => {
  const userRepository = new InMemoryUserRepository();
  const testUser = {
    userName: "it-academyproject",
    externalId: "test1234",
    email: "test@itacademy.es",
  };

  const invalidUser = {
    login: "it-academyproject",
    externalId: "test1234",
  };

  it("should allow me to add a valid user", () => {
    const success = userRepository.addUser(testUser);
    expect(success).toBe(true);
  });

  it("should not allow me to add an invalid user", () => {
    try {
      userRepository.addUser(invalidUser);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  it("should return added users", () => {
    const allUsers = userRepository.findAllUsers();
    expect(allUsers.length).toBe(1);
    expect(allUsers[0]).toStrictEqual(testUser);
  });

  it("should allow me to update a user", () => {
    const updateUser = {
      userName: "it-academyproject",
      email: "tech@itacademy.es",
    };

    userRepository.updateUser(updateUser);
    const user = userRepository.findByUserName(updateUser.userName);

    expect(user).toStrictEqual({
      userName: "it-academyproject",
      externalId: "test1234",
      email: "tech@itacademy.es",
    });
  });

  it("should allow me to delete a user", () => {
    userRepository.deleteUserByUserName("it-academyproject");

    const allUsers = userRepository.findAllUsers();

    expect(allUsers.length).toBe(0);
  });
});
