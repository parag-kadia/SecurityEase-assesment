# SecurityEase-assesment Front-End
This project uses Playwright with TypeScript and Cucumber (BDD) to perfom automated testing on the BBC Sport website.

**Project Metrics & Approach**

**Code Quality/Reusability:** The code is modular, separating feature files, step definitions, and configuration. Helper functions or page object models and Fixutures could be added for scalibility to increase reusability.
**Implementation:** We use modern TypeScript and async/await for Playwright's API, ensuring a clean and readable implementation.
**Logic/Approach:** The test follows a clear BDD flow. The navigation logic from the homepage to the specific results page is handled in the Given step, which is a common problem-solving approach for dynamic websites.
**Comments & Documentation:** Inline comments are used to explain key sections of the code, such as locators and assertions. This README provides a comprehensive guide for setup and execution.
**Automation Techniques & Assertiveness:** The implementation uses robust Playwright locators to target specific table rows and cells. The expect assertions are used to validate both the presence of the table and the correctness of the race results.
**Error Handling:** The Playwright API has built-in retry mechanisms for actions and assertions. If an element is not found, the test will fail gracefully with a descriptive error message, which is sufficient for a CI pipeline.
**Problem Solving Skills:** A key problem was locating the exact F1 results table. The solution was to navigate from the homepage to the "Motorsport" section and then to the specific "F1" results page, a common pattern for navigating complex sites.
**CI Readiness:** The project is configured with a package.json file containing all necessary dependencies and a simple test command npm test run , making it easy to integrate into any Continuous Integration pipeline. The use of a .env file allows for easy environment configuration without changing the codebase.

**Prerequisites**

Node.js (LTS version)
Playwright
Cucumber
npm

**Clone the project:**
git clone https://github.com/parag-kadia/SecurityEase-assesment-Front-end

cd SecuritEase-assesment

**Install dependecies:**
npm install

**Run tests**
npm test run

**Test Results** and **Issue**
1st scenario : George Russell finished in 2nd place is not true. cause in the website George Russell is not 2nd.
