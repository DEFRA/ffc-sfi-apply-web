  Feature: Apply for sustainable farming funding
        Scenario: User successfully start new application
        Given I open the url "/sign-in"
        Then I expect that element "h1" contains the text "Sign in"
        When I clear the inputfield "#crn"
        And I add "9867012345" to the inputfield "#crn"
        And I clear the inputfield "#callerId"
        And I add "5100150" to the inputfield "#callerId"
        And I clear the inputfield "#password"
        And I add "kdaihsra" to the inputfield "#password"
        And I click on the element "#submit"
        Then I mock the response for "which-business"
        