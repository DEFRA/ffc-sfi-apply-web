
class SoilActionsFlow{
  get canTestOrganicMatter() { return $('#organic-matter') }
  get cannotTestOrganicMatter() { return $('#organic-matter-2') }
  get canProducePlan() { return $('#produce-plan') }
  get cannotProducePlan() { return $('#produce-plan-2') }
  get canHaveGreenCover() { return $('#greenCover') }
  get cannotHaveGreenCover() { return $('#greenCover-2') }

  get submit() { return $('#submit') }

  async complete (soilActions) {
    await browser.$('.app-task-list .app-task-list__task-name a[href*="/arable/organic-matter"]').click()
    await this.#selectOption(soilActions.testOrganicMatter, this.canTestOrganicMatter, this.cannotTestOrganicMatter)
    await this.#selectOption(soilActions.producePlan, this.canProducePlan, this.cannotProducePlan)
    await this.#selectOption(soilActions.greenCover, this.canHaveGreenCover, this.cannotHaveGreenCover)
    await this.#selectOption(soilActions.addOrganicMatter, this.canTestOrganicMatter, this.cannotTestOrganicMatter)
  }

  async #selectOption(option, element1, element2){
    true === option ? await element1.click() : await element2.click()
    await this.#continue()
  }

  async #continue(){
    await this.submit.click();
  }
}

export default new SoilActionsFlow()