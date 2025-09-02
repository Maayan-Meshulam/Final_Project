const normaliztionUser = (user:any) => {

    const { firstName, lastName, phone, email, password, birthDay, imageUrl, alt,
        city, street, houseNumber, zip,startDate, jobType,role, fromWhereWorking, managerName
        , department, team, managerLevel, connectedEmployess
    } = { ...user }

    console.log(imageUrl+ " img url");
    
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
            url:imageUrl == "" ? "client/src/images/profile.png" : imageUrl,
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
        managerName:managerName ,
        department: department,
        team: team,
        managerLevel: managerLevel,
        connectedEmployess: connectedEmployess
    }
}

export default normaliztionUser;