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
        When I click on the link "Tell us how you will carry out the actions"
        And I pause for 500ms
        Then I expect that the url contains "/arable-soils"
        And I click on the element "#submit"
        Then I expect that the url contains "/soil-assessment"
        When I click on the element "#soil-assessment"
        And I click on the element "#submit"
        Then I expect that the url contains "/soil-compaction"
        When I click on the element "#soil-compaction"
        And I click on the element "#submit"
        Then I expect that the url contains "/green-cover"
        When I click on the element "#green-cover"
        And I click on the element "#submit"
        Then I expect that the url contains "/organic-matter"
        When I click on the element "#organic-matter"
        And I click on the element "#submit"
        Then I expect that the url contains "/basic/basic-end"
        When I click on the element "#basic-end"
        And I click on the element "#submit"
        Then I expect that the url contains "/payment-schedule"
        When I click on the element "#payment-schedule"
        And I click on the element "#submit"
        Then I expect that the url contains "/check-your-answers"
        When I click on the element "#submit"
        Then I expect that the url contains "/review-your-agreement"
        When I click on the element "#submit"
        Then I expect that the url contains "/application-task-list"
        When I click on the link "Submit your application"
        Then I expect that the url contains "/declaration"
        When I click on the element "#submit"
        Then I expect that the url contains "/confirmation"
        

       
        
        


        # Then I expect that the url contains "/tillage"
        # When I click on the element "#tillage"
        # And I click on the element "#submit"
        # Then I expect that the url contains "/medium-end"
        # When I click on the element "#medium-end"
        # And I click on the element "#submit"

        # check-your-answers

       
        
        

        
        
        
        
        

       
        