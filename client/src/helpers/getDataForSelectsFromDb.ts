//ייבוא של כל העובדים תחת מנהל ספציפי
const getYourEmployess = async(user:any) => {

    if(user.managerLevel < 1)
        return []
    else{
        await getYourEmployess(user.id)
        .then((res:any)=>{
            return res.data;            
        })
        .catch(err=>{})
    }
}

export {
    getYourEmployess
}