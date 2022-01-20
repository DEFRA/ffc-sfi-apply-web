async function selectRadioButton (option, elementIfTrue, elementIfFalse) {
  const submit = await $('#submit')

  try {
    true === option ? await elementIfTrue.click() : await elementIfFalse.click()
    await submit.click()
  } catch (error) {
    console.log(`Element ${await elementIfTrue.selector} or ${ await elementIfFalse.selector} not found`)
  }
}

async function checkBoxByValue (optionName, optionValue) {
  if (!optionValue) {
    return
  }

  try {
    await $(`[value="${optionName}"]`).click()
  } catch (error) {
    console.log(`No element found for [value=${optionName}]} on this page`)
    console.log(`The next checkbox will now be selected`)
  }
}

export { selectRadioButton, checkBoxByValue }
