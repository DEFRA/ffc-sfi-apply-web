function ViewModel (values) {
  const agreementOptions = [
    {
      value: 'myself',
      text: 'I\'ll do it myself'
    },
    {
      value: 'agronomist',
      text: 'I\'ll pay an agronomist'
    },
    {
      value: 'completed',
      text: 'I\'ve already done one'
    },
    {
      value: 'unable',
      text: 'I cannot do this'
    },
    {
      value: 'yes',
      text: 'Yes, I can do this'
    },
    {
      value: 'unknown',
      text: 'I don\'t know yet'
    },
    {
      value: 'no',
      text: 'I cannot do this'
    }
  ]

  this.model = {
    rows: [
      {
        key: {
          text: 'Soil assessment'
        },
        value: {
          text: agreementOptions.find(x => x.value === values.soilAssessment).text
        },
        actions: {
          items: [
            {
              href: '/create-agreement/soil-assessment',
              text: 'Change',
              visuallyHiddenText: 'soilAssessment'
            }
          ]
        }
      },
      {
        key: {
          text: 'Soil protection'
        },
        value: {
          text: agreementOptions.find(x => x.value === values.soilProtection).text
        },
        actions: {
          items: [
            {
              href: '/create-agreement/soil-protection',
              text: 'Change',
              visuallyHiddenText: 'soilProtection'
            }
          ]
        }
      },
      {
        key: {
          text: 'Soil cover'
        },
        value: {
          text: agreementOptions.find(x => x.value === values.soilCover).text
        },
        actions: {
          items: [
            {
              href: '/create-agreement/soil-cover',
              text: 'Change',
              visuallyHiddenText: 'soilCover'
            }
          ]
        }
      },
      {
        key: {
          text: 'Soil management'
        },
        value: {
          text: agreementOptions.find(x => x.value === values.soilManagement).text
        },
        actions: {
          items: [
            {
              href: '/create-agreement/soil-management',
              text: 'Change',
              visuallyHiddenText: 'soilManagement'
            }
          ]
        }
      },
      {
        key: {
          text: 'Tillage'
        },
        value: {
          text: agreementOptions.find(x => x.value === values.tillage).text
        },
        actions: {
          items: [
            {
              href: '/create-agreement/tillage',
              text: 'Change',
              visuallyHiddenText: 'tillage'
            }
          ]
        }
      },
      {
        key: {
          text: 'Soil compaction'
        },
        value: {
          text: agreementOptions.find(x => x.value === values.soilCompaction).text
        },
        actions: {
          items: [
            {
              href: '/create-agreement/soil-compaction',
              text: 'Change',
              visuallyHiddenText: 'soilCompaction'
            }
          ]
        }
      },
      {
        key: {
          text: 'Soil quality'
        },
        value: {
          text: agreementOptions.find(x => x.value === values.soilQuality).text
        },
        actions: {
          items: [
            {
              href: '/create-agreement/soil-quality',
              text: 'Change',
              visuallyHiddenText: 'soilQuality'
            }
          ]
        }
      }
    ]
  }
}

module.exports = ViewModel
