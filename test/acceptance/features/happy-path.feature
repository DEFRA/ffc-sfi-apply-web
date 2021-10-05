Feature: Apply for land funding
    Scenario: User can successfully opes signing page
        Given I open the url "/"
        Then I expect that the title contains "Apply for land funding - GOV.UK"
        Then I expect that element "h1" contains the text "Apply for land funding"       
        When I click on the button ".govuk-button--start"  
        And I pause for 500ms
        Then I expect that the url contains "/sign-in"
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
        When I click on the element "#sbi"
        And I click on the element "#submit"
        And I pause for 500ms
        Then I expect that the url contains "/application-task-list"
        When I click on the link "Confirm your land and business details"
        Then I expect that the url contains "/confirm-details"
        And I click on the element "#landControlCheck"
        And I click on the element "#submit"
        Then I expect that the url contains "/relationship"
        When I click on the element "#relationship"
        And I click on the element "#submit"
        Then I expect that the url contains "/application-task-list"
        And I pause for 500ms
        When I click on the link "Choose funding option"
        Then I expect that the url contains "/what-funding"
        When I click on the element "#standard"
        And I click on the element "#submit"
        Then I expect that the url contains "/arable-overview"
        And I click on the element "#submit"
        Then I expect that the url contains "/how-much"  
        When I click on the element "#SJ64706324"
        And I click on the element "#submit"
        Then I expect that the url contains "/what-payment-level" 
        When I click on the element "#level"
        And I click on the element "#submit"
        Then I expect that the url contains "/application-task-list"

        
        
        
        
        

       
        