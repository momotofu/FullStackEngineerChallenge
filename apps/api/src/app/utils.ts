// Package imports
import bcrypt from 'bcrypt';

// Returns a password hash using bycrypt
export async function genHash(password) {
  const saltRounds = 10;
  const hash = bcrypt.hash(password, saltRounds);
  return hash;
}


// Express middleware to check if employee is logged in. If not prompt front-end to route to loggin
export function isLoggedIn(req, res, next) {
  const originalUrl = req.originalUrl;
  const isLoginRoute = originalUrl == '/api/login';

  if (!req.session.employee && !isLoginRoute) {
    const response = { route: '/login', error: 'Employee not logged in' };
    return res.json(response);
  }
  
  next();
}

// If employee doesn't have admin permissions block this route
export function adminOnlyRoute(req, res, next) {
  const user = req.session.employee;
  const isAdmin = user.isAdmin;

  // If employee doesn't have admin access they can't access this route
  if (!isAdmin) {
    res.status(400);
    const response = { error: 'You do not have permission to access this route' };

    return res.send(response);
  }

  next();
}