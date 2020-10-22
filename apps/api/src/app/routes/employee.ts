import { genHash } from '../utils';

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

  app.post(`${prefix}/employee/new`, async (req, res) => {
    const { employee } = req.body;
    console.log('rew body', JSON.stringify(req.body));
    const email = employee.email;
    const passwordHash = await genHash(email);

    employee['passwordHash'] = passwordHash;

    const entity = await employeeRepo.create(employee);
    const results = await employeeRepo.save(entity);

    res.send(results);
  });
}