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

    var editProject = function (oldProjectTitle, newTitle, newDescription) {
        cy.contains(oldProjectTitle)
            .click();
        cy.contains('Edit project')
            .click();
        cy.get('input[name="title"]')
            .clear()
            .type(newTitle);

        cy.get('textarea[name="description"]')
            .clear()
            .type(newDescription);

        cy.contains("Submit")
            .click();
    };


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

    it('Test version 1.1: mark as done', function () {
        addProject('My project title', 'This is something absolutely great');
        addProject('Another project', 'This is something else');

        cy.get('#markDone')
            .click();

        cy.get('h1>span');
        cy.get('.col-sm-3>div button.list-group-item>span').should('have.length', 1);
    });

    it('Test version 1.2: edit project', function () {
        addProject('My project title', 'This is something absolutely great');
        addProject('Another project', 'This is something else');

        editProject('My project title', 'Totally new project title', 'New description');
        testProjectCount(2);

        cy.contains('Edit project').click();

        cy.get('input[name="title"]')
            .clear()
            .type("This is not going to be here");
        cy.get('h1').contains('This is not going to be here');
        cy.contains('Cancel').click();

        cy.contains('Totally new project title'); // select latest project
        cy.get('h1').contains('Totally new project title');
    });

    it('Test version 1.3: timer lock', function () {
        addProject('My project title', 'This is something absolutely great');
        addProject('Another project', 'This is something else');

        // start timer
        cy.get('button.btn-lg.btn-info').click();

        // check that everything is disabled
        cy.get('.col-sm-3>div button.list-group-item[disabled]').should('have.length', 2);

        cy.contains('Add project').should('be.disabled');
        cy.contains('Delete project').should('be.disabled');
        cy.contains('Edit project').should('be.disabled');
        // stop timer
        cy.get('button.btn-lg').click();
    });

});
