class TaskListPage {
  get #taskListParent () { return $('.app-task-list') }

  #taskListTagSelector = 'li>.app-task-list__tag'
  #taskListLinkSelector = 'li a'

  async completeSection (number) {
    await this.#taskListParent.$$(this.#taskListLinkSelector)[number - 1].click()
    const url = await browser.getUrl()
    if(url.includes('#')){
      return
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