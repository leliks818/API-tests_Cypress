/// <reference types="cypress" />

describe("Capital.com Register Button Test", () => {
  it("should find and check the Register button", () => {
    // Откройте главную страницу сайта
    cy.visit("https://capital.com/ru");
    cy.get("#wphWrap > .js_signup")
      .contains(" Создать аккаунт")
      .should("be.visible") // Проверьте, что кнопка видима
      .click(); // Нажмите на кнопку, чтобы проверить её функциональность

    // Здесь можно добавить дополнительные проверки после нажатия
  });
});