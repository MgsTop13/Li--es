import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config();
const KEY = process.env.KeyJwt

export function generateToken(usuario) {
  const userInfo = {
    name: usuario.name,
    email: usuario.email,
    pass: usuario.recuperacao,
    role: usuario.id_user,
    benedito: usuario.benedito,
    english: usuario.insf,
    ComunidadeTop: usuario.admin,
    date: new Date()
  };
  console.log(usuario)
  return jwt.sign(userInfo, KEY, { expiresIn: '7h' });
}

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, KEY);
    return decoded;
  } catch(error) {
    return error;
  }
}


export function getTokenInfo(req) {
  try {
    let token = req.headers['x-access-token'];
    if (token === undefined)
      token = req.query['x-access-token']

    return jwt.verify(token, KEY);
  } catch {
    return null;
  }
}

export function getAuthentication(checkRole, throw401 = true) {
  return (req, resp, next) => {
    try {
      let token = req.headers['x-access-token'];
      if (token === undefined)
        token = req.query['x-access-token'];

      const signd = jwt.verify(token, KEY);
      req.user = signd;

      if (checkRole && !checkRole(signd) && signd.role !== 'admin')
        return resp.status(403).end();

      next();
    } catch {
      if (throw401) {
        resp.status(401).end();
      } else {
        next();
      }
    }
  }
}