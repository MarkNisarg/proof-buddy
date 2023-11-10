import app from "./app.js"
import db from "./models/index.js"

const PORT = process.env.PORT || 3001;

// Check database sync.
db.sequelize.sync()
  .then(() => {
    console.log("Database synced.");
  })
  .catch((err) => {
    console.log("Error in database sync: " + err.message);
  });

app.listen(PORT, () => {
  console.log("----------------------------------");
  console.log(`Server is running on port ${PORT}.`);
  console.log("----------------------------------");
});
