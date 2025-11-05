import { test, expect } from '@playwright/test';

import { faker } from '@faker-js/faker';
import { TaskModel } from './fixtures/task.model';
import { deleteTaskByHelper, postTask } from './support/helpers';
import { TasksPage } from './support/pages/tasks';

test('Deve poder cadastrar uma nova tarefa', async ({ page, request }) => {
    const task: TaskModel = {
        name: 'Ler um livro de TypeScript',
        is_done: false
    }

    await deleteTaskByHelper(request, task.name);

    const tasksPage: TasksPage = new TasksPage(page);

    await tasksPage.go()
    await tasksPage.create(task)
    await tasksPage.shouldHaveText(task.name)

})


test('Não deve permitir tarefa duplicada', async ({ page, request }) => {
    const task: TaskModel = {
        "name": "Comprar Ketchup",
        "is_done": false
    }

    await deleteTaskByHelper(request, task.name);
    await postTask(request, task);

    const tasksPage: TasksPage = new TasksPage(page);

    await tasksPage.go()
    await tasksPage.create(task)
    await tasksPage.alertHaveText('Task already exists!')
})

test.only('Deve validar o campo obrigatorio', async ({ page }) => {
    const task: TaskModel = {
        name: '',
        is_done: false
    }

    const tasksPage: TasksPage = new TasksPage(page);

    await tasksPage.go()
    await tasksPage.create(task)
    
    const iptTaskNome = page.locator('input[class*="InputNewTask"]')
    const validationMessage = await iptTaskNome.evaluate(e => (e as HTMLInputElement).validationMessage)
    expect(validationMessage).toEqual('This is a required field')
})