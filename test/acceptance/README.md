# FFC SFI Apply Web Acceptance Tests

> Future Farming and Countryside Programme - SFI Apply Web Acceptance Tests.

This folder contains the acceptance tests for the FFC SFI Apply Web 'customer
facing' `ffc-sfi-apply-web` front end microservice.

The tests use [Cucumber](https://cucumber.io/) and
[webdriver.io](https://webdriver.io/). It is based on the
[webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)
project.
The repo has been containerised so it is easier to run in development and
CI environments.

BrowserStack is used to run the tests to reduce complexity and provide an
improved experience that would otherwise be possible running tests locally.

## Requirements

- Docker Desktop 2.2.0.3 (42716) or higher
- Node version 12 (not compatible with v13)
  - if you have multiple versions of node, run `nvm use 12` to use version 12
    for this alone
- BrowserStack account
- Have all environment variables specified in a `.env` file

## Quick start

### Running locally

From the project's root dir run `./scripts/acceptance`. This will start the web
app and then run the acceptance tests (after building the image).

### Running against test environment

If the tests are to be run against a test environment there is no need to have
the web app running locally. In this case simply run
`docker-compose up --build` in this directory (i.e. ./test/acceptance).

Running the tests like this will require the env var
`TEST_ENVIRONMENT_ROOT_URL` to be set (see below for more details).

## Environment variables

There are a number of environment variables required to run the tests, in
addition to those required to run the web app. Env vars for the web app are
detailed in the main [README](../../README.md). Test specific env vars are:

The env vars are broken down into two sections, the first are env vars required
for running the acceptance tests without any mocking. The second set are
specific to the mocking and will need to be change over time, as the web app
changes the topics it uses.

| Name                      | Description                                                                                                 | Default                            |
| ----                      | -----------                                                                                                 | -------                            |
| BROWSERSTACK_ACCESS_KEY   | [BrowserStack access key](https://www.browserstack.com/docs/automate/api-reference/selenium/authentication) | N/A                                |
| BROWSERSTACK_USERNAME     | [BrowserStack user name](https://www.browserstack.com/docs/automate/api-reference/selenium/authentication)  | N/A                                |
| PR_BUILD                  | Determines if the mocks will be active when the tests run. By default mocks will not be active.             | N/A                                |
| TEST_ENVIRONMENT_ROOT_URL | URL of test environment. Set to an actual test environment if application isn't running locally.            | `http://host.docker.internal:3000` |

| Name                                          | Description                           | Default |
| ----                                          | -----------                           | ------- |
| CALCULATE_SUBSCRIPTION_ADDRESS                | Name of calculate subscription        | N/A     |
| ELIGIBILITY_SUBSCRIPTION_ADDRESS              | Name of eligibility subscription      | N/A     |
| PARCELSPATIAL_TOPIC_NAME_SUBSCRIPTION_ADDRESS | Name of parcel spatial subscription   | N/A     |
| PARCELSTANDARD_SUBSCRIPTION_ADDRESS           | Name of parcel standards subscription | N/A     |
| STANDARDS_SUBSCRIPTION_ADDRESS                | Name of standards subscription        | N/A     |


## Mocking dependent services

The web application makes use of several asynchronous APIs (other
microservices). The requests to these microservices tend to be a message sent
to a topic. The topic is subscribed to by another microservice that processes
the message and responds with another message sent to a queue.

When the tests are running in an environment where the full stack of
microservices is available the messages will be sent and processed. However, if
any microservice is not available (such as in the PR environment) the web
application will not work and the tests will fail.

In order to prevent the tests from failing the responses to the messages the
web app sends are mocked. This is done by subscribing to the topic where the
message is sent, processing it (using as little logic as possible) and
responding with an appropriate message to the response queue. The code for this
resides within the acceptance test code, this enables the bespoke mocking to
easily be added and amended.

A number of elements are required for this to work:

- [pageLoadStrategy](https://www.selenium.dev/documentation/webdriver/page_loading_strategy/)
  needs to be set to `none` - this prevents the browser from
  waiting for the page to load before returning control back to the tests. The
  impact of this is that the tests might try to continue executing actions
  before the page has loaded. To mitigate this, additional pauses are likely
  required within the test steps.
- The env var `PR_BUILD` needs to be set to `true` - this is done automatically
  within the
  [build pipeline](https://github.com/DEFRA/ffc-jenkins-pipeline-library/blob/496dd5075feea920e4de2596a04a2893affce751/src/uk/gov/defra/ffc/Build.groovy#L16)
  and can be done locally for testing.
- Additional env vars used by the mocking code need to be set and mapped into
  the container.

## Test reports

Test reports will be output to `./html-reports`. Note that WSL users need to
run `mkdir -m 777 html-reports`. Read more about report configuration in the
[rpii/wdio-hmtl-reporter docs](https://github.com/rpii/wdio-html-reporter).
