// Express middleware to check if employee is logged in. If not prompt front-end to route to loggin
export function isLoggedIn(req, res, next) {
  if (!req.session.employee) {
    const response = { route: '/login', error: 'Employee not logged in' };
    res.json(response);
  } else {
    next();
  }
}