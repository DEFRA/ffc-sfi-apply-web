Feature: Search for SBI Number

  Scenario: Multiple organisation user can search by SBI Number
    Given Bob has management control of more than one eligible organisation
    When Bob searches for an organisation by SBI Number "120950220"
    Then SBI number "12095020" is found and returned to Bob