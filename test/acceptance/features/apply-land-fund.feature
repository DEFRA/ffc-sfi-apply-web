Feature: Apply for sustainable farming funding
  Scenario: User can successfully opens signing page
    Given I open the url "/"
    Then I expect that the title contains "Apply for sustainable farming funding - GOV.UK"                                      
    And I expect that element "h1" contains the text "Apply for sustainable farming funding"
    When I click on the button ".govuk-button--start"
    Then I expect that the url contains "/sign-in"
