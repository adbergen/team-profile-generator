// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(name, email, id, gitHub) {
    super(name, email, id)
    this.gitHub = gitHub;
  }
  getGithub() {
    return this.gitHub;
  }
  getRole() {
    return "Engineer";
  }
}
module.exports = Engineer;
