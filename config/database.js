const mongoose = require("mongoose");

exports.connect = () => {
    mongoose
        .connect("mongodb://localhost:27017/dataneuron-task2", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log(`DB CONNECTED SUCCESSFULLY`))
        .catch((error) => {
            console.log("DB CONNECTION FAILED");
            console.log(error);
            process.exit(1);
        });
};
