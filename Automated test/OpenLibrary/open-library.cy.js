import Loginprosses from "./open-library.page";
describe("Open-library-userflow", () => {
  beforeEach(() => {
    cy.viewport(1263, 900);
  });
  it("Should be able to login", () => {
    Loginprosses.login()
  });
  it('Should be able to type and search using search bar', () => {
    cy.visit('https://openlibrary.org/');
    cy.get("input[type='text']").click();
    cy.get("input[type='text']").type("robin hood {enter} ");
    cy.get("li:nth-of-type(3) > div.details > div a").should('be.visible');
  });
  it("Should be able to read book on homepage lists", () => {
    Loginprosses.login();
    cy.get("div.logo-component img").click();
    cy.location("href").should("eq", "https://openlibrary.org/");
    cy.get("#slick-slide22 > div.book-cta a").click();
    cy.origin('https://archive.org', () => {
      cy.get("ul.controls > li:nth-of-type(3) div").click();
      cy.get("ul.controls > li:nth-of-type(3) div").click();
      cy.get("ul.controls > li:nth-of-type(3) div").click();
      cy.get("ul.controls > li:nth-of-type(3) div").click();
      cy.get("ul.controls > li:nth-of-type(3) div").click();
    })
  });
  it("Should be able search by using trending books option", () => {
    cy.visit("https://openlibrary.org/");
    cy.get("#header-bar > ul summary").click();
    cy.get("#header-bar > ul li:nth-of-type(2) > a").first().click();
    cy.location("href").should("eq", "https://openlibrary.org/trending/now");
    cy.get("li:nth-of-type(1) > div.details > div a").click();
  });
  it("Add Lists of book", () => {
    Loginprosses.login();
    cy.get("li.create-new-list > a").click();
    cy.location("href").should("eq", "https://openlibrary.org/people/aisychan/lists/add");
    cy.get("#list-edit > input").click();
    cy.get("#list-edit > input").type("My book lists");
    cy.get("#wmd-input-0").click();
    cy.get("#wmd-input-0").type("desc for testing ");
    cy.get('input.ac-input__visible.ui-autocomplete-input[placeholder="Search for a book"]').type("robin hood");
    cy.get("div.formElement > button").click();
    cy.get("h1").should("have.text", 'My book lists')
  });

});
