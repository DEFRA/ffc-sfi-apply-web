#Feature: Sign-in for Multiple Organisation details page
#
#  Scenario: User can successfully signin on multiple organisation page
#    When I open the url "/login"
#    And I pause for 500ms
#    When I clear the inputfield "#crn"
#    And I enter crn number 9867012345
#    And I clear the inputfield "#callerId"
#    And I enter callerId number 5316557
#    And I clear the inputfield "#password"
#    And I enter password tyyteryyeru
#    And I add "kdaihsra" to the inputfield "#password"
#    And I click on the continue button
#    Then I mock the response for "eligible-organisations"
#    And I pause for 1000ms
#    And I expect that the url contains "/eligible-organisations"
#    When I click on the application for the "first" organisation
#    And I pause for 1000ms
#    Then I expect that the url contains "/start-application?sbi"
#    And I expect that element "ul.govuk-list" contains the text "07103820"
#    When I click the back button
#    Then I expect that the url contains "/eligible-organisations"
#    When I click on the application for the "second" organisation
#    And I pause for 1000ms
#    Then I expect that the url contains "/start-application?sbi"
#    And I expect that element "ul.govuk-list" contains the text "106982014"
#    When I click the back button
#    Then I expect that the url contains "/eligible-organisations"
#    When I click on the application for the "third" organisation
#    And I pause for 1000ms
#    Then I expect that the url contains "/start-application?sbi"
#    And I expect that element "ul.govuk-list" contains the text "107365827"
#
#
#  Scenario Outline: User can click on all organisations on eligible page
#    When I open the url "/login"
#    When I clear the inputfield "#crn"
#    And I enter crn number 9867012345
#    And I clear the inputfield "#callerId"
#    And I enter callerId number 5316557
#    And I clear the inputfield "#password"
#    And I enter password tyyteryyeru
#    And I add "kdaihsra" to the inputfield "#password"
#    And I click on the continue button
#    Then I mock the response for "eligible-organisations"
#    And I pause for 1000ms
#    And I expect that the url contains "/eligible-organisations"
#    When I click on the application for the "<startApplication>" organisation
#    And I pause for 1000ms
#    Then I expect that the url contains "/start-application?sbi"
#    Then I expect that element "ul.govuk-list" contains the text "<SBI number>"
#    Examples:
#    |startApplication   |SBI number|
#    |fifthOrganisation  |106889602 |
#    |sixthOrganisation  |200656757 |
#    |seventhOrganisation|107008163 |
#    |eighthOrganisation |122200885 |
#    |ninthOrganisation |107082108 |
#    |tenthOrganisation  |106940295 |
#
#    Scenario: User can start new application after signing in
#    When I open the url "/login"
#    Then I expect that element "h1" contains the text "Sign in"
#    When I clear the inputfield "#crn"
#    And I enter crn number 9867012345
#    And I clear the inputfield "#callerId"
#    And I enter callerId number 5316557
#    And I clear the inputfield "#password"
#    And I enter password tyyteryyeru
#    And I add "kdaihsra" to the inputfield "#password"
#    And I click on the continue button
#    Then I mock the response for "eligible-organisations"
#    And I pause for 1200ms
#    Then I expect that the url contains "/eligible-organisations"
#    When I click on the element "tbody>tr:nth-child(1)>td:nth-child(4)>a"
#    And I pause for 1000ms
#    Then I expect that the url contains "/start-application?sbi"
#    When I click on the element "#start-application"
#    Then I expect that the url contains "/task-list"
#
#    Scenario Outline: User can search for sbi number
#    When I open the url "/login"
#    When I clear the inputfield "#crn"
#    And I enter crn number 9867012345
#    And I clear the inputfield "#callerId"
#    And I enter callerId number 5316557
#    And I clear the inputfield "#password"
#    And I enter password tyyteryyeru
#    And I add "kdaihsra" to the inputfield "#password"
#    And I click on the continue button
#    Then I mock the response for "eligible-organisations"
#    And I pause for 1200ms
#    Then I expect that the url contains "/eligible-organisations"
#    When I clear the inputfield "#user-search"
#    And I search sbi number <SBI number>
#    And I click on the element "//main[@id='main-content']/div[2]/form/div/button"
#    And I pause for 1200ms
#    Then I expect that the url contains "/eligible-organisations"
#    Then I expect that element "table>tbody>tr>td:nth-child(2)" contains the text "<SBI number>"
#    Examples:
#    |SBI number|
#    |106889602 |
#
#
#    Scenario Outline: User cannot search for sbi number with invalid sbi
#    When I open the url "/login"
#    When I clear the inputfield "#crn"
#    And I enter crn number 9867012345
#    And I clear the inputfield "#callerId"
#    And I enter callerId number 5316557
#    And I clear the inputfield "#password"
#    And I enter password tyyteryyeru
#    And I add "kdaihsra" to the inputfield "#password"
#    And I click on the continue button
#    Then I mock the response for "eligible-organisations"
#    And I pause for 1200ms
#    Then I expect that the url contains "/eligible-organisations"
#    When I clear the inputfield "#user-search"
#    And I search sbi number <SBI number>
#    And I click on the element "//main[@id='main-content']/div[2]/form/div/button"
#    And I pause for 1000ms
#    Then I expect that the url contains "/eligible-organisations"
#    Then I expect that element "#error-message" contains the text "<errorMessage>"
#    Examples:
#    |SBI number|errorMessage             |
#    |10688dssa |The SBI must be a number.|
#
#    Scenario: User can click on the pagination link and navigate forward and backward pagination pages
#    When I open the url "/login"
#    When I clear the inputfield "#crn"
#    And I enter crn number 9867012345
#    And I clear the inputfield "#callerId"
#    And I enter callerId number 5316557
#    And I clear the inputfield "#password"
#    And I enter password tyyteryyeru
#    And I add "kdaihsra" to the inputfield "#password"
#    And I click on the continue button
#    Then I mock the response for "eligible-organisations"
#    And I pause for 1000ms
#    Then I expect that the url contains "/eligible-organisations"
#    When I click on the link "2"
#    And I pause for 1000ms
#    Then I expect that the url contains "/eligible-organisations?page=2"
#    When I click on the link "1"
#    And I pause for 1000ms
#    Then I expect that the url contains "/eligible-organisations?page=1"
#    When I click on the link "Next ??"
#    And I pause for 1000ms
#    Then I expect that the url contains "/eligible-organisations?page=2"
#    When I click on the link "?? Previous"
#    And I pause for 1000ms
#    Then I expect that the url contains "/eligible-organisations?page=1"
#
#    Scenario: Verify count of eligible organisation in pagination
#    When I open the url "/login"
#    When I clear the inputfield "#crn"
#    And I enter crn number 9867012345
#    And I clear the inputfield "#callerId"
#    And I enter callerId number 5316557
#    And I clear the inputfield "#password"
#    And I enter password tyyteryyeru
#    And I add "kdaihsra" to the inputfield "#password"
#    And I click on the continue button
#    Then I mock the response for "eligible-organisations"
#    And I pause for 1000ms
#    Then I expect that the url contains "/eligible-organisations"
#
