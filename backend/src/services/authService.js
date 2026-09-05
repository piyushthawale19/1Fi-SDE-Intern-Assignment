const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../config/db');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const registerUser = async (email, password, name) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error('An account with this email already exists');

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name: name || null },
  });

  const token = generateToken(user.id);
  return { user: { id: user.id, email: user.email, name: user.name }, token };
};

const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid email or password');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid email or password');

  const token = generateToken(user.id);
  return { user: { id: user.id, email: user.email, name: user.name }, token };
};

const getMe = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, createdAt: true },
  });
  if (!user) throw new Error('User not found');
  return user;
};

module.exports = { registerUser, loginUser, getMe };
