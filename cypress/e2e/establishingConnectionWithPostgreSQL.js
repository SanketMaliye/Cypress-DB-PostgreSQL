it("Connecting to PostgreSQL Database", () => {
  cy.task("READFROMDB", {
    dbconfig: Cypress.config("DB"),
    sql: 'select * from "LoginInformation"',
  }).then((result) => {
    cy.log(result.rows);
    expect(result.rows).to.have.lengthOf(1);
    expect(result.rows[0]).to.deep.include({
      username: "Admin",
      password: "admin123",
    });
  });
});


