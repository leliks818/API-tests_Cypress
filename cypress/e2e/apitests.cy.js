describe("API Testing - GET Request", () => {
  it("List users", () => {
    cy.request("GET", "https://reqres.in/api/users?page=1").then((response) => {
      // Проверка статуса
      expect(response.status).to.eq(200);

      // Проверка структуры данных
      expect(response.body).to.have.property("support"); // Убедимся, что есть поле "data"
      expect(response.body.data).to.be.an("array"); // "data" должно быть массивом
      expect(response.body.data.length).to.be.greaterThan(0);

      // Проверка конкретного пользователя
      expect(response.body.data[0]).to.have.property("id");
      expect(response.body.data[0]).to.have.property("email");
    });
  });
  it("Single user", () => {
    cy.request("GET", "https://reqres.in/api/users/2").then((response) => {
      // Проверка статуса
      expect(response.status).to.eq(200);

      // Убедимся, что есть поле "data"
      expect(response.body).to.have.property("data");

      // Проверка структуры объекта "data"
      expect(response.body.data).to.be.an("object");
      expect(response.body.data).to.have.property("id", 2); // Убедимся, что id = 2
      expect(response.body.data).to.have.property("email");
      expect(response.body.data).to.have.property("first_name");
      expect(response.body.data).to.have.property("last_name");

      // Убедимся, что есть поле "support"
      expect(response.body).to.have.property("support");
      expect(response.body.support).to.have.property("url");
      expect(response.body.support).to.have.property("text");
    });
  });
  it("Single user not found", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users/23",
      failOnStatusCode: false, // Не бросать ошибку при статусе 404
    }).then((response) => {
      // Проверка статуса ответа
      expect(response.status).to.eq(404);

      // Убедимся, что тело ответа пустое
      expect(response.body).to.be.empty;
    });
  });

  it.only("List <resource>", () => {
    cy.request("GET", "https://reqres.in/api/unknown").then((response) => {
      // Проверка наличия основных свойств объекта
      expect(response.body).to.have.property("page");
      expect(response.body).to.have.property("per_page");
      expect(response.body).to.have.property("total");
      expect(response.body).to.have.property("total_pages");
      expect(response.body).to.have.property("data");
      expect(response.body).to.have.property("support");

      // Проверка типов значений
      expect(response.body.page).to.be.a("number");
      expect(response.body.per_page).to.be.a("number");
      expect(response.body.total).to.be.a("number");
      expect(response.body.total_pages).to.be.a("number");
      expect(response.body.data).to.be.an("array");
      expect(response.body.support).to.be.an("object");

      // Проверка длины массива data
      expect(response.body.data.length).to.equal(6); // В ответе 6 элементов

      // Проверка свойств каждого объекта в массиве data
      response.body.data.forEach((item) => {
        expect(item).to.have.property("id");
        expect(item).to.have.property("name");
        expect(item).to.have.property("year");
        expect(item).to.have.property("color");
        expect(item).to.have.property("pantone_value");

        // Проверка, что year — это число
        expect(item.year).to.be.a("number");

        // Проверка, что color — это строка и соответствует формату HEX
        expect(item.color).to.be.a("string");
        expect(item.color).to.match(/^#[0-9A-F]{6}$/i); // Проверка формата цвета (HEX)

        // Проверка, что name — это строка
        expect(item.name).to.be.a("string");
      });

      // Проверка структуры объекта support
      expect(response.body.support).to.have.property("url");
      expect(response.body.support).to.have.property("text");
      expect(response.body.support.url).to.be.a("string");
      expect(response.body.support.text).to.be.a("string");
    });
  });
  it("List single <resource>", () => {
    cy.request("GET", "https://reqres.in/api/unknown/2").then((response) => {
      // Проверка, что объект data существует
      expect(response.body).to.have.property("data");
      // Проверка значений в data
      const data = response.body.data;
      expect(data).to.have.property("id", 2);
      expect(data).to.have.property("name", "fuchsia rose");
      expect(data).to.have.property("year", 2001);
      expect(data).to.have.property("color", "#C74375");
      expect(data).to.have.property("pantone_value", "17-2031");

      // Проверка типа данных
      expect(data.id).to.be.a("number");
      expect(data.name).to.be.a("string");
      expect(data.year).to.be.a("number");
      expect(data.color).to.be.a("string");
      expect(data.pantone_value).to.be.a("string");

      // Проверка структуры объекта support
      const support = response.body.support;
      //expect(support).to.have.property('url'();
      expect(support).to.have.property(
        "text",
        "Tired of writing endless social media content? Let Content Caddy generate it for you.",
      );

      // Проверка типа данных в support
      expect(support.url).to.be.a("string");
      expect(support.text).to.be.a("string");

      // Проверка успешного статуса
      expect(response.status).to.eq(200);

      // Проверка на отсутствие ошибок
      expect(response.body).to.not.have.property("error");
    });
  });
  it("Single user not found", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/unknown/23",
      failOnStatusCode: false, // Не бросать ошибку при статусе 404
    }).then((response) => {
      // Проверка статуса ответа
      expect(response.status).to.eq(404);

      // Убедимся, что тело ответа пустое
      expect(response.body).to.be.empty;
    });
  });
});
