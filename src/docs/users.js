/**
 * @swagger
 * /api/zeus/users/signUp:
 *   post:
 *     summary: Create a new User
 *     tags: [Users]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 required: true
 *                 description: The firstName of User
 *               lastName:
 *                 type: string
 *                 required: true
 *                 description: The lastname of User
 *               profile:
 *                 type: string
 *                 format: binary
 *                 required: true
 *                 description: The profile of User
 *               email:
 *                 type: string
 *                 required: true
 *                 description: The email of User
 *               password:
 *                 type: string
 *                 required: true
 *                 description: The password of User
 *     responses:
 *       200:
 *         description: Returns the created user
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */

// Signin
/**
 * @swagger
 * /api/zeus/users/login:
 *  post:
 *      summary: "Login on a MadeIn"
 *      tags: [Users]
 *      description: "Needed is  email and password"
 *      consumes:
 *        - multipart/form-data
 *      parameters:
 *       - in: formData
 *         name: email
 *         type: string
 *         required: true
 *       - in: formData
 *         name: password
 *         type: string
 *         required: true
 *
 *      responses:
 *       "201":
 *         description: "Account created"
 *       "200":
 *         description: Success
 *       "403":
 *         description: "Account creation failed"
 *
 */

// Get all users

/**
 * @swagger
 * /api/zeus/users/getAll:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns all Users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of posts
 *         schema:
 *           type: array
 *       500:
 *         description: Internal server error
 */

// Update a user

// =============================update users=========================
/**
 * @swagger
 *
 * /api/zeus/users/update/{id}:
 *   put:
 *     summary: Update an event by ID
 *     tags: [Users]
 *     description: Update an existing event with new data.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the event to update.
 *     requestBody:
 *       required: true
 *       description: The updated event data, including an image file.
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The updated firstName of the User.
 *               lastName:
 *                 type: string
 *                 description: The updated lastName of the user.
 *               email:
 *                 type: string
 *                 description: The updated email of the User.
 *               password:
 *                 type: string
 *                 password: The updated lastName of the user.
 *               profile:
 *                 type: string
 *                 format: binary
 *                 description: An updated image file for the user.
 *     responses:
 *       200:
 *         description: OK. Returns the updated User.
 *       500:
 *         description: Internal Server Error. Something went wrong on the server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 */

// delte user
/**
 * @swagger
 *  /api/zeus/users/delete/{id}:
 *   delete:
 *     tags: [Users]
 *     description: Deletes a user
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to delete
 *     responses:
 *       201:
 *         description: User has been deleted
 *       404:
 *         description: User ID not found
 *       500:
 *         description: Failed To Delete User
 */
