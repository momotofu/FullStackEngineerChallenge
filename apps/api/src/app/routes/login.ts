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
      const response = { route: '/login', error: 'No form details were sent'};
      res.status(400);
      return res.send(response);
    }

    // Search for user
    const employee = await employeeRepo.findOne({ email });

    if (employee == undefined) {
      const response = { route: '/login', error: 'Email or password is invalid' };
      res.status(400);
      return res.send(response);
    }

    const passwordHash = employee.passwordHash;

    // Hash password
    const match = await bcrypt.compare(password, passwordHash);

    if (!match) {
      const response = { route: '/login', error: 'Email or password is invalid' };
      res.status(400);
      return res.send(response);
    }

    // Log user into session
    req.session.employee = employee; 

    const response = { route: '/', msg: 'Successfully logged in' };
    res.send(response);
  });

  app.get(`${prefix}/logout`, (req, res) => {
    req.session.destroy(() => {
      console.log("User logged out");
    });

    const response = { route: '/login', msg: 'User logged out' };
    res.send(response);
  });
}