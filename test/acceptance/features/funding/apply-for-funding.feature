Feature: Apply for sustainable farming funding

  Scenario: Eligible Farmer can successfully apply for sustainable farming funding
    Given Bob has management control of only one eligible organisation
    When Bob applies for farming fund
    Then the following sections should show as status
      | section | status    |
      | 1       | COMPLETED |
      | 2       | COMPLETED |
      | 3       | COMPLETED |

  Scenario: Eligible Farmer with multiple org can successfully apply for sustainable farming funding
    Given Bob has management control of more than one eligible organisation
    When Bob applies for farming fund for any of his organisation
    Then the following sections should show as status
      | section | status    |
      | 1       | COMPLETED |
      | 2       | COMPLETED |
