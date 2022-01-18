Feature: Authentication

  Scenario Outline: Farmer can only access service with correct authentication
    Given a farmer signs in with org details "<crn>" "<callerId>" "<password>"
    Then a session cookie present should be <isCookiePresent>

    Examples:
      | crn        | callerId   | password | isCookiePresent |
      | 9867012345 | 5100150    | kdaihsra | true            |
      |            | 5100150    | kdaihsra | false           |
      | 9867012345 | 5100150333 | kdaihsra | false           |