Feature: Apply for sustainable farming funding
  Scenario: Eligible Farmer can successfully apply for sustainable farming funding
    Given Bob is an eligible farmer
    When Bob applies for farming fund
    Then Bob is able save the application
