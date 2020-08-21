const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const employees = [];

const promptUser = function () {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Please enter the employee's name."
    },
    {
      type: "input",
      name: "id",
      message: "Please entter the employee's ID."
    },
    {
      type: "input",
      name: "email",
      message: "Please enter the employee's email."
    },
    {
      type: "list",
      name: "role",
      message: "Please enter the employee's role.",
      choices: ["Manager", "Engineer", "Intern"]
    },
    {
      type: "input",
      name: "officeNumber",
      message: "Please enter the manager's office number.",
      when: (answer) => answer.role === "Manager"
    },
    {
      type: "input",
      name: "gitHub",
      message: "Please enter the engineer's gitHub username.",
      when: (answer) => answer.role === "Engineer"
    },
    {
      type: "input",
      name: "school",
      message: "Please enter the intern's school name.",
      when: (answer) => answer.role === "Intern"
    },
  ]).then(function (content) {
    console.log(content);
    addEmployee();
    switch (content.role) {
      case "Manager":
        const addManager = new Manager(
          content.name,
          content.id,
          content.email,
          content.officeNumber,
        )
        employees.push(addManager);
        break;
      case "Engineer":
        const addEngineer = new Engineer(
          content.name,
          content.id,
          content.email,
          content.gitHub,
        )
        employees.push(addEngineer);
        break;
      case "Intern":
        const addIntern = new Intern(
          content.name,
          content.id,
          content.email,
          content.school,
        )
        employees.push(addIntern);
        break;
    }
  });
};

const addEmployee = function () {
  inquirer.prompt(
    {
      type: "confirm",
      name: "add",
      message: "Would you like to add another employee?"
    }
  ).then(function (answer) {
    if (answer.add === true) {
      promptUser();
    }
    else {
      fs.writeFile(outputPath, render(employees), function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("Success! Employee has been added to the team");
        console.log("Our team: ", employees);
      })
    }
  })
}
promptUser();
