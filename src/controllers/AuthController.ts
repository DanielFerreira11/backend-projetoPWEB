import { Request, Response } from 'express';
import { comparePassword, generateToken } from '../utils/auth';
import AdminRepository from '../repository/AdminRepository';
import StudentRepository from '../repository/StudentRepository';

class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    const admin = await AdminRepository.findByEmail(email);
    const student = await StudentRepository.findByEmail(email);
    let user;

    if (student) { user = student }

    if (admin) { user = admin }

    if (!user) {
      res.status(404).json({ error: 'User not found.' })
      return;
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid password.' });
      return;
    }

    const token = generateToken(user.id, user.email);
    res.status(200).json({ message: 'Login sucessful.', token });
    return;
  }
}

export default new AuthController();