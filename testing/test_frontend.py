"""
This file contains GUI tests for page reroutes and button functionality.
"""

import time
import unittest

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait


class TestFrontend(unittest.TestCase):

    BASE_URL = 'http://lit-waters-99772.herokuapp.com/'
    CHROME_DRIVER_PATH = './chromedriver-2'
    HOLD_WINDOW = False
    TIMEOUT = 10

    # ------------------------------ SETUP ------------------------------
    @classmethod
    def setUpClass(cls):
        """
        Single setup before tests.
        """
        cls._driver = webdriver.Chrome(executable_path=TestFrontend.CHROME_DRIVER_PATH)
        cls._wait = WebDriverWait(cls._driver, TestFrontend.TIMEOUT)

    @classmethod
    def tearDownClass(cls):
        if not TestFrontend.HOLD_WINDOW:
            cls._close_all_windows(cls._driver)

    # ------------------------------ HELPER FUNCTIONS ------------------------------
    def _go_home(self):
        self._driver.get(TestFrontend.BASE_URL)

    def _css_wait_get(self, css_selector, error_message, clickable=True):
        """
        Wait until an DOM element is present and return it. Fail and timeout if not present.

        :param css_selector:
        :param clickable: whether or not to wait until the element is clickable
        :return: desired element
        """
        if clickable:
            expected_condition = EC.presence_of_element_located((By.CSS_SELECTOR, css_selector))
        else:
            expected_condition = EC.element_to_be_clickable((By.CSS_SELECTOR, css_selector))
        element = self._wait.until(expected_condition, error_message)
        return element

    def _close_background_windows(self, main_window):
        """
        Close all Selenium-driven windows that are not the specified main_window.
        """
        for window in self._driver.window_handles:
            if window != main_window:
                self._driver.switch_to.window(window)
                self._driver.close()
        self._driver.switch_to.window(main_window)

    @staticmethod
    def _close_all_windows(webdriver):
        for window in webdriver.window_handles:
            webdriver.switch_to.window(window)
            webdriver.close()

    # ------------------------------ TESTS ------------------------------
    def test_title(self):
        """
        Test that the page title equals 'SocialStache'
        """
        self._go_home()
        self._wait.until(EC.title_is('SocialStache'), 'Titles do not match')

    def test_navbar_home(self):
        """
        Test that the 'Home' navbar button redirects back home.
        """
        self._go_home()

        home_button = self._css_wait_get('.navbarButtonPanel a[href="/"]',
                                         'The Home button could not be found')
        home_button.click()

        home_url = TestFrontend.BASE_URL
        self._wait.until(EC.url_to_be(home_url),
                         'The Home url does not match: "{}"'.format(home_url))

    def test_navbar_about(self):
        """
        Test that the 'About' navbar button redirects to the 'About' page.
        """
        self._go_home()

        about_button = self._css_wait_get('.navbarButtonPanel a[href="/about"]',
                                          'The About button could not be found')
        about_button.click()

        about_url = TestFrontend.BASE_URL + 'about'
        self._wait.until(EC.url_to_be(about_url),
                         'The About url does not match: "{}"'.format(about_url))

    def test_navbar_sign_in(self):
        """
        Test that the Sign In button opens a new window to a Facebook login.
        """
        self._go_home()
        main_window = self._driver.current_window_handle

        # Click the sign in window
        sign_in_button = self._css_wait_get('.navbarButtonPanel .SignIn',
                                            'The Sign In button could not be found')
        sign_in_button.click()

        # Make sure a new window opens
        self._wait.until(EC.number_of_windows_to_be(2),
                         'A Sign In window was not opened')

        # Switch driver to the new page and check that it's Facebook
        for window in self._driver.window_handles:
            if window != main_window:
                self._driver.switch_to.window(window)

        # We need this sleep so the new page continues to load
        time.sleep(4)
        #self._wait.until(EC.title_is('Facebook'), 'The new page title is not Facebook')
        self._wait.until(EC.url_contains('facebook'),
                         'The Home url does not contain: "{}"'.format('facebook'))

        self._close_background_windows(main_window)


if __name__ == '__main__':
    unittest.main()
