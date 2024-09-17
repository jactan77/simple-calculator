const fs = require("fs");
class UserManager{
    constructor(filepath){
        this.filepath = filepath;
    }
    readUser(){
        try {
            const data = fs.readFileSync(this.filepath, 'utf-8');
            return JSON.parse(data);
        } catch(error){
            console.error('invalid user');
            return [];
        }
    }
    writeUser(users){
    try{    
        fs.writeFileSync(this.filepath, JSON.stringify(users, null, 4));
        
    } catch(error){
        console.error('error');
    }
    
    
}
}

module.exports = UserManager;