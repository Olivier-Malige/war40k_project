import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import httpStatusCodes from 'http-status-codes';
const { OK, UNAUTHORIZED } = httpStatusCodes;

export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      next(err);
    } else if (!user) {
      res.status(UNAUTHORIZED).json({
        error: info,
      });
    } else {
      req.login(user, err => {
        if (err) {
          next(err);
        } else {
          res.status(OK).end();
        }
      });
    }
  })(req, res, next);
};

export const logout = (req: Request, res: Response) => {
  req.logout();
  res.status(OK).end();
};
