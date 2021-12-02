 Feature: Singin for Multiple Organisation details page
  Scenario Outline: User can successfully signin on multiple organisation page
    Given I open the url "/sign-in"
    When I clear the inputfield "#crn"
    And I enter crn number 9867012345
    And I clear the inputfield "#callerId"
    And I enter callerId number 5316557
    And I clear the inputfield "#password"
    And I enter password tyyteryyeru
    And I add "kdaihsra" to the inputfield "#password"
    And I click on the continue button
    #Then I mock the response for "which-business"
    And I pause for 700ms
    Then I expect that the url contains "/eligible-organisations" 
    When I click on organisation "<startApplication>"
    And I pause for 600ms
    Then I expect that the url contains "/start-application?sbi"
    Then I expect that element "ul.govuk-list" contains the text "<SBI number>" 
    Examples:
    |startApplication        |SBI number |
    |A G COLLIS              |107103820 |  
    |AISLA JONES             |106982014	|
    |Browsholme Hall         |107365827 |
    |Chris Hall              |106899089 |
    |Christine Gillott       |106889602 |
    |Donald Crofts           |200656757 |
    |E THOMPSON & SON        |107008163 |
    |Edgar Zoo               |122200885 |
    |Mr J G Romeril          |107082108 |    
    |FALLON, S               |106940295 |
    |FJ & LA Poole and Son   |200156320 |
    |Farm & Woodland Services|113377765 |
    |Fraser Sheader          |120950220 |
    |FRIEND FARMS LTD        |106505265 |
    |Friend Farm Produce     |106980125 |
    |G M PRICHARD & SON      |106929871 |
    |Glynis Nicholls         |111766409 |
    |Graham Dare             |107114300 |

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


    # Scenario: User can move back from SFI funding screen to eligible organistion screen
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
    # And I pause for 500ms
    # Then I expect that the url contains "/eligible-organisations" 
    # When I click on the element "//tr[1]/td[4]/a"
    # And I pause for 500ms
    # Then I expect that the url contains "/start-application?sbi"
    # And I pause for 500ms
    # When I click on the link "Back"
    # Then I expect that the url contains "/eligible-organisations"
                              

    

    