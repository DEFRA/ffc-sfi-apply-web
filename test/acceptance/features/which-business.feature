Feature: Which Business
        Scenario: Validate the 
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
        And I click on the element "#submit"
        And I pause for 500ms
        Then I expect that element "#sbi-error" contains the text "Please choose a business you would like to apply for"
           
        Scenario: User can successfully opens which business
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
        And I click on the element "#sbi"
        And I click on the element "#submit"
        And I pause for 500ms
        Then I expect that the url contains "/application-task-list"


        