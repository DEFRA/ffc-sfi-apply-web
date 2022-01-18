const selectRadioButton = async (option, element1, element2) => {
  true === option ? await element1.click() : await element2.click()
}

export { selectRadioButton }
