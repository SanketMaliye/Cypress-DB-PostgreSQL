it("Fetching data from database and used in Script", () => {
    cy.task("READFROMDB", {
      dbconfig: Cypress.config("DB"),
      sql: 'select * from "LoginInformation"',
    }).then((result) => {
      console.log(result.rows);
      expect(result.rows).to.have.lengthOf(1);
      const row = result.rows[0];
      const username = row.username;
      const password = row.password;
  
      cy.log("Username:", username);
      cy.log("Password:", password);
  
      cy.visit(
        "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
      );
      cy.get('input[name="username"]').should("be.visible", { timeout: 5000 });
      cy.get('input[name="username"]').type(username);
      cy.get('input[name="password"]').should("be.visible", { timeout: 5000 });
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').should("be.visible", { timeout: 5000 });
      cy.get('button[type="submit"]').click();
      cy.title().should('include', 'OrangeHRM');
    });
  });