import mongoose from "mongoose"

export const connectDB = (uri) => {
   mongoose
      .connect(uri, { dbName: "whatsapp_db" })
      .then((data) => {
         console.log("Connected to DB: ", data.connection.host);
      })
      .catch((error) => {
         throw error;
      });
};