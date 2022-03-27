/// <reference types="cypress" />

describe("signing up a user", () => {
    beforeEach(() => {
        cy.visit("/signup");
    });

    /*

    it("sign up button should be disabled on initial render", () => {
        cy.get("[type=submit]").should("be.disabled");
    });

    it("all inputs field should be empty", () => {
        cy.getInputByPlaceholder("First name").should("be.empty");
        cy.getInputByPlaceholder("Last name").should("be.empty");
        cy.getInputByPlaceholder("Email").should("be.empty");
        cy.getInputByPlaceholder("User name").should("be.empty");
        cy.getInputByPlaceholder("Password").should("be.empty");
    });

    it("show an error message when an input is focused and then blurred without having any value", () => {
        cy.getInputByPlaceholder("First name").focus().blur();
        cy.get(".form__control").first().contains("Name is required");
    });

    it("password shouldn't be less than 8 charcters", () => {
        cy.getInputByPlaceholder("Password").type("1234567");
        cy.get("[type=submit]").should("be.disabled");
        cy.get(".form__control")
            .last()
            .contains("Password must be miminum of 8 characters");
    });

    it("submit button should be disabled if email or username exists", () => {
        cy.intercept(
            "POST",
            "https://story-learn.herokuapp.com/v1/auth/checkifexists/email/",
            {
                fixture: "auth/checkEmailExists/failure.json",
            }
        ).as("checkEmailExists");

        cy.intercept(
            "POST",
            "https://story-learn.herokuapp.com/v1/auth/checkifexists/user/",
            { fixture: "auth/checkUsernameExists/success.json" }
        ).as("checkUsernameExists");

        cy.getInputByPlaceholder("First name").type("John");
        cy.getInputByPlaceholder("Last name").type("Doe");
        cy.getInputByPlaceholder("Email").type("Bibibi@gmail.com");
        cy.getInputByPlaceholder("User name").type("Bibibi");
        cy.getInputByPlaceholder("Password").type("12345678");
        cy.get("[type=submit]").should("be.disabled");
    });

    */

    it("redirect user to verify page upon sign up", () => {
        cy.intercept(
            "POST",
            "https://story-learn.herokuapp.com/v1/auth/checkifexists/email/",
            { fixture: "auth/checkEmailExists/success.json" }
        ).as("checkEmailExists");

        cy.intercept(
            "POST",
            "https://story-learn.herokuapp.com/v1/auth/checkifexists/user/",
            { fixture: "auth/checkUsernameExists/success.json" }
        ).as("checkUsernameExists");

        cy.intercept(
            "POST",
            "https://story-learn.herokuapp.com/v1/auth/users/",
            { fixture: "auth/signup/success.json" }
        ).as("signup");

        cy.getInputByPlaceholder("First name").type("John");
        cy.getInputByPlaceholder("Last name").type("Doe");
        cy.getInputByPlaceholder("Email").type("Bibibi@gmail.com");
        cy.getInputByPlaceholder("User name").type("Bibibi");
        cy.getInputByPlaceholder("Password").type("12345678");
        cy.get("[type=submit]").click();

        cy.url().should("match", /\/verify/);
    });
});
