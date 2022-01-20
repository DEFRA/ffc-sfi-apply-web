Feature: Search for SBI Number

  Scenario: Multiple organisation user can search by SBI Number
    Given Bob has management control of more than one eligible organisation
    When Bob searches for an organisation by SBI Number "106889602"
    Then SBI number "106889602" is found and returned to Bob