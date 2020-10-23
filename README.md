## High level description of design and technologies used
#### Models: (TypeORM and PostgreSQL)
  - Employees
    - Can have admin privliges or not
  Reviews
    - Are owned by an Employee, and can be assigned to an Employee
    
#### API:
- Used REST/CRUD
- Sessions to handle login and employees

#### Tooling: Nx Monorepo
- Front-end:
  - Node.js/Express.js
  - TypeORM 
- Backend: 
  - React.js
  - React Router
  - Typescript / JavaScript
  - Material-UI
    
#### UX:
- Employee login/logout
- if Employee has admin, they are directed to the Admin view, otherwise they will be directed to the Employee view
- Admin can CRUD employees and grant admin priviliges

Note: Review views have not yet been implemented.

## Setup
Development OS: MacOS Catalina\
Node version: v12.14.0

Setup postgreSQL database
```
brew install postgresql
createdb paypay
```

Install Nx and Typeorm CLI
```
npm i typeorm -g
npm install -g nx
```

Start API
```
nx serve api
```

Start Front-end
```
nx serve fs-challenge
```

Note: After starting the server, the database will be seeded with
Employee's. A few have admin privileges.

Recommended login: 
  - Email: admin@finalstage.com
  - password: admin

You can view seeded employee credentials at `/apps/api/src/seed.ts`.\
New employees you create will automatically have their email as their password.

---

# Full Stack Developer Challenge
This is an interview challengs. Please feel free to fork. Pull Requests will be ignored.

## Requirements
Design a web application that allows employees to submit feedback toward each other's performance review.

*Partial solutions are acceptable.*  It is not necessary to submit a complete solution that implements every requirement.

### Admin view
* Add/remove/update/view employees
* Add/update/view performance reviews
* Assign employees to participate in another employee's performance review

### Employee view
* List of performance reviews requiring feedback
* Submit feedback

## Challenge Scope
* High level description of design and technologies used
* Server side API (using a programming language and/or framework of your choice)
  * Implementation of at least 3 API calls
  * Most full stack web developers at PayPay currently use Java, Ruby on Rails, or Node.js on the server(with MySQL for the database), but feel free to use other tech if you prefer
* Web app
  * Implementation of 2-5 web pages using a modern web framework (e.g. React or Angular) that talks to server side
    * This should integrate with your API, but it's fine to use static responses for some of it 
* Document all assumptions made
* Complete solutions aren't required, but what you do submit needs to run.

## How to complete this challenge
* Fork this repo in github
* Complete the design and code as defined to the best of your abilities
* Place notes in your code to help with clarity where appropriate. Make it readable enough to present to the PayPay interview team
* Complete your work in your own github repo and send the results to us and/or present them during your interview

## What are we looking for? What does this prove?
* Assumptions you make given limited requirements
* Technology and design choices
* Identify areas of your strengths
