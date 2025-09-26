const { hash } = require("bcrypt");

hash("Root2005!", 10)
.then(res=> console.log(res))
.catch(err=>console.log("נוצרה שגיאה נסה שנית"));


