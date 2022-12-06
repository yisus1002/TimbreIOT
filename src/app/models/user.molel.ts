export class User{
    id?:string;
    role?:string;
    password?:string;
    name:string;
    lastName:string;
    email:string;

    constructor(
        id: string,
        role:string,
        name: string,
        lastName: string,
        email: string,
        password: string,

    ){
        this.id=id;
        this.role=role;
        this.name=name;
        this.lastName=lastName;
        this.email=email;
        this.password=password;
    }
}