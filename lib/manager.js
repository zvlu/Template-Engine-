const Employee = require("./employee");

class Manager extends Employee {
    constructor (name,id,email,number){
        super(name,id,email);
        this.number = number;
        this.title = "Manager";

    }

    getNumber(){
        return this.number;
    }

    getRole(){
        return this.title;
    }
}

module.exports = Manager;