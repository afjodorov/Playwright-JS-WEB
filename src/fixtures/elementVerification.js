const {test, expect} = require('@playwright/test');
const elementActions = require('./elementActions');

export async function verifyElementIsVisible(elem){
    await expect(elem).toBeVisible();
}

export async function verifyElementIsHidden(elem){
    await expect(elem).toBeHidden();
}

export async function verifyElementIsDisabled(elem){
    await expect(elem).toBeDisabled();
}

export async function verifyElementIsEnabled(page, elem){
    await page.waitForTimeout(1000);
    await expect(elem).toBeEnabled();
}

export async function verifyIfElementIsVisible(elem){
    const isExisting = await elem.isVisible(1000);
    return await isExisting;
}

export async function verifyIfElementIsNotVisible(elem){
    const isExisting = await elem.isHidden(1000);
    return await isExisting;
}

export async function verifyTextShouldBe(elem, txt){
    await expect(elem).toHaveText(txt);
}

export async function verifyUploadingElement(elem, timeout){
    await expect(elem).toBeVisible({ timeout: timeout });
}

export async function verifyElementAppearsAndDisappears(elem){
    await this.verifyElementIsVisible(elem);
    await this.verifyElementIsHidden(elem);
}

export async function verifyLinkInNewTab(page, elem, url){
    const newTabPromise = page.waitForEvent("popup");
    await elementActions.clickElement(elem);

    const newTab = await newTabPromise;
    await newTab.waitForLoadState();

    await expect(newTab).toHaveURL(url);
}

// it can be used to verify and compare both width and height separately
export async function verifyElementSize(elem, expectedHeight=null, expectedWidth=null){
    const boundingBox = await elem.boundingBox();

    if(expectedHeight && !expectedWidth){
        await expect(boundingBox.height).toEqual(expectedHeight);
    }
    else if(!expectedHeight && expectedWidth){
        await expect(boundingBox.width).toEqual(expectedWidth);
    }
    else if(expectedHeight && expectedWidth){
        await expect(boundingBox.height).toEqual(expectedHeight);
        await expect(boundingBox.width).toEqual(expectedWidth);
    }
}

export async function verifyPlaceholderValueEquals(elem, val){
    const placeHolderVal = await elem.getAttribute('placeholder');

    await expect(placeHolderVal).toEqual(val);
}

export async function verifyPlaceholderTxtEquals(page, elem, val){
    await page.waitForTimeout(1000);
    const placeHolderTxt=await elem.textContent();

    await expect(placeHolderTxt).toEqual(val);
}

export async function verifyByAttributeInputTxtEquals(attr, elem, val){
    const inputTxt= await elem.getAttribute(attr);

    await expect(inputTxt).toEqual(val);
}
/*
Inconsistent due to rendering environment differences
In case of problems run test with --update-snapshots flag
*/
export async function verifyScreenshot(page, locator, fileName){
    await this.verifyElementIsVisible(locator);

    await page.waitForTimeout(1000);

    const box = await locator.boundingBox();
    await expect(page).toHaveScreenshot(fileName, {
        maxDiffPixelRatio: 0.1,
        maxDiffPixels: 50,
        clip: box
    });
}

export async function verifyIfCountIs(actualCount, expectedCount){
    await expect(actualCount).toBe(expectedCount);
}
