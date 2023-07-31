const app = require('./app');
const { db } = require('./database/config');

db.authenticate()

  .then(() => {
    console.log('Connection has been established successfully...🧐');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

db.sync()
  .then(() => {
    console.log('All models were synchronized successfully...🧐');
  })
  .catch((err) => {
    console.error('Unable to synchronize the models:', err);
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
