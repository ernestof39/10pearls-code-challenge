import { NextFunction, Request, Response } from 'express';
import User from '../models/entities/user.entity';

export const validateUserExistsById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    return res.status(404).json({
      status: 404,
      message: 'User not found',
    });
  }

  next();
};
export const validateEmailAlreadyExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.body.email;

  const user = await User.findOne({ where: { email } });

  if (user) {
    return res.status(400).json({
      status: 400,
      message: 'Email already exists in the system',
    });
  }

  next();
};
