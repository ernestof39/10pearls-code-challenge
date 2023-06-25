import { Router } from 'express';
import { check } from 'express-validator';
import {
  getAllUsers,
  getUserById,
  createNewUsers,
  updateUser,
  deleteUser,
} from '../../controllers/user/user.controller';
import {
  validateEmailAlreadyExists,
  validateUserExistsById,
} from '../../middleware/validate-user';
import { validateFields } from '../../middleware/validate-fields';

const router = Router();

/**
 * Get all users
 */
router.get('/', getAllUsers);

/**
 * Get user by id
 */
router.get(
  '/:id',
  [
    check('id', 'The id must be a number').isNumeric(),
    check('id', 'The id must be greater than 0').isInt({ min: 1 }),
    validateFields,
    validateUserExistsById,
  ],
  getUserById
);

/**
 * Create new user
 */
router.post(
  '/',
  [
    check('name', 'The name is required').not().isEmpty(),
    check('name', 'Name can not contain special characters').isAlpha('es-ES', {
      ignore: ' ',
    }),
    check('email', 'The email is required').not().isEmpty(),
    check('email', 'The email is not valid').isEmail(),
    check('phoneNumber', 'phoneNumber can only contain numbers')
      .isNumeric()
      .isLength({ min: 10, max: 10 }),
    validateFields,
    validateEmailAlreadyExists,
  ],
  createNewUsers
);

/**
 * Update user
 */
router.put(
  '/:id',
  [
    check('id', 'The id must be a number').isNumeric(),
    check('id', 'The id must be greater than 0').isInt({ min: 1 }),
    check('name', 'name cannot be empty').not().isEmpty(),
    check('name', 'Name can not contain special characters').isAlpha('es-ES', {
      ignore: ' ',
    }),
    check('email', 'email cannot be empty').not().isEmpty(),
    check('email', 'The email is not valid').isEmail(),
    check('phoneNumber', 'phoneNumber can only contain numbers')
      .isNumeric()
      .isLength({ min: 10, max: 10 }),
    validateFields,
    validateUserExistsById,
  ],
  updateUser
);

/**
 * Delete user by id
 */
router.delete(
  '/:id',
  [
    check('id', 'The id must be a number').isNumeric(),
    check('id', 'The id must be greater than 0').isInt({ min: 1 }),
    validateFields,
    validateUserExistsById,
  ],
  deleteUser
);

export default router;
