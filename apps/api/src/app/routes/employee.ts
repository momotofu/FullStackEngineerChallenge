import { genHash, adminOnlyRoute } from '../utils';

export function addEmployeeRoute(
  app,
  prefix,
  employeeRepo,
  reviewRepo,
) {
  /**
   * If employee has admin privliges this response will 
   * return an employee with reviews they own (i.e. reviews
   * other employees have written about them) and reviews
   * that are assigned to them.
   * 
   * Otherwise, only the employee and assigned reviews will
   * be returned.
   */
  app.get(`${prefix}/employee/:id/`, async (req, res) => {
    const user = req.session.employee;
    const isAdmin = user.isAdmin;

    const { id } = req.params;
    const employeeQuery = { where: { id }};

    if (isAdmin) {
      employeeQuery['relations'] = ['reviews'];
    }

    const employee = await employeeRepo.findOne(employeeQuery);

    // Added reviewdBy property
    if (isAdmin) {
      employee.reviews = employee.reviews.map(async review => {
      const query = { where: { id: review.assignedTo }}
      const reviewedBy = await employeeRepo.findOne(query);
      
        return {
          ...review,
          reviewedBy: reviewedBy.name
        };
      });
    }

    const assignedReviews = await reviewRepo.find({ assignedTo: id });
    employee['assignedReviews'] = assignedReviews;

    const response = {
      employee: employee
    }

    res.send(response);
  });

  app.post(`${prefix}/employee/new`, adminOnlyRoute, async (req, res) => {
    const { employee } = req.body;


    // Default password is employees email
    const email = employee.email;
    const passwordHash = await genHash(email);

    employee['passwordHash'] = passwordHash;

    const entity = await employeeRepo.create(employee);
    const results = await employeeRepo.save(entity);

    res.send(results);
  });

  app.put(`${prefix}/employee/:id`, adminOnlyRoute, async (req, res) => {
    const { employee } = req.body;
    const { id } = req.params;

    const employeeQuery = { where: { id }};
    const entity = await employeeRepo.findOne(employeeQuery);

    employeeRepo.merge(entity, employee);
    const results = await employeeRepo.save(entity)

    res.send(results);
  });

  app.delete(`${prefix}/employee/:id`, adminOnlyRoute, async (req, res) => {
    const { id } = req.params;
    const employeeQuery = { id };

    const results = await employeeRepo.delete(employeeQuery);

    res.send(results);
  });
}