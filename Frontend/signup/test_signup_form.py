from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Set up the WebDriver (e.g., ChromeDriver)
driver = webdriver.Chrome()

try:
    # Open the Signup page
    driver.get("http://localhost:3000/signup")  # Update with your actual URL

    # Maximize the browser window
    driver.maximize_window()

    # Wait for the page to load
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.TAG_NAME, "form"))
    )

    # Locate form fields
    first_name_input = driver.find_element(By.ID, "firstName")
    last_name_input = driver.find_element(By.ID, "lastName")
    phone_number_input = driver.find_element(By.ID, "phoneNumber")
    email_input = driver.find_element(By.ID, "email")
    password_input = driver.find_element(By.ID, "password")
    submit_button = driver.find_element(By.NAME, "submit")

    # Test 1: Fill out the form with valid data
    first_name_input.send_keys("John")
    last_name_input.send_keys("Doe")
    phone_number_input.send_keys("1234567890")
    email_input.send_keys("john.doe@example.com")
    password_input.send_keys("ValidPass@123")
    submit_button.click()

    # Wait for the response or redirection
    time.sleep(3)
    print("Test 1: Form submitted successfully with valid data.")

    # Test 2: Test validation for empty fields
    driver.refresh()  # Refresh the page
    submit_button = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.NAME, "submit"))
    )
    submit_button.click()

    # Capture and print error messages
    first_name_error = driver.find_element(By.XPATH, "//p[contains(text(), 'First name must contain')]")
    print("Test 2: Validation error message for first name:", first_name_error.text)

    # Test 3: Test password validation rules
    driver.refresh()
    password_input = driver.find_element(By.ID, "password")
    password_input.send_keys("short")
    time.sleep(1)  # Allow time for dynamic validation

    validation_messages = driver.find_elements(By.XPATH, "//p[contains(@class, 'text-red-500')]")
    for message in validation_messages:
        print("Password validation error:", message.text)

    # Test 4: Invalid email format
    driver.refresh()
    email_input = driver.find_element(By.ID, "email")
    email_input.send_keys("invalid-email")
    submit_button.click()
    email_error = driver.find_element(By.XPATH, "//p[contains(text(), 'Invalid email format.')]")
    print("Test 4: Validation error message for email:", email_error.text)

finally:
    # Close the browser
    driver.quit()
