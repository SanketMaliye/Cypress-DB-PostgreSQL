const { defineConfig } = require("cypress");
const pg = require("pg");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        READFROMDB({ dbconfig, sql }) {
          const client = new pg.Pool(dbconfig);
          return client.query(sql);
        },
        INSERTINTODB({ dbconfig, insertSql, testSql }) {
          const client = new pg.Pool(dbconfig);
          return client.connect()
            .then(() => client.query(insertSql))
            .then(() => client.query(testSql))
            .then((result) => {
              client.end();
              return result;
            })
            .catch((error) => {
              client.end();
              throw error;
            });
        },
        DELETEFROMDB({ dbconfig, deleteSql }) {
          const client = new pg.Pool(dbconfig);
          return client.connect()
            .then(() => client.query(deleteSql))
            .then((result) => {
              client.end();
              return result;
            })
            .catch((error) => {
              client.end();
              throw error;
            });
        },
      });
    },
    DB: {
      user: "postgres",
      host: "localhost",
      database: "master",
      password: "Sanket@123",
      port: "5432",
    },
  },
});
