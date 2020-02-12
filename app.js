const fs  = require ("fs");

const inquirer = require("inquirer");

const util = require("util");

const writeFile = util.promisify(fs.writeFile);
const Employee = require("./lib/employee");

const Manager = require("./lib/manager");

const Engineer = require("./lib/engineer");

const Intern = require("./lib/intern");

// const RenderHtml = require("./lib/renderhtml");

const Handlebars = require("handlebars");


function promptInfo(){

    return inquirer
        .prompt([
            {
                name: "name",
                message: "Enter Name:",
                type: "Input",
                validate: (input) => {
                    if(input === ""){
                        return "ENTER A VALID NAME"
                    }
                    return true;
                }
            },
            {
                name: "id",
                message: "Enter your id:",
                type: "Input",
            },
            {
                name:"email",
                message:"Enter Email:",
                type:"input",
                validate:(input) => {
                    if(input === "") {
                        return "Enter a valid Email"
                    }
                    return true;
                }
            },
            {
                name:"role",
                message: "Whats Your Role:",
            },
            {
                name: "number",
                message:"Enter Office number:",
                when: (answers) => (answers.role).toLowerCase() === "manager"
            },
            {
                name:"School",
                message:"Enter School",
                validate: (input) => {
                    if(input === ""){
                        return "Enter a valid School"
                    }
                    return true;
                },
                when: (answers) => (answers.role).toLowerCase()=== "intern"
            },
            {
                name: "github",
                message:"Enter github username",
                type: "input",
                when: (answers) => (answers.role).toLowerCase() === "engineer"

            },
            {
                name: "Addmore",
                type: "confirm",
                message: "Wanna add more members?",
            },


        ]);
}

async function info(){

    var addEmployees = true;

    fs.copyFileSync('./templates/index.html', './render.html');

    let employeesArr = [];

    
    while (addEmployees == true){

        const answers = await promptInfo();

       

        if ((answers.role).toLowerCase() == "manager"){

            const managerOne = new Manager(answers.name, answers.id, answers.email, answers.number);

           employeesArr.push(managerOne);

        }else if ((answers.role).toLowerCase()== "engineer"){

            const engineerOne = new Engineer(answers.name, answers.id,answers.email,answers.github);

            employeesArr.push(engineerOne);

        }else if ((answers.role).toLowerCase() == "intern"){

            const internOne = new Intern (answers.name,answers.id,answers.email,answers.School);

            employeesArr.push(internOne);

        }
        addEmployees = answers.Addmore;

        // if (addEmployees == "no") {
            
           

        // }
    }
    renderCard(info);
}

async function renderCard (info, Addmore) {

    var Role = (info.title).toLowerCase();

    var fileName = "templates/" + Role + ".html";

    let content;

    fs.readFile(fileName, function(err, data){
        if(err){
            throw err;
        }
        content = data.toString();
        var template = Handlebars.compile(content);
        var html = template(info);

        fs.writeFile("./render.html", html, function(err){
            if (err){
                throw err
            }else if (Addmore === "no"){

                var footerHtml = "</div></div></body></html>";

                fs.appendFile("./render.html", footerHtml, function(err){
                    if (err){
                        throw err;

                    } else {
                        console.log("TEAM CREATED")
                    }
                })
            }
        })
    });
    return "render card done";

}
info();