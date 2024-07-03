const {test, expect} = require('@playwright/test');

export async function clickElement(elem){
    await expect(elem).toBeVisible();
    await elem.click();
}

export async function dblClickElement(elem){
    await expect(elem).toBeVisible();
    await elem.dblclick();
}

export async function writeToInput(elem, text, page=null, hitEnter=null){
    await elem.fill(text);

    if(hitEnter){
        await page.keyboard.press('Enter');
    }
}

// To use this function input should be focused
export async function typeTxtToPage(page, text){
    await page.keyboard.type(text);
}

// visible bool = Check if next element appears 
export async function elementHover(elem, visible = null){
    await elem.hover();
    //TODO
    if(visible != null){
        
    }
}

export async function generateRandStr(length){
    var result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var counter = 0;

    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * length));
      counter += 1;
    }
    
    return result;
}

export async function generateTestEmail(length){
    var randStr = await generateRandStr(length);

    var emailBase = 'e2e-autom-test-user-';
    var emailEnd = '@supernova.dev';
    
    return emailBase + randStr + emailEnd;
}