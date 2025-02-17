Feature: User creates a new entries from the registration page

  Scenario: Viewing the registration page without any selections
    Given you are on the default registration page
    Then there should be informative message explaining you need to select an organisation unit

  Scenario: Viewing the registration page with incomplete program categories selection
    Given you are in the main page with no selections made
    And you select org unit
    And you select the Contraceptives Voucher Program
    Then you see a dropdown button
    When you click the the first option option
    Then you are navigated to the Contraceptives Voucher Program registration page with program selected
    And there should be informative message explaining you need to complete your selections

  Scenario: Viewing the registration page with organisation unit selected
    Given you are on the default registration page
    And you select org unit
    Then you see the dropdown menu for selecting tracked entity type

  Scenario: Viewing the registration page with organisation unit and tracked entity type person selected
    Given you are on the default registration page
    And you select org unit
    And you select tracked entity type person
    Then you see the registration form for the Person

  Scenario: Viewing the registration page with organisation unit and tracker program Child Programme selected
    Given you are on the default registration page
    And you select org unit
    And you select Child Programme
    Then you see a registration form for the Child Programme

  Scenario: Viewing the registration page with organisation unit and event program Malaria case registration selected
    Given you are on the default registration page
    And you select org unit
    And you select the Malaria case registration program
    Then you see the registration form for the Malaria case registration

  Scenario: Viewing section descriptions with organisation unit and event program Inpatient morbidity and mortality selected
    Given you are on the default registration page
    When you select org unit
    And you select the Inpatient morbidity and mortality program
    Then you see a description text for one section

  Scenario: Navigating to registration page without program selected
    Given you are in the main page with no selections made
    And you select org unit
    And you select Child Programme
    Then you see a dropdown button
    When you click the "New..." option
    Then you are navigated to the registration page without program selected
    And you see the dropdown menu for selecting tracked entity type
    And you have no program selection

  Scenario: Navigating to registration page with program selected
    Given you are in the main page with no selections made
    And you select org unit
    And you select Child Programme
    Then you see a dropdown button
    When you click the the first option option
    Then you are navigated to the Child Programme registration page with program selected
    And you see a registration form for the Child Programme
    And you have Child Programme selected

  Scenario: Navigating to registration page after selecting program category
    Given you are in the main page with no selections made
    And you select org unit
    And you select the Contraceptives Voucher Program
    Then you see a dropdown button
    When you click the the first option option
    Then you are navigated to the Contraceptives Voucher Program registration page with program selected
    And there should be informative message explaining you need to complete your selections
    When you select the first category
    Then you see the registration form for the specific category

  Scenario: Navigating to registration page from view single event page
    Given you are in the main page with no selections made
    And you select org unit
    And you select the Antenatal care visit program
    Then you see a list of events
    When you select one of the events
    Then you see a dropdown button
    When you click the the first option option
    Then you are navigated to the Antenatal care visit registration page
    Then program and organisation unit is still selected in top bar


### New event in Antenatal care visit
  Scenario: New event in Antenatal care visit > Submitting the form with empty visit date throws validation error
    Given you are in the Antenatal care visit registration page
    When you submit the form
    Then you see validation error on visit date

  Scenario: New event in Antenatal care visit > Submitting the form with high hemoglobin value throws validation error
    Given you are in the Antenatal care visit registration page
    When you fill in 200 in the hemoglobin
    And you submit the form
    Then you see validation error on hemoglobin

  Scenario: New event in Antenatal care visit > Submitting the form with correct values navigates you to the working list
    Given you are in the Antenatal care visit registration page
    When you fill in the hemoglobin
    And you fill in the visit date
    And you submit the form
    Then you are navigated to the working list


### New Person

  Scenario: New person > Submitting the form with unique name navigates you to the user dashboard
      Given you are in the Person registration page
      When you fill in a unique first name
      And you click the save person submit button
      Then you are navigated to the Tracker Capture

  Scenario: New person > Submitting the form from the duplicates modal navigates you to the user dashboard
    Given you are in the Person registration page
    When you fill in the first name with value that has duplicates
    And you click the save person submit button
    And you see the possible duplicates modal
    And you submit the form again from the duplicates modal
    Then you are navigated to the Tracker Capture

  Scenario: New person > Submitting the form shows a list with duplicates
    Given you are in the Person registration page
    When you fill in the first name with value that has duplicates
    And you click the save person submit button
    And you see the possible duplicates modal
    When you click the next page button
    Then you can see the second page of the results
    When you click the previous page button
    Then you can see the first page of the results

  Scenario: New person > Cancel the editing form should show a warning
    Given you are on the default registration page
    And you select org unit
    And you select Child Programme
    When you fill in a unique first name
    And you click the cancel button
    Then you should see confirm dialog
    Then you are navigated to the working list with programId IpHINAT79UW

### New person in Tracker Program

  # Scenario: New person in Tracker Program > Submitting the form with empty visit date throws validation error
  #   Given you are in the WHO RMNCH program registration page
  #   And you click the save person submit button
  #   Then you see validation errors

  Scenario: New person in Tracker Program > Filling the age with age 0 throws validation warning
    Given you are in the WHO RMNCH program registration page
    And you fill the form with age 0
    Then you see validation warning on birth date

  Scenario: New person in Tracker Program > Submitting the form with unique values navigates you to the user dashboard
    Given you are in the WHO RMNCH program registration page
    When you fill the WHO RMNCH program registration form with its required unique values
    And you click the save person submit button
    Then you are navigated to the WHO RMNCH program in Tracker Capture app

  Scenario: New person in Tracker Program > Submitting the form from the duplicates modal navigates you to the user dashboard
    Given you are in the WHO RMNCH program registration page
    When you fill the WHO RMNCH program registration form with its required values
    And you click the save person submit button
    And you see the possible duplicates modal
    When you submit the form again from the duplicates modal
    Then you are navigated to the WHO RMNCH program in Tracker Capture app

@v>=41
  Scenario: New person in Tracker Program > Filling the Allergies with multiple options
    Given you are in the WHO RMNCH program registration page
    When you fill in multiple Allergies options
    Then you can see the multiple selections in the form
    And you fill the WHO RMNCH program registration form with its required unique values
    And you click the save person submit button
    Then you are navigated to the WHO RMNCH program in Tracker Capture app

  Scenario: New person in Tracker Program > Submitting the form shows a list with duplicates
    Given you are in Child programme registration page
    When you fill the Child programme registration form with a first name with value that has duplicates
    And you click the save person submit button
    And you see the possible duplicates modal
    When you click the next page button
    Then you can see the second page of the results
    When you click the previous page button
    Then you can see the first page of the results

  Scenario: New person in Tracker Program > Submitting without filling the form shows errors underneath the fields
    Given you are in the WNCH PNC program registration page
    And you click the save person submit button
    Then you see validation errors on the WHO RMNCH program registration page

  Scenario: Go to enrollment event when Open data entry form after enrollment is checked
    Given you open the main page with Ngelehun and Malaria case diagnosis, treatment and investigation context
    And you opt in to use the new enrollment Dashboard for Malaria case diagnosis, treatment and investigation
    And you see the opt out component for Malaria case diagnosis, treatment and investigation
    When you are in the Malaria case diagnosis, treatment and investigation program registration page
    And you fill the Malaria case diagnosis registration form with values
    And you click the save malaria entity submit button
    Then you see the enrollment event New page
    When you open the main page with Ngelehun and Malaria case diagnosis, treatment and investigation context
    And you opt out to use the new enrollment Dashboard for Malaria case diagnosis, treatment and investigation
    Then you see the opt in component for Malaria case diagnosis, treatment and investigation

## New enrollment of existing TEI

  Scenario: New enrollment of existing TEI > The TEI form is prefield with the attributes values
    Given you are in Child programme reenrollment page
    Then you see the form prefield with existing TEI attributes values
    And the scope selector has the TEI context
