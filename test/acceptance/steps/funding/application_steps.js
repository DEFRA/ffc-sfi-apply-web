import { Given, When, Then } from '@wdio/cucumber-framework'
import AuthService from '../../domain/auth/auth-service'
import ApplyJourney from '../../domain/funding/apply-journey'
import { eligibleFarmer } from '../../fixtures/users'

Given( "{} is an eligible farmer", async (user) => {
  await AuthService.loginWith(eligibleFarmer.auth)
})

When( "{} applies for farming fund", async (user) => {
  await ApplyJourney.apply(eligibleFarmer)

});

Then( "{} application is successful", async (user) => {
  console.log("username is: ", user)
});

Then( "{} is able save the application", async (user) => {
  console.log("username is: ", user)
});