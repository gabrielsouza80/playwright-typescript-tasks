import { Page, expect } from "@playwright/test"
import { TaskModel } from "../../../fixtures/task.model"

export class TasksPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async create(task: TaskModel) {
        const iptTaskNome = this.page.locator('input[class*="InputNewTask"]')
        await iptTaskNome.fill(task.name)

        await this.page.click('button[class*="ButtonNewTask"]')
    }

    async go(){
        await this.page.goto('http://localhost:8080')
    }

    async shouldHaveText(taskName: string) {
        const target = this.page.locator(`//p[contains(@class, "listItemText")]//font[text()="${taskName}"]`)
        await expect(target).toBeVisible
    }

    async alertHaveText(text: string) {
        const target = this.page.locator('css=.swal2-html-container')
        await expect(target).toHaveText(text)
    }
}