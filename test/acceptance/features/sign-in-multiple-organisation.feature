Feature: Sign-in for Multiple Organisation details page
  Scenario: User can successfully signin on multiple organisation page
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
    And I expect that the url contains "/eligible-organisations"
    When I click on the application for the "first" organisation
    And I pause for 600ms
    Then I expect that the url contains "/start-application?sbi"
    And I expect that element "ul.govuk-list" contains the text "07103820"
    When I click the back button
    Then I expect that the url contains "/eligible-organisations"
    When I click on the application for the "second" organisation
    And I pause for 600ms
    Then I expect that the url contains "/start-application?sbi"
    And I expect that element "ul.govuk-list" contains the text "106982014"

  Scenario: User can start new application after signing in
    Given I open the url "/sign-in"
    Then I expect that element "h1" contains the text "Sign in"
    When I clear the inputfield "#crn"
    And I enter crn number 9867012345
    And I clear the inputfield "#callerId"
    And I enter callerId number 5316557
    And I clear the inputfield "#password"
    And I enter password tyyteryyeru
    And I add "kdaihsra" to the inputfield "#password"
    And I click on the continue button
    Then I mock the response for "which-business"
    And I pause for 500ms
    Then I expect that the url contains "/eligible-organisations"
    When I click on the element "//tr[1]/td[4]/a"
    And I pause for 600ms
    Then I expect that the url contains "/start-application?sbi"
    When I click on the element "#start-application"
    Then I expect that the url contains "/application-task-list"

    
    ## Scenario: User can move back from SFI funding screen to eligible organistion screen
    # Given I open the url "/sign-in"
    # Then I expect that element "h1" contains the text "Sign in"
    # When I clear the inputfield "#crn"
    # And I enter crn number 9867012345
    # And I clear the inputfield "#callerId"
    # And I enter callerId number 5316557
    # And I clear the inputfield "#password"
    # And I enter password tyyteryyeru
    # And I add "kdaihsra" to the inputfield "#password"
    # And I click on the continue button
    # Then I mock the response for "which-business"
    # And I pause for 600ms
    # Then I expect that the url contains "/eligible-organisations"
    # When I click on the element "//tr[1]/td[4]/a"
    # And I pause for 500ms
    # Then I expect that the url contains "/start-application?sbi"
    # And I pause for 500ms
    # When I click on the link "Back"
    # Then I expect that the url contains "/eligible-organisations"
