import bcrypt from 'bcrypt';


export function addLoginRoute(
  app,
  prefix,
  employeeRepo,
) {
  app.post(`${prefix}/login`, async (req, res, next) => {
    const { email, password } = req.body;

    // Check if user entered in an email and password
    if (!email || !password) {
      const response = { route: '/login', error: 'Invalid details'};
      res.status(400);
      res.send(response);
    }

    // Search for user
    const employee = await employeeRepo.findOne(email);
    const passwordHash = employee.passwordHash;

    // Hash password
    const match = await bcrypt.compare(password, passwordHash);

    if (!match) {
      const response = { route: '/login', error: 'Email or password is invalid' };
      res.status(400);
      res.send(response);
    }

    // Log user into session
    req.session.employee = employee; 

    // Reroute front-end 
    const response = { route: '/' };
    res.send(response);
  });
}