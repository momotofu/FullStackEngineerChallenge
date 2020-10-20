// Express middleware to check if employee is logged in. If not prompt front-end to route to loggin
export function isLoggedIn(req, res, next) {
  const originalUrl = req.originalUrl;
  const isLoginRoute = originalUrl == '/api/login';

  if (!req.session.employee && !isLoginRoute) {
    const response = { route: '/login', error: 'Employee not logged in' };
    res.json(response);
  } else {
    next();
  }
}