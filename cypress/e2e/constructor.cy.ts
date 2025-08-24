/// <reference types="cypress" />

describe('Тест страницы конструктора бургера', () => {

  const testBun = "Тестовый ингредиент булка-2";
  const testMain = "Тестовый ингредиент котлета-1";
  const testSauce = "Тестовый ингредиент соус-1";

  beforeEach(() => {
    cy.intercept("GET", "**/api/ingredients", { fixture: "ingredients.json" });

    cy.viewport(1300, 800)
    cy.visit("/");

    cy.get('[data-cy="constructor-ingredients"]').as("constructorIngredients");
    cy.get('[data-cy="bun-ingredient"]').as("bunIngredient");
    cy.get('[data-cy="burger-constructor"]').as("constructor");
  });


  describe('Добавление ингредиентов в конструктор', () => {
    it("Добавление булки в конструктор", () => {
      cy.addBun(testBun);

      cy.get('[data-cy="constructor-bun-top"]').as("constructorBunTop");
      cy.get('[data-cy="constructor-bun-bottom"]').as("constructorBunBottom");

      cy.get('@constructorBunTop')
        .contains(testBun)
        .should('exist');
      cy.get('@constructorBunBottom')
        .contains(testBun)
        .should('exist');
    });

    it("Добавление начинки в конструктор", () => {
      cy.addMain(testMain);

      cy.get('@constructorIngredients')
        .contains(testMain)
        .should('exist');
    });

    it("Добавление соуса в конструктор", () => {
      cy.addSauce(testSauce);

      cy.get('@constructorIngredients')
        .contains(testSauce)
        .should('exist');
    });
  });

  describe('Проверка работы модальных окон', () => {
    it("Открытие и закрытие модального окна ингредиента (по крестику)", () => {
      cy.get('@bunIngredient')
        .contains(testBun)
        .click();

      cy.get('[data-cy="modal"]').as("modal");

      cy.get('@modal').contains(testBun).should('exist');

      cy.get('[data-cy="modal-close"]').click();

      cy.get('@modal').should("not.exist");
    });

    it("Открытие и закрытие модального окна ингредиента (по оверлею)", () => {
      cy.get('@bunIngredient')
        .contains(testBun)
        .click();

      cy.get('[data-cy="modal"]').as("modal");

      cy.get('@modal').contains(testBun).should('exist');

      cy.get('[data-cy="modal-overlay"]').click('topLeft', { force: true });

      cy.get('@modal').should("not.exist");
    });
  });

  describe('Проверка работы функции заказа', () => {
    beforeEach(() => {
      window.localStorage.setItem('refreshToken', 'testRefreshToken');
      cy.setCookie('accessToken', 'testAccessToken');

      cy.intercept("GET", "**/api/auth/user", { fixture: "user.json" });
      cy.intercept("GET", "**/api/orders/all", { fixture: "feeds.json" });
      cy.intercept("POST", "**/api/orders", { fixture: "order.json" }).as("createOrder");
    });

    it("Создание заказа", () => {

      // Добавляем ингредиенты
      cy.addBun(testBun);
      cy.addMain(testMain);
      cy.addSauce(testSauce);

      cy.get('[data-cy="constructor-bun-top"]').as("constructorBunTop");
      cy.get('[data-cy="constructor-bun-bottom"]').as("constructorBunBottom");

      // Нажимаем "Оформить заказ"
      cy.get('@constructor')
        .contains("Оформить заказ")
        .click();

      cy.wait("@createOrder")
        .its("request.body")
        .should("deep.equal", {
          ingredients: [ "2", "3", "5", "2" ]
        });

      // Проверка модалки с номером заказа
      cy.get('[data-cy="modal"]').as("modal");
      cy.get('@modal').contains("12345").should("exist");

      // Закрытие модалки
      cy.get('[data-cy="modal-overlay"]').click('topLeft', { force: true });
      cy.get('@modal').should("not.exist");

      // Проверка, что конструктор пуст
      cy.get('@constructor').should("exist");
      cy.get('@constructorBunTop')
        .should("not.exist");
      cy.get('@constructorIngredients')
        .should("not.contain", testMain);
      cy.get('@constructorIngredients')
        .should("not.contain", testSauce);
      cy.get('@constructorBunBottom')
        .should("not.exist");
    });
  });
});
