it("Deleting data From PostgreSQL database", () => {
    cy.task("DELETEFROMDB", {
        dbconfig: Cypress.config("DB"),
        deleteSql: 'DELETE FROM "LoginInformation" WHERE username = \'aDmin123\';',
      }).then((result) => {
        cy.log("Data deleted successfully:", result);
      });
      
  });
  