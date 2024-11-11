import { test, expect } from '@playwright/test';
import { SignupPage } from '../pages/signupPage';
import { faker } from "@faker-js/faker";




test.describe('Signup flow', () => {
    let homePage;
    // let signupPage;

    test.describe.configure({mode: 'serial'});

    test('Verify signup flow', async ({ page }) => {
        const signupPage = new SignupPage(page);
        await signupPage.navigateToSignupPage();
        await signupPage.enterName(`${faker.person.firstName()}`);
        await signupPage.enterEmail(`${faker.internet.email()}`);
        await signupPage.enterPassword(`${faker.internet.password()}`);
        await signupPage.checkInterestsCheckbox("Cypress");
        await signupPage.selectGenderRadioButton("male");
        await signupPage.selectState("Karnataka");
        await signupPage.selectHobbies();
        const loginPage = await signupPage.clickOnSignupButton();
        await loginPage.wait();
        const successMessage = await loginPage.getSignupSuccessMessage();
        expect(successMessage).toBe("Signup successfully, Please login!");        
    })
})