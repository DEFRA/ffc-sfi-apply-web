Feature: Check and submit land fund eligibility
    Scenario: Successfully check for fund eligibility 
        Given I open the url "/"
        Then I expect that the title contains "Apply for land funding - GOV.UK"
        Then I expect that element "h1" contains the text "Apply for land funding"       
        # Then I wait on element ".govuk-button--start" for 500ms to be displayed
        When I click on the button ".govuk-button--start"                              
        Then I expect that the url contains "/application-task-list"
        When I click on the link "Check eligibility"
        Then I expect that the url contains "/check-eligibility/bps"
        