import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { TaskModel } from './fixtures/task.model';
import { deleteTaskByHelper, postTask } from './support/helpers';

test('Deve poder cadastrar uma nova tarefa', async ({ page, request }) => {

    const task: TaskModel = {
        name: 'Ler um livro de TypeScript',
        is_done: false
    }

    const iptTaskNome = page.locator('input[class*="InputNewTask"]')
    const target = page.locator(`//p[contains(@class, "listItemText")]//font[text()="${task.name}"]`)


    await deleteTaskByHelper(request, task.name);
    await page.goto('http://localhost:8080');
    await iptTaskNome.fill(task.name)
    await page.click('button[class*="ButtonNewTask"]')
    await expect(target).toBeVisible

})


test('Não deve permitir tarefa duplicada', async ({ page, request }) => {

    const task: TaskModel = {
        "name": "Comprar Ketchup",
        "is_done": false
    }

    const iptTaskNome = page.locator('input[class*="InputNewTask"]')
    const target = page.locator('css=.swal2-html-container')


    await deleteTaskByHelper(request, task.name);
    await postTask(request, task);

    await page.goto('http://localhost:8080');
    await iptTaskNome.fill(task.name)
    await page.click('button[class*="ButtonNewTask"]')
    await expect(target).toHaveText('Task already exists!')

})