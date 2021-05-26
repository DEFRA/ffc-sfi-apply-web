function ViewModel () {
  // Constructor function to create logic dependent nunjucks page
  this.model = {
    rows: [
      {
        key: {
          text: 'Soil assessment'
        },
        value: {
          text: 'I\'ll do it myself'
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
          text: 'Yes, I can do this'
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
          text: 'Yes, I can do this'
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
          text: 'I\'ll do it myself'
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
          text: 'Yes, I can do this'
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
          text: 'Yes, I can do this'
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
          text: 'I\'ll do it myself'
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
