/// <reference types="cypress" />

describe("First test", () => {
  const baseUrl = "https://www.rom.on.ca/";

  beforeEach(() => {
    // Обработчик uncaught:exception
    Cypress.on("uncaught:exception", (err, runnable) => {
      // Возвращаем false, чтобы предотвратить падение теста из-за ошибок приложения
      return false;
    });

    // Переход на сайт перед каждым тестом
    cy.visit(baseUrl, { timeout: 50000 });
  });

  // test visit form
  it("Check visit form", () => {
    cy.get("a[href='/en/visit-us'] span").click();
    //assert
    cy.url().should("include", "https://www.rom.on.ca/en/visit-us");
    cy.get("div #banner h1").should("have.text", " Visit Us ");
  });

  // test visit form (without click) -> by tickets
  it("Check visit form without click and click on the ticket", () => {
    // Hover over the menu item
    cy.get(".awemenu").trigger("mouseover").should("be.visible");
    cy.get("li.awemenu-item-1-1").should("be.visible");

    cy.get('a[href*="tickets"]')
      .contains("Buy Tickets")
      .invoke("removeAttr", "target")
      .click({ force: true });

    cy.contains("Book Tickets").should("be.visible");
  });
});
