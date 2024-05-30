import LoginPage from "../pageobjects/login.page.js";
import {logger} from "../helpers/logger.js";
import InventoryPage from "../pageobjects/inventory.page.js";


describe('Sorting test suite', () => {
    const nameSortingOptions = [{
        sortingType: 'Name',
        sortingName: 'Name (A to Z)',
        sortedItems: (itemNames) => [...itemNames].sort((a, b) => a.localeCompare(b))
    }, {
        sortingType: 'Name',
        sortingName: 'Name (Z to A)',
        sortedItems: (itemNames) => [...itemNames].sort((a, b) => b.localeCompare(a))
    }, {
        sortingType: 'Price',
        sortingName: 'Price (low to high)',
        sortedItems: (itemPrices) => [...itemPrices].sort((a, b) => a - b)
    }, {
        sortingType: 'Price',
        sortingName: 'Price (high to low)',
        sortedItems: (itemPrices) => [...itemPrices].sort((a, b) => b - a)
    }];

    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
    });

    nameSortingOptions.forEach(option => {
        it(`Test Case ID 6. Sorting by ${option.sortingName}`, async () => {
            await logger.info(`Choose "${option.sortingName}" from the sorting options`);
            await InventoryPage.selectSortingBySortingName(option.sortingName);

            let itemNames = await InventoryPage.getInventoryItemNames();
            let itemPrices = await InventoryPage.getInventoryItemPrices();

            await logger.info(`All products were sorted due to the chosen sorting option`);
            if (option.sortingType === 'Price') {
                let sortedItemPrices = option.sortedItems(itemPrices);
                await expect(itemPrices).toEqual(sortedItemPrices);
            } else {
                let sortedItemNames = option.sortedItems(itemNames);
                await expect(itemNames).toEqual(sortedItemNames);
            }
        });
    });
});
