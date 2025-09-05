const normaliztionUser = (user:any) => {

    const { firstName, lastName, phone, email, password, birthDay, url, alt,
        city, street, houseNumber, zip,startDate, jobType,role, fromWhereWorking, directManager
        , department, team, managerLevel, connectedEmployess
    } = { ...user }

    console.log(url+ " img url");
    
    return {
        name: {
            first: firstName,
            last: lastName
        },
        phone: phone,
        email: email,
        password: password ,
        birthDay: birthDay,
        image:{
            url:url == "" ? "client/src/images/profile.png" : url,
            alt: alt == "" ? "defult profile" : alt,
        },
        address:{
            city: city,
            street: street ,
            houseNumber: houseNumber,
            zip: zip
        },
        startDate: startDate,
        role: role,
        jobType: jobType ,
        fromWhereWorking: fromWhereWorking,
        directManager:directManager ,
        department: department,
        team: team,
        managerLevel: managerLevel,
        connectedEmployess: connectedEmployess
    }
}

export default normaliztionUser;