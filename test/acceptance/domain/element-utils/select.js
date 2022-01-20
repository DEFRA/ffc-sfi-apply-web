async function selectRadioButton (option, elementIfTrue, elementIfFalse) {
  const submit = await $('#submit')

  try {
    true === option ? await elementIfTrue.click() : await elementIfFalse.click()
    await submit.click()
  } catch (error) {
    console.log(`Element not found`)
  }
}

async function checkBoxByValue (optionName, optionValue) {
  if (!optionValue) {
    return
  }

  try {
    await $(`[value="${optionName}"]`).click()
  } catch (error) {
    console.log(`No element found for ${optionName} on this page`)
    console.log(`The next checkbox will now be selected`)
  }
}

export { selectRadioButton, checkBoxByValue }
