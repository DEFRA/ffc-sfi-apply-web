async function waitForLoginPageToDisappear () {
  await $('#callerId').waitForDisplayed({reverse: true, timeout: 5000, timeoutMsg: 'Seems we are stuck on the login page'})

}

export { waitForLoginPageToDisappear }