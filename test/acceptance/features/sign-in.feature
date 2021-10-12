Feature: Apply for land funding
    Scenario: User can successfully opes signing page
        Given I open the url "/sign-in" 
        Then I expect that element "h1" contains the text "Sign in"
        When I clear the inputfield "#crn"
        #When I clear crn number
        When I enter crn number 9867012345
        And I clear the inputfield "#callerId"
        And I enter callerId number 5100150
        And I clear the inputfield "#password"
        And I enter password tyyteryyeru
        And I add "kdaihsra" to the inputfield "#password"  
        And I click on the continue button
        And I pause for 500ms
        Then I expect that the url contains "/which-business"



        
