import {test, expect } from '@playwright/test'
import path from 'path';

const UI_URL = 'http://localhost:5173/';

//before each test , you will require to sign in 
test.beforeEach(async({page})=>{
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
    
  
});

test("should show hotel search results",async({page})=>{
    await page.goto(UI_URL);

    await page.getByPlaceholder("Where are you going?").fill("Dublin");
    await page.getByRole("button",{name:"Search"}).click();

    await expect(page.getByText("Hotels found in Dublin")).toBeVisible();
    await expect(page.getByText("Dublin Getaways")).toBeVisible();
})