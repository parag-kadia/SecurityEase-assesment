Feature: Search Result for "Sport in 2023"

  Scenario: Validate top 4 Search results for "Sport in 2023"
    Given I am on the BBC Sport Search
    When I search for "Sport in 2023"
    Then I should see at least 4 relevant results