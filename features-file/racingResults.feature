Feature: Validate F1 Grand Prix Results

  Scenario: Validation of the top 3 finishers for the 2023 Las Vegas Grand Prix
    Given I am on the BBC Sport homepage
    When I navigate to the 2023 Las Vegas Grand Prix results page
    Then I should see that Max Verstappen finished in 1st place
    And I should see that George Russell finished in 2nd place
    And I should see that Sergio Perez finished in 3rd place
