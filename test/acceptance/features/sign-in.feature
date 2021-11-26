Feature: Apply for land funding
  Scenario: User can successfully opes signing page
    Given I open the url "/sign-in"
    Then I expect that element "h1" contains the text "Sign in"
    When I clear the inputfield "#crn"
    And I enter crn number 9867012345
    And I clear the inputfield "#callerId"
    And I enter callerId number 5100150
    And I clear the inputfield "#password"
    And I enter password tyyteryyeru
    And I add "kdaihsra" to the inputfield "#password"
    And I click on the continue button
    Then I mock the response for "which-business"
    When I pause for 500ms
    Then I expect that the url contains "/start-application"
