Feature: Sign-Up Navigation
  As a user
  I want to navigate to the Sign-Up page
  So that I can create an account

  Scenario: User navigates to the Sign-Up page successfully
    Given the user is on the login page
    When the user clicks on "Start a Free Trial"
    Then the user should be redirected to the Sign-Up page
