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

/**
 * @swagger
 * /api/zeus/users/upDate/{id}:
 *   put:
 *     tags:
 *       - Users
 *     description: Update User by User Id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user to update
 *         required: true
 *         type: string
 *       - name: firstName
 *         in: formData
 *         description: The firstName of the user
 *         required: true
 *         type: string
 *       - name: lastName
 *         in: formData
 *         description: The lastName of the user
 *         required: true
 *         type: string
 *       - name: email
 *         in: formData
 *         description: The email of the user
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         description: The password of the user
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Update success
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
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
