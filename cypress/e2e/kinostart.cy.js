/// <reference types="cypress" />

describe("Start.ru Register form Testing", () => {
  it('should find and check the button "Продолжить"', () => {
    cy.visit("https://start.ru/auth");
    cy.get('[data-testid="signin_button_text"]')
      .contains("Продолжить")
      .should("be.visible")
      .should("have.css", "background-color", "rgba(0, 0, 0, 0)");
    cy.get('[data-testid="signin_button_text"]').contains("Продолжить").click();
  });
});
it("should find and check input", () => {
  cy.visit("https://start.ru/auth", { timeout: 100000 });
  cy.get("#login")
    .should("have.attr", "placeholder", "pochta@mail.ru")
    .should("be.visible");
  cy.get("#login").type("{enter}");
  cy.get(".AuthField_error__FT5m8").contains(
    "Введите номер телефона или почту",
  );
  cy.get("#login").type("yulka818818@gmail.com{enter}");
  cy.contains("Вход в аккаунт через почту");
});
it("should find and check button Megafon", () => {
  cy.visit("https://start.ru/auth");

  // Проверка кнопки с текстом "Я абонент МегаФона"
  cy.get(".Button_secondary__QQE_N")
    .should("have.text", "Я абонент МегаФона")
    .should("be.visible");

  // Проверка наличия иконки
  cy.get("img.AuthSteps_megafon_icon__xfQAP")
    .should("be.visible") // Проверка, что иконка видима на странице
    .and("have.attr", "alt", "megafon icon"); // Дополнительно проверяем, что у иконки правильный alt текст
});
//проверка тогла вход через телефон
it("should find and check togle Телефон ", () => {
  cy.visit("https://start.ru/auth", { timeout: 5000 });
  cy.get("body").should("exist").and("be.visible");
  cy.get("body").contains("Телефон").click();
  cy.get(".AuthField_label__jeOmY").contains("Введите телефон");
  cy.get("#login")
    .should("have.attr", "placeholder", "+7 XXX XXX XX XX")
    .type("+7 965 326 15 42{enter}");

  cy.contains("Регистрация через телефон", { timeout: 10000 }).should(
    "be.visible",
  );
});
