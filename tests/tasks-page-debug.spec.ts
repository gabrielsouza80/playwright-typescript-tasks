import { test, Page } from '@playwright/test';

// Criamos uma versão simplificada do TasksPage só para depuração
class TasksPageDebug {
    readonly page: Page;

    constructor(page: Page) {
        console.log('Construtor chamado! Aqui está o page recebido:');
        console.log(page);  // 👈 Mostra no console o objeto Page
        this.page = page;
    }

    async go() {
        console.log('Chamando go() para abrir a página');
        await this.page.goto('https://playwright.dev');
    }

    async printTitle() {
        const title = await this.page.title();
        console.log('Título atual da página:', title);
    }
}

// Teste principal
test('Debug do TasksPage', async ({ page }) => {
    console.log('Teste iniciado! Criando TasksPageDebug...');
    const tasksPage = new TasksPageDebug(page);

    await tasksPage.go();
    await tasksPage.printTitle();
});
