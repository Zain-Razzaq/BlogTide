import { connection } from "../app.js";


const addUser = async ({ id, name, email, hashedPassword, role }) => {
  connection.query(
    "INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)",
    [id, name, email, hashedPassword, role],
    (error, result) => {
      if (error) {
        return error;
      }
    }
  );
};

const findUser = async (email) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (error, result) => {
        if (error) {
          return reject(error);
        } else {
          return resolve(JSON.stringify(result[0]));
        }
      }
    );
  });
};

export { addUser, findUser };
