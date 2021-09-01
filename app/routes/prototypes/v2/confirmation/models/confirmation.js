function ViewModel (agreementNumber) {
  this.model = {
    titleText: 'Application complete',
    html: `Your reference number<br><strong>${agreementNumber}</strong>`
  }
}

module.exports = ViewModel
