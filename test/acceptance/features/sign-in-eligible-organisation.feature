  Feature: Sign-in for Multiple Organisation details page
  Scenario: User can successfully signin on multiple organisation page
    Given I open the url "/sign-in"
    And I pause for 500ms
    When I clear the inputfield "#crn"
    And I enter crn number 9867012345
    And I clear the inputfield "#callerId"
    And I enter callerId number 5316557
    And I clear the inputfield "#password"
    And I enter password tyyteryyeru
    And I add "kdaihsra" to the inputfield "#password"
    And I click on the continue button
    Then I mock the response for "eligible-organisations"
    And I pause for 700ms
    And I expect that the url contains "/eligible-organisations"
    When I click on the application for the "first" organisation
    And I pause for 700ms
    Then I expect that the url contains "/start-application?sbi"
    And I expect that element "ul.govuk-list" contains the text "07103820"
    When I click the back button
    Then I expect that the url contains "/eligible-organisations"
    When I click on the application for the "second" organisation
    And I pause for 700ms
    Then I expect that the url contains "/start-application?sbi"
    And I expect that element "ul.govuk-list" contains the text "106982014"
    When I click the back button
    Then I expect that the url contains "/eligible-organisations"
    When I click on the application for the "third" organisation
    And I pause for 700ms
    Then I expect that the url contains "/start-application?sbi"
    And I expect that element "ul.govuk-list" contains the text "107365827"
 
  Scenario Outline: User can clicks on all organisations on eligible page
    Given I open the url "/sign-in"
    And I pause for 500ms
    When I clear the inputfield "#crn"
    And I enter crn number 9867012345
    And I clear the inputfield "#callerId"
    And I enter callerId number 5316557
    And I clear the inputfield "#password"
    And I enter password tyyteryyeru
    And I add "kdaihsra" to the inputfield "#password"
    And I click on the continue button
    Then I mock the response for "eligible-organisations"
    And I pause for 700ms
    And I expect that the url contains "/eligible-organisations"
    When I click on the application for the "<startApplication>" organisation
    And I pause for 700ms
    Then I expect that the url contains "/start-application?sbi"
    Then I expect that element "ul.govuk-list" contains the text "<SBI number>" 
    Examples:
    |startApplication   |SBI number|
    |forthOrganisation  |106899089 |
    |fifthOrganisation  |106889602 |
    |sixthOrganisation  |200656757 |
    |seventhOrganisation|107008163 |   
    |eighthOrganisation |122200885 |
    |ninethOrganisation |107082108 |
    |tenthOrganisation  |106940295 |
    
    Scenario: User can start new application after signing in
    Given I open the url "/sign-in"
    And I pause for 500ms
    Then I expect that element "h1" contains the text "Sign in"
    When I clear the inputfield "#crn"
    And I enter crn number 9867012345
    And I clear the inputfield "#callerId"
    And I enter callerId number 5316557
    And I clear the inputfield "#password"
    And I enter password tyyteryyeru
    And I add "kdaihsra" to the inputfield "#password"
    And I click on the continue button
    Then I mock the response for "eligible-organisations"
    And I pause for 700ms
    Then I expect that the url contains "/eligible-organisations"
    When I click on the element "//tr[1]/td[4]/a"
    And I pause for 700ms
    Then I expect that the url contains "/start-application?sbi"
    When I click on the element "#start-application"
    Then I expect that the url contains "/application-task-list"

    Scenario Outline: User can search for sbi number 
    Given I open the url "/sign-in"
    And I pause for 500ms
    When I clear the inputfield "#crn"
    And I enter crn number 9867012345
    And I clear the inputfield "#callerId"
    And I enter callerId number 5316557
    And I clear the inputfield "#password"
    And I enter password tyyteryyeru
    And I add "kdaihsra" to the inputfield "#password"
    And I click on the continue button
    Then I mock the response for "eligible-organisations"
    And I pause for 700ms
    Then I expect that the url contains "/eligible-organisations"
    When I clear the inputfield "#user-search"
    And I search sbi number <SBI number>
    And I click on the element "//main[@id='main-content']/div[2]/form/div/button"
    And I pause for 800ms
    Then I expect that the url contains "/eligible-organisations"
    Then I expect that element "//td[2]" contains the text "<SBI number>" 
    Examples:
    |SBI number|
    |106889602 |
    |106940295 |

    Scenario Outline: User cannot search for sbi number with invalid sbi
    Given I open the url "/sign-in"
    When I clear the inputfield "#crn"
    And I enter crn number 9867012345
    And I clear the inputfield "#callerId"
    And I enter callerId number 5316557
    And I clear the inputfield "#password"
    And I enter password tyyteryyeru
    And I add "kdaihsra" to the inputfield "#password"
    And I click on the continue button
    Then I mock the response for "eligible-organisations"
    And I pause for 700ms
    Then I expect that the url contains "/eligible-organisations"
    When I clear the inputfield "#user-search"
    And I search sbi number <SBI number>
    And I click on the element "//main[@id='main-content']/div[2]/form/div/button"
    And I pause for 700ms
    Then I expect that the url contains "/eligible-organisations"
    Then I expect that element "div.govuk-form-group.govuk-form-group--error" contains the text "<errorMessage>"                        
    Examples:
    |SBI number|errorMessage             |
    |1068990544|The SBI is too long.     |
    |10688960  |The SBI is too short.    |
    |10688dssa |The SBI must be a number.|

    Scenario: User can click on the pagination link and navigate forward and backward pagination pages
    Given I open the url "/sign-in"
    And I pause for 500ms
    When I clear the inputfield "#crn"
    And I enter crn number 9867012345
    And I clear the inputfield "#callerId"
    And I enter callerId number 5316557
    And I clear the inputfield "#password"
    And I enter password tyyteryyeru
    And I add "kdaihsra" to the inputfield "#password"
    And I click on the continue button
    Then I mock the response for "eligible-organisations"
    And I pause for 700ms
    Then I expect that the url contains "/eligible-organisations" 
    When I click on the link "2"
    And I pause for 700ms
    Then I expect that element "div.govuk-grid-column-one-third.text-align-right" contains the text "Showing 11 - 19 of 19 organisations"
    And I expect that the url contains "/eligible-organisations?page=2"
    When I click on the link "1"
    And I pause for 600ms
    Then I expect that element "div.govuk-grid-column-one-third.text-align-right" contains the text "Showing 1 - 10 of 19 organisations"
     Then I expect that the url contains "/eligible-organisations?page=1"
    When I click on the link "Next »"
    And I pause for 500ms
    Then I expect that element "div.govuk-grid-column-one-third.text-align-right" contains the text "Showing 11 - 19 of 19 organisations"
    When I click on the link "« Previous"
    And I pause for 400ms
    Then I expect that element "div.govuk-grid-column-one-third.text-align-right" contains the text "Showing 1 - 10 of 19 organisations"

    Scenario: Verify count of eligible organisation in pagination
    Given I open the url "/sign-in"
    And I pause for 500ms
    When I clear the inputfield "#crn"
    And I enter crn number 9867012345
    And I clear the inputfield "#callerId"
    And I enter callerId number 5316557
    And I clear the inputfield "#password"
    And I enter password tyyteryyeru
    And I add "kdaihsra" to the inputfield "#password"
    And I click on the continue button
    Then I mock the response for "eligible-organisations"
    And I pause for 400ms
    Then I expect that the url contains "/eligible-organisations"
    Then eligible organsations and sbi should present in the pagination
    
  
