import { check, validationResult } from 'express-validator';

// Kiểm tra dữ liệu đăng ký người dùng
export const validateRegister = [
   check('username').notEmpty().withMessage('Tên người dùng không được để trống'),
   check('email').isEmail().withMessage('Email không hợp lệ'),
   check('password').isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự'),
   check('phoneNumber').optional().isMobilePhone().withMessage('Số điện thoại không hợp lệ'),
   (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }
      next();
   }
];

// Kiểm tra dữ liệu đăng nhập
export const validateLogin = [
   check('email').isEmail().withMessage('Email không hợp lệ'),
   check('password').notEmpty().withMessage('Mật khẩu không được để trống'),
   (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }
      next();
   }
];
