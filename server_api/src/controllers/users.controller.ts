import {
  createUser,
  findUserPerUsername,
  searchUsersPerUsername,
} from '../queries/users.queries';
import path from 'path';
import multer from 'multer';
import { Request, Response, NextFunction } from 'express';

import StatusCodes  from 'http-status-codes';
const { OK, NOT_ACCEPTABLE } = StatusCodes;

type File = Express.Multer.File;

const upload = multer({
  storage: multer.diskStorage({
    destination: (_, __: File, cb: Function) => {
      cb(null, path.join(__dirname, '../../public/images/avatars'));
    },
    filename: (_, file: File, cb: Function) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

export const userList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const search = req.query.search as string;
    const users = await searchUsersPerUsername(search);
    res.render('includes/search-menu', { users });
  } catch (e) {
    next(e);
  }
};

export const userProfile = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const username = req.params.username;
    const user = await findUserPerUsername(username);
    if (user) {

    } else {

    }
  } catch (e) {
    next(e);
  }
};

export const signup = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    await createUser(body);
    res.status(OK).end();
  } catch (e) {
    res.status(NOT_ACCEPTABLE).json({
      error: e,
    });
  }
};

export const uploadImage = [
  upload.single('avatar'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (user) {
        user.avatar = `/images/avatars/${req.file.filename}`;
        await user.save();
        res.redirect('/');
      } else {
        res.end();
      }
    } catch (e) {
      next(e);
    }
  },
];


