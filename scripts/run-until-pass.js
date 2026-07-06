const { execSync } = require('child_process');

function runTests() {
  let attempt = 1;
  let passed = false;

  while (!passed) {
    console.log(`\n--- Attempt ${attempt} ---`);
    try {
      execSync('npx playwright test', { stdio: 'inherit' });
      passed = true;
      console.log('\nAll tests passed successfully!');
    } catch (error) {
      console.log(`\nTests failed on attempt ${attempt}. Retrying...`);
      attempt++;
      // Optional: limit attempts to prevent infinite loop
      if (attempt > 5) {
        console.error('Reached maximum retry attempts. Exiting.');
        process.exit(1);
      }
    }
  }
}

runTests();
