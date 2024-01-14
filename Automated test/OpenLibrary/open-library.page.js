class Loginprosses {
    static login(){
        cy.visit("https://openlibrary.org/");
        cy.get("li.hide-me > a").click();
        cy.location("href").should("eq", "https://openlibrary.org/account/login");
        cy.get("#username").click();
        cy.get("#username").type("siswatabanan@gmail.com");
        cy.get("#password").click();
        cy.get("#password").type("tabanan2016");
        cy.get("#test-body-mobile button").click();
        cy.location("href").should("eq", "https://openlibrary.org/people/aisychan/books");
    }
}
export default Loginprosses;