 class Employee {
    constructor(id,name,email,title){
        this.id = id;
        this.name = name;
        this.email = email;
        this.title = title;
    }
    getId(){
        return this.id;
    }

    getName(){
        return this.name;
    }

    getEmail(){
        return this.email
    }

    getTitle(){
        return this.title;
    }

    getRole(){
        return "Employee";
    }
}

module.exports = Employee;