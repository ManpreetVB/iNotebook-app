const mongoose=require('mongoose');


const mongoURI="mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDBCompass&directConnection=true&tls=false"


async function connectToMongo () {
   await mongoose.connect(mongoURI).then(()=>
        console.log("connected to mogo successfully")).catch(err=>console.log(err));
    }

module.exports=connectToMongo;