import { Request, Response, NextFunction } from 'express';

const { validationResult } = require('express-validator');

export const validateFields = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const erroMsg = errors['errors']?.map((err: any) => err.msg);

    return res.status(400).json({
      status: 400,
      message: 'Bad request',
      errors: erroMsg,
    });
  }

  next();
};
