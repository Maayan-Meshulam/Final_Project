export interface UserLogin {
    email: string,
    password: string
}

export interface UserReg {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    password: string,
    birthDay: Date | "",
    url: string | null,
    alt: string,
    city:string,
    street: string,
    houseNumber: number | "",
    zip:number | "",
    startDate: Date | "",
    role: string,
    jobType: string,
    fromWhereWorking: string,
    directManager: string,
    department: string,
    team: number | "",
    managerLevel: string,
    connectedEmployess: Array<string>
}