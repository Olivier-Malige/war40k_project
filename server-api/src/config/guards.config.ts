import { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';

const { UNAUTHORIZED, getStatusText } = StatusCodes;

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(UNAUTHORIZED).json({
      error: getStatusText(UNAUTHORIZED),
    });
  }
};
