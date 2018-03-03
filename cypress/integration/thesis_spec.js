/**
 * Created by Seppo on 03/03/2018.
 */
/**
 * Created by Seppo on 13/10/2017.
 */

describe('React project test', function () {

    var addProject = function (title, description) {
        // Add project
        cy.contains("Add project")
            .click();

        cy.get('input[name="title"]')
            .type(title);

        cy.get('textarea[name="description"]')
            .type(description);

        cy.contains("Submit")
            .click();

    };

    var cancelNewProject = function (title, description) {
        cy.contains("Add project")
            .click();

        cy.get('input[name="title"]')
            .type(title);

        cy.get('textarea[name="description"')
            .type(description);

        cy.contains("Cancel")
            .click();
    };

    var deleteProject = function (title) {
        cy.get('.col-sm-3').contains(title)
            .click();

        cy.contains("Delete project")
            .click();
    };

    var testProjectCount = function (count) {
        cy.get('.col-sm-3>div button.list-group-item').should('have.length', count);
    };

    before(function () {
        cy.visit('/');
    });


    afterEach(function () {
        cy.visit('/');
        cy.get('.col-sm-3>div button.list-group-item').each(function (el, ind, list) {
            cy.get('.col-sm-3>div button.list-group-item').first().click();

            cy.contains("Delete project")
                .click();
        })
    });

    it('Test version 1.0: create, select, delete, take time', function () {

        cy.contains('No selected project');
        addProject('My project title', 'This is something absolutely great');
        addProject('Another project', 'This is something else');
        addProject('Third project', 'This is the last one');
        cancelNewProject('No project', 'Don\'t submit this');
        testProjectCount(3);

        deleteProject('Another project');
        testProjectCount(2);
        cy.contains('No selected project');

        // selects project
        cy.contains('My project title')
            .click();

        cy.get('h1').contains('My project title');

        // take time
        cy.get('button.btn-lg.btn-info').click()
            .wait(1001)
            .click();

        // check that time was registered
        cy.contains('0h 0min 1s');

        cy.visit('/');

        cy.contains('My project title')
            .click();
        cy.contains('0h 0min 1s');
    });

});
