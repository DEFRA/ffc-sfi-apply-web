function ViewModel (agreementNumber) {
  this.model = {
    titleText: 'Application withdrawn',
    html: `Your reference number<br><strong>${agreementNumber}</strong>`
  }
}

module.exports = ViewModel
