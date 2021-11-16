Feature: Apply for land funding
    Scenario: User can successfully opes signing page
        Given I open the url "/"
        Then I expect that the title contains "Apply for land funding - GOV.UK"
        And I expect that element "h1" contains the text "Apply for land funding"
        When I click on the button ".govuk-button--start"
        Then I expect that the url contains "/sign-in"
