import { Locator, Page } from "@playwright/test";

export class SauceDemoProductsPg {
    page: Page;
    readonly productLabel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productLabel = page.locator("div[class='product_label']");
    }

    async isSuccessfulLogin(): Promise<boolean> {
        this.productLabel.waitFor();
        const isProductVisbile = await this.productLabel.isVisible();
        return isProductVisbile;
    }
}