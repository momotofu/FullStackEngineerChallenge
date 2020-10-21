export function addIndexRoute(
  app,
  prefix,
  employeeRepo,
  reviewRepo
) {
  app.get(prefix, async (req, res) => {
    const employee = req.session.employee;

    if (employee == undefined) {
      const response = { error: 'Not logged in' };
      return res.send(response);
    }

    const isAdmin = employee.isAdmin;
    
    const employeeDetails = {
      name: employee.name,
      photoURL: employee.photoURL,
      bio: employee.bio,
    };


    if (isAdmin) {
      const employees = await employeeRepo.find();
      const response = {
        employees: employees,
        isAdmin: true,
        employee: employeeDetails,
      };

      return res.send(response);
    }

    // Get reviews assigned to employee
    const employeeID = employee.id;
    const reviews = reviewRepo.find({ assignedTo: employeeID });

    // Prepare response
    const response = {
      reviews: reviews,
      isAdmin: false,
      employee: employeeDetails,
    };

    res.send(response);
  });
}
