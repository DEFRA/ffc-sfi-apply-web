Feature: Sign-in for Single Organisation details page
  Scenario: User can successfully signin on single organisation page
    When I open the url "/login"
    Then I expect that element "h1" contains the text "Sign in"
    When I clear the inputfield "#crn"
    And I enter crn number 9867012345
    And I clear the inputfield "#callerId"
    And I enter callerId number 5100150
    And I clear the inputfield "#password"
    And I enter password tyyteryyeru
    And I add "kdaihsra" to the inputfield "#password"
    And I click on the continue button
    Then I mock the response for "sign-in" 
    When I pause for 1000ms
    Then I expect that the url contains "/start-application?sbi=107700399"
    Then I expect that element "h1" contains the text "Sustainable farming funding applications for this organisation"
    
  Scenario: User cannot successfully signin with invalid crn
    When I open the url "/login"
    Then I expect that element "h1" contains the text "Sign in"
    When I clear the inputfield "#crn"
    And I enter crn number 986701234599
    And I clear the inputfield "#callerId"
    And I enter callerId number 5100150
    And I clear the inputfield "#password"
    And I enter password tyyteryyeru
    And I add "kdaihsra" to the inputfield "#password"
    And I click on the continue button
    And I pause for 1000ms
    Then I expect that the url contains "/login"
    Then I expect that element "div.govuk-error-summary__body" contains the text "length must be 10 characters long"
  
Scenario: User cannot successfully signin with invalid callerID
    When I open the url "/login"
    Then I expect that element "h1" contains the text "Sign in"
    When I clear the inputfield "#crn"
    And I enter crn number 6701234599
    And I clear the inputfield "#callerId"
    And I enter callerId number 51001500
    And I clear the inputfield "#password"
    And I enter password tyyteryyeru
    And I add "kdaihsra" to the inputfield "#password"
    And I click on the continue button
    And I pause for 1000ms
    Then I expect that the url contains "/login"
    Then I expect that element "div.govuk-error-summary__body" contains the text "length must be 7 characters long"
