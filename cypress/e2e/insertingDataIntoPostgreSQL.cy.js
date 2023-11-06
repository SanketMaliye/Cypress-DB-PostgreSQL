it("Inserting data into PostgreSQL database", () => {
  cy.task("INSERTINTODB", {
    dbconfig: Cypress.config("DB"),
    insertSql:
      "INSERT INTO \"LoginInformation\" (username, password) VALUES ('aDmin123', 'admin123');",
    testSql: "SELECT 1;",
  }).then((result) => {
    cy.log("Data inserted successfully:", result);
  });
});
