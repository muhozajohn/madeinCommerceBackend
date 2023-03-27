/**
 * @swagger
 * api/zeus/admin/aproveReq/{id}:
 *   put:
 *     summary: Update an event by ID
 *     tags: [Vendor Request]
 *     description: Requesting to be.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the Shop to update.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               shopName:
 *                 type: string
 *                 required: true
 *                 description: The shopName of Vendor
 *               shopAddress:
 *                 type: string
 *                 required: true
 *                 description: The shopAddress of vendor
 *     responses:
 *       200:
 *         description: Returns the created user
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */

// Request Approvr
/**
 * @swagger
 * /api/zeus/admin/aprove/{id}:
 *   put:
 *     summary: The Requested ID
 *     tags: [Vendor Approve]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the Shop to update.
 *     responses:
 *       200:
 *         description: Returns the Vendor Approved
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */

// Update a Shop

// =============================update Shop=========================
/**
 * @swagger
 *
 * /api/zeus/admin/update/{id}:
 *   put:
 *     summary: Update an event by ID
 *     tags: [Shop]
 *     description: Update an existing Shop with new data.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the Shop to update.
 *     requestBody:
 *       required: true
 *       description: The updated event data, including an image file.
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               shopName:
 *                 type: string
 *                 description: The updated shopName of the Shop.
 *               shopAddress:
 *                 type: string
 *                 description: The updated shopAddress of the Shop.
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

// Get all Shops

/**
 * @swagger
 * /api/zeus/admin/readShop:
 *   get:
 *     tags:
 *       - Shop
 *     description: Returns all Shop
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
// Get all Shops by id
/**
 * @swagger
 * /api/zeus/admin/readOne/{id}:
 *   get:
 *     tags:
 *       - Shop
 *     description: Returns all Shop
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the Shop to Get.
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
// Reject
/**
 * @swagger
 *  /api/zeus/admin/delete{id}:
 *   delete:
 *     tags: [Reject Request]
 *     description: Deletes a Vendor Request
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of Vendor Request You Are Goinfg To Reject
 *     responses:
 *       201:
 *         description: User has been deleted
 *       404:
 *         description: User ID not found
 *       500:
 *         description: Failed To Delete User
 */

// Get All Request
/**
 * @swagger
 * /api/zeus/admin/read:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns all Requested Vendor
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
