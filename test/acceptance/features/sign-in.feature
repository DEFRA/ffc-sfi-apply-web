Feature: Apply for land funding
    Scenario: User can successfully opes signing page
        Given I open the url "/sign-in" 
        Then I expect that element "h1" contains the text "Sign in"
        When I clear the inputfield "#crn"
        And I add "9867012345" to the inputfield "#crn"
        And I clear the inputfield "#callerId"
        And I add "5100150" to the inputfield "#callerId"
        And I clear the inputfield "#password"
        And I add "kdaihsra" to the inputfield "#password"
        And I click on the element "#submit"
        And I pause for 500ms
        Then I expect that the url contains "/which-business"
