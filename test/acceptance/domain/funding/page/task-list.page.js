import { mockConfirmDetails, mockWhatFunding, mockWhatPaymentLevel } from '../../../support/mock-utils/mockResponse'

class TaskListPage {
  get #taskListParent () { return $('.app-task-list') }

  #taskListTagSelector = 'li>.app-task-list__tag'
  #taskListLinkSelector = 'li a'

  async completeSection (number) {
    await this.#taskListParent.$$(this.#taskListLinkSelector)[number - 1].click()
    if (process.env.PR_BUILD) {
      switch (number) {
        case     1 :
          await mockConfirmDetails();
          break
        case     2 :
          await mockWhatFunding();
          break
        case    3 :
          await mockWhatPaymentLevel();
          break
        default    :
          console.log("Section not recognised");
      }
    }

    const url = await browser.getUrl()
    if (url.includes('#')) {
    }
  }

  async statuses (sections) {
    const result = []
    for (const obj of sections) {
      const tagText = await this.#taskListParent.$$(this.#taskListTagSelector)[obj.section - 1].getText()
      if (tagText !== obj.status) {
        result.push({ section: obj.section, status: tagText })
      }
    }

    return result.length === 0 ? sections : result
  }
}

export default new TaskListPage()