Feature: Sign-Up Navigation
  As a user
  I want to navigate to the Sign-Up page
  So that user is able to select Country in 'Where is your company registered?' dropdown

  Scenario: User navigates to the Sign-Up page successfully
    Given the user is on the login page
    And the user accepts the privacy settings
    When the user clicks on "Start a Free Trial"
    Then the user should be redirected to the Sign-Up page

  Scenario Outline: Verify that the user is able to navigate to the Company Information page
    Given the user is on the Sign-Up page
    When the user enters a valid work email address "<Email Address>"
    And the user enters a valid password "<Password>"
    And the user checks I agree to the Terms and Conditions and Privacy Policy
    And the user checks Iam happy to get occasional product updates
    And the user clicks Try for Free
    And the user enters First Name "<First Name>"
    And the user enters Last Name "<Last Name>"
    And the user enters Phone Number "<Phone Number>"
    And the user clicks on Next Step
    Then the user should be successfully navigated to the Company Information page

    Examples:
      | Email Address     | Password  | First Name | Last Name | Phone Number |
      | megha@circula.com | Megha@123 | Megha      | Vernekar  |     12345678 |

  Scenario Outline: Verify that the Company Information section allows entering details
    Given the user is on the Sign-Up page
    When the user enters email address "<Email Address>" password "<Password>" First Name "<First Name>" Last Name "<Last Name>" Phone Number "<Phone Number>"
    And the user clicks on Next Step
    And the user should be successfully navigated to the Company Information page
    And the user enters the company name "<Company Name>"
    And country "<country>" should be pre-selected in the Where is your company registered? dropdown
    And the user selects a reason "<reason>" from How did you hear about us?

    Examples:
      | Email Address     | Password  | First Name | Last Name | Phone Number | Company Name | reason      | country |
      | megha@circula.com | Megha@123 | Megha      | Vernekar  |     12345678 | TestCompany  | Tax Advisor | Germany |

  Scenario Outline: Verify that user is able to select Country Sweden in Where is your company registered? dropdown
    Given the user is on the Sign-Up page
    When the user enters email address "<Email Address>" password "<Password>" First Name "<First Name>" Last Name "<Last Name>" Phone Number "<Phone Number>"
    And the user clicks on Next Step
    And the user should be successfully navigated to the Company Information page
    And the user enters the company name "<Company Name>" selects a reason "<reason>" from How did you hear about us?
    And country "<country>" should be present in dropdown list of Where is your company registered? dropdown
    And the user selects country "<country>" from the dropdown list
    And selected country "<country>" should be displayed in the Where is your company registered? dropdown

    Examples:
      | Email Address     | Password  | First Name | Last Name | Phone Number | Company Name | reason      | country |
      | megha@circula.com | Megha@123 | Megha      | Vernekar  |     12345678 | TestCompany  | Tax Advisor | Sweden  |
