"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "John",
          lastName: "Muhoza",
          email: "muhozajohn4@gmail.com",
          profile:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
          isVerified: true,
          address: "huye",
          roleId: 1,
          password:
            "$2b$10$pqa1bK9KneQF/mRxIk9JUeBE8v/Ei5LBpclcNCKLXQN5.OPtErjxe",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "John",
          lastName: "Muhoza",
          email: "muhozajohn250@gmail.com",
          profile:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
          isVerified: true,
          address: "huye",
          roleId: 2,
          password:
            "$2b$10$pqa1bK9KneQF/mRxIk9JUeBE8v/Ei5LBpclcNCKLXQN5.OPtErjxe",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Kunda",
          lastName: "Pauline",
          email: "kundapauline2002@gmail.com",
          profile:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
          isVerified: true,
          address: "huye",
          roleId: 2,
          password:
            "$2b$10$pqa1bK9KneQF/mRxIk9JUeBE8v/Ei5LBpclcNCKLXQN5.OPtErjxe",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "John",
          lastName: "Muhoza",
          email: "muhozajohn123@gmail.com",
          profile:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
          isVerified: true,
          address: "huye",
          roleId: 3,
          password:
            "$2b$10$pqa1bK9KneQF/mRxIk9JUeBE8v/Ei5LBpclcNCKLXQN5.OPtErjxe",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
