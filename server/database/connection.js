import mysql from "mysql";

const connectToDatabase = () => {

  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  connection.connect((err) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log("Connected to the MySQL server");
    }
  });

  return connection;
};

export default connectToDatabase;
