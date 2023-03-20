'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Customers', [{
      firstName: 'John',
      lastName: 'Muhoza',
      email:'muhozajohn4@gmail.com',
      profile:'john',
      roleId: 1,
      password: '<zeus/>',
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      firstName: 'Robert',
      lastName: 'niyitanga',
      email:'robert@gmail.com',
      profile:'robert',
      roleId: 2,
      password: '<robert/>',
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      firstName: 'Zeus',
      lastName: 'DeSaint',
      email:'zeus@gmail.com',
      profile:'zeus',
      roleId: 2,
      password: '<zeus/>',
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      firstName: 'muhoza',
      lastName: 'john',
      email:'john@gmail.com',
      profile:'muhoza',
      roleId: 3,
      password: '<john/>',
      createdAt: new Date(),
      updatedAt: new Date(),

    }
  ],{});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
