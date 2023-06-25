import { Request, Response } from 'express';
import UserRequestBodyDto from '../../models/dto/user.request.body.dto';
import User from '../../models/entities/user.entity';
import PaginationOptionDto from '../../models/dto/pagination.option.dto';
import { FindOptions, Op } from 'sequelize';

export const getAllUsers = async (req: Request, res: Response) => {
  const pagination = new PaginationOptionDto(req);

  pagination.sort = pagination.sort ? pagination.sort : 'id';

  const options: FindOptions = {
    limit: pagination.size,
    offset: pagination.page * pagination.size,
  };

  if (User.getAttributes()[pagination.sort]) {
    options.order = [[pagination.sort, pagination.order]];
  }

  if (pagination.search) {
    options.where = {
      [Op.or]: [
        { name: { [Op.like]: `%${pagination.search}%` } },
        { email: { [Op.like]: `%${pagination.search}%` } },
      ],
    };
  }

  let result;
  try {
    result = await User.findAndCountAll(options);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
    return res
      .status(500)
      .json({ status: 500, message: 'Unable to query information: ' + error });
  }

  const totalPages = Math.ceil(result.count / pagination.size);
  const total = result.count;
  const pageSize = pagination.size;
  const currentPage = pagination.page;
  const nextPage = currentPage + 1;
  const previousPage = currentPage - 1 > 0 ? currentPage - 1 : 0;
  const hasNext = currentPage < totalPages - 1;

  res.json({
    content: result.rows,
    pagination: {
      totalPages,
      total,
      pageSize,
      currentPage,
      nextPage,
      previousPage,
      hasNext,
    },
  });
};
export const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;

  const usuario = await User.findByPk(id);

  res.json({ usuario });
};
export const createNewUsers = async (req: Request, res: Response) => {
  const userDto = <UserRequestBodyDto>req.body;

  //const newUser = User.build({ ...userDto });
  //await newUser.save();
  const user = new User({
    name: userDto.name,
    email: userDto.email,
    phoneNumber: userDto.phoneNumber,
  });
  await user.save();

  res.json({ user });
};
export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const userDto = <UserRequestBodyDto>req.body;

  const user = await User.findOne({ where: { email: userDto.email } });

  if (user && user.id != id) {
    return res.status(400).json({
      msg: `Email ${userDto.email} already exists in the system`,
    });
  }

  await User.update({ ...userDto }, { where: { id } });
  const updated = await User.findByPk(id);
  res.json({ updated });
};
export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  const usuario = await User.findByPk(id);

  if (!usuario) {
    return res.status(404).json({
      msg: `User with id ${id} does not exist`,
    });
  }

  User.destroy({ where: { id } });
  res.json({ usuario });
};
