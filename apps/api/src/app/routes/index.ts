export function addIndexRoute(
  app,
  prefix,
  employeeRepo,
) {
  app.get(prefix, async (req, res) => {
    const employee = req.session.employee;

    if (employee == undefined) {
      const response = { error: 'Not logged in' };
  
      return res.status(400).send(response);
    }

    const isAdmin = employee.isAdmin;
    
    const employeeDetails = {
      id: employee.id,
      name: employee.name,
      photoURL: employee.photoURL,
      email: employee.email,
      bio: employee.bio,
    };

    const employees = await employeeRepo.find();

    if (isAdmin) {
      const response = {
        isAdmin: true,
        employees: employees,
        employee: employeeDetails,
      };

      return res.send(response);
    }

    // Prepare response
    const response = {
      isAdmin: false,
      employeeId: employeeDetails.id,
    };

    res.send(response);
  });
}
