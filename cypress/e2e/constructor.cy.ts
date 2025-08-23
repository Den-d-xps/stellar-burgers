/// <reference types="cypress" />

describe('Тест страницы конструктора бургера', () => {

  const testBun = "Тестовый ингредиент булка-2";
  const testMain = "Тестовый ингредиент котлета-1";
  const testSauce = "Тестовый ингредиент соус-1";

  beforeEach(() => {
    cy.intercept("GET", "**/api/ingredients", { fixture: "ingredients.json" });

    cy.viewport(1300, 800)
    cy.visit("http://localhost:4000");
  });

  describe('Добавление ингредиентов в конструктор', () => {
    it("Добавление булки в конструктор", () => {
      cy.get('[data-cy="bun-ingredient"]')
        .contains(testBun)
        .parent()  
        .contains("Добавить")
        .click();

      cy.get('[data-cy="constructor-bun-top"]')
        .contains(testBun)
        .should('exist');
      cy.get('[data-cy="constructor-bun-bottom"]')
        .contains(testBun)
        .should('exist');
    });

    it("Добавление начинки в конструктор", () => {
      cy.get('[data-cy="main-ingredient"]')
        .contains(testMain)
        .parent()
        .contains("Добавить")
        .click();

      cy.get('[data-cy="constructor-ingredients"]')
        .contains(testMain)
        .should('exist');
    });

    it("Добавление соуса в конструктор", () => {
      cy.get('[data-cy="sauce-ingredient"]')
        .contains(testSauce)
        .parent()
        .contains("Добавить")
        .click();

      cy.get('[data-cy="constructor-ingredients"]')
        .contains(testSauce)
        .should('exist');
    });
  });

  describe('Проверка работы модальных окон', () => {
    it("Открытие и закрытие модального окна ингредиента (по крестику)", () => {
      cy.get('[data-cy="bun-ingredient"]')
        .contains(testBun)
        .click();

      cy.get('[data-cy="modal"]').contains(testBun).should('exist');

      cy.get('[data-cy="modal-close"]').click();

      cy.get('[data-cy="modal"]').should("not.exist");
    });

    it("Открытие и закрытие модального окна ингредиента (по оверлею)", () => {
      cy.get('[data-cy="bun-ingredient"]')
        .contains(testBun)
        .click();

      cy.get('[data-cy="modal"]').contains(testBun).should('exist');

      cy.get('[data-cy="modal-overlay"]').click('topLeft', { force: true });

      cy.get('[data-cy="modal"]').should("not.exist");
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
      cy.get('[data-cy="bun-ingredient"]')
        .contains(testBun)
        .parent()
        .contains("Добавить")
        .click();
      cy.get('[data-cy="main-ingredient"]')
        .contains(testMain)
        .parent()
        .contains("Добавить")
        .click();
      cy.get('[data-cy="sauce-ingredient"]')
        .contains(testSauce)
        .parent()
        .contains("Добавить")
        .click();

      // Нажимаем "Оформить заказ"
      cy.get('[data-cy="burger-constructor"]')
        .contains("Оформить заказ")
        .click();

      cy.wait("@createOrder")
        .its("request.body")
        .should("deep.equal", {
          ingredients: [ "2", "3", "5", "2" ]
        });

      // Проверка модалки с номером заказа
      cy.get('[data-cy="modal"]').contains("12345").should("exist");

      // Закрытие модалки
      cy.get('[data-cy="modal-overlay"]').click('topLeft', { force: true });
      cy.get('[data-cy="modal"]').should("not.exist");

      // Проверка, что конструктор пуст
      cy.get('[data-cy="burger-constructor"]').should("exist");
      cy.get('[data-cy="constructor-bun-top"]')
        .should("not.exist");
      cy.get('[data-cy="constructor-ingredients"]')
        .should("not.contain", testMain);
      cy.get('[data-cy="constructor-ingredients"]')
        .should("not.contain", testSauce);
      cy.get('[data-cy="constructor-bun-bottom"]')
        .should("not.exist");
    });
  });
});
