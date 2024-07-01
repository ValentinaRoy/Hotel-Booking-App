import { test, expect } from '@playwright/test';
const UI_URL= "http://localhost:5173/"
test('should allow user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  //get the sign in button
  await page.getByRole(
   "link", {name:"Sign In"}
  ).click();

  //expect the page is loaded by checking ig sign in heading is there
  await expect(page.getByRole("heading",{name:"Sign In"})).toBeVisible();

  //locate the email and pass fields and fill them with given value 
  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("password123");
  //then click login to test 
  await page.getByRole("button",{name:"Login"}).click();

  //to check if user successfully signed in 
  //see if the toast appears
  await expect(page.getByText("Login Successful")).toBeVisible();
  //see if the links appear and signin button becomes sign out
  await expect(page.getByRole("link",{name:"My Bookings"})).toBeVisible();
  await expect(page.getByRole("link",{name:"My Hotels"})).toBeVisible();
  await expect(page.getByRole("button",{name:"Sign Out"})).toBeVisible();


});

test('should allow user to register',async({page})=>{

  const testEmail =`test_register_${Math.floor(Math.random() * 90000)+10000}@test.com`
  await page.goto(UI_URL)

  //get the sign in button
  await page.getByRole(
   "link", {name:"Sign In"}
  ).click();

  await page.getByRole(
    "link", {name:"Create an account here"}
  ).click();
  

   //after clicking to check if we reached right page 
  await expect(page.getByRole('heading',{name:"Create an Account"})).toBeVisible();

   //locate the name,email pass fields and fill them with given value 
  await page.locator("[name=firstName]").fill("test_FN");
  await page.locator("[name=lastName]").fill("test_LN");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("password123");
  await page.locator("[name=confirmPassword]").fill("password123");


  //then click create account button to test 
  await page.getByRole("button",{name:"Create Account"}).click();


  //see if the toast appears
  await expect(page.getByText("Registration Successful!")).toBeVisible();
  //see if the links appear and signin button becomes sign out
  await expect(page.getByRole("link",{name:"My Bookings"})).toBeVisible();
  await expect(page.getByRole("link",{name:"My Hotels"})).toBeVisible();
  await expect(page.getByRole("button",{name:"Sign Out"})).toBeVisible();

})