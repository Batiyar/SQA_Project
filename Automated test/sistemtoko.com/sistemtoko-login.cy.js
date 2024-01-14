describe("As an user i can using login feature with correct result", () => {
    beforeEach(() => {
        cy.viewport(1263, 800);
        cy.visit("https://sistemtoko.com/login");
      });
    //POSITIVE TEST
    it("I input correct username and password", () => {
        cy.fixture('user').then(user => {
            const username = user.users[0].user;
            const password = user.users[0].password;
            cy.get("div:nth-of-type(1) > input").type(username);
            cy.get("div:nth-of-type(2) > input").type(password);
          })
        cy.get("button").click();
        cy.location("href").should("eq", "https://sistemtoko.com/member?p=muthanifah");
    });
    //NEGATIVE TEST
    it("I input correct username but wrong password", () => {
        cy.fixture('user').then(user => {
            const username = user.users[1].user;
            const password = user.users[1].password;
            cy.get("div:nth-of-type(1) > input").type(username);
            cy.get("div:nth-of-type(2) > input").type(password);
          })
        cy.get("button").click();
        cy.wait(2000);
        cy.get("h4").should("have.text", " Operation Failed")
        cy.wait(2500);
    });
    it("I input uncorrect username but correct password", () => {
        cy.fixture('user').then(user => {
            const username = user.users[2].user;
            const password = user.users[2].password;
            cy.get("div:nth-of-type(1) > input").type(username);
            cy.get("div:nth-of-type(2) > input").type(password);
          })
        cy.get("button").click();
        cy.wait(2000);
        cy.get("h4").should("have.text", " Operation Failed")
        cy.wait(2000);
      });
    it("I input wrong username and password", () => {
        cy.fixture('user').then(user => {
            const username = user.users[3].user;
            const password = user.users[3].password;
            cy.get("div:nth-of-type(1) > input").type(username);
            cy.get("div:nth-of-type(2) > input").type(password);
          })
        cy.get("button").click();
        cy.wait(2000);
        cy.get("h4").should("have.text", " Operation Failed")
        cy.wait(2500);
    });
    it("Try to send code to my email with correct email", () => {
        cy.contains('I forgot my password').click();
        cy.get('input[type="email"].form-control[name="email"]').type('bachtiarahmad6969@gmail.com');
        cy.get('input[type="submit"].btn.btn-pin[value="Send Reminder"]').click()
        cy.wait(2000);
        cy.get('strong').should('have.text', "Password reminder sent! !");
        cy.wait(2500);
    });
    it("Try to sent code to my email with uncorrect email", () => {
        cy.contains('I forgot my password').click();
        cy.get('input[type="email"].form-control[name="email"]').type('usernameyangsalah@gmail.com');
        cy.get('input[type="submit"].btn.btn-pin[value="Send Reminder"]').click();
        cy.wait(2000);
        cy.get('strong').should("have.text", "We can't find a user with that e-mail address. !")
    });
  });
  