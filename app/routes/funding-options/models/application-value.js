function ViewModel (values, errors) {
  this.model = {
    schemeActions: schemeActions(),
    IncreasedPaymentActions: IncreasedPaymentActions()
  }
}

const schemeActions = () => {
  return {
    caption: 'Funding breakdown',
    captionClasses: 'govuk-table__caption--m',
    firstCellIsHeader: false,
    head: [
      {
        text: 'Scheme actions'
      },
      {
        text: 'Amount'
      },
      {
        text: 'Payment'
      },
      {
        text: ''
      }
    ],
    rows: [
      [
        {
          text: 'Minimise poaching on bare land'
        },
        {
          text: '55 hectares'
        },
        {
          text: '£3,245'
        },
        {
          text: 'Change'
        }
      ],
      [
        {
          text: 'Carry out a soil assessment on at least 25% of my land'
        },
        {
          text: ''
        },
        {
          text: ''
        },
        {
          text: ''
        }
      ],
      [
        {
          text: 'Avoid machinery traffic and cultivation on wet soil'
        },
        {
          text: ''
        },
        {
          text: ''
        },
        {
          text: ''
        }
      ],
      [
        {
          text: 'Establish or sow grassland seed on fields at high risk of flooding'
        },
        {
          text: ''
        },
        {
          text: ''
        },
        {
          text: ''
        }
      ],
      [
        {
          text: 'Reduce or remove livestock from permanent grassland when the soil is wet'
        },
        {
          text: ''
        },
        {
          text: ''
        },
        {
          text: ''
        }
      ]
    ]
  }
}

const IncreasedPaymentActions = (value, error) => {
  return {
    caption: '',
    captionClasses: '',
    firstCellIsHeader: false,
    head: [
      {
        text: 'Increased payment actions'
      },
      {
        text: 'Amount'
      },
      {
        text: 'Payment'
      },
      {
        text: ''
      }
    ],
    rows: [
      [
        {
          text: 'Establish green cover on land at risk of flooding'
        },
        {
          text: '12 hectares'
        },
        {
          text: '£1,368'
        },
        {
          text: 'Change'
        }
      ],
      [
        {
          text: 'Convert arable land to permanent grass.'
        },
        {
          text: '5 hectares'
        },
        {
          text: '£1,555'
        },
        {
          text: 'Change'
        }
      ]
    ]
  }
}

module.exports = ViewModel
