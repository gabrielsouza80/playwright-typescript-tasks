import { test, expect } from '@playwright/test';

import { faker } from '@faker-js/faker';
import { TaskModel } from './fixtures/task.model';
import { deleteTaskByHelper, postTask } from './support/helpers';
import { TasksPage } from './support/pages/tasks';
import data from './fixtures/tasks.json' assert { type: 'json' };

test('Deve poder cadastrar uma nova tarefa', async ({ page, request }) => {
    const task = data.sucess as TaskModel;

    await deleteTaskByHelper(request, task.name);

    const tasksPage: TasksPage = new TasksPage(page);

    await tasksPage.go()
    await tasksPage.create(task)
    await tasksPage.shouldHaveText(task.name)
})


test('Não deve permitir tarefa duplicada', async ({ page, request }) => {
    const task = data.duplicate as TaskModel;

    await deleteTaskByHelper(request, task.name);
    await postTask(request, task);

    const tasksPage: TasksPage = new TasksPage(page);

    await tasksPage.go()
    await tasksPage.create(task)
    await tasksPage.alertHaveText('Task already exists!')
})

test('Deve validar o campo obrigatorio', async ({ page }) => {
    const task = data.required as TaskModel;

    const tasksPage: TasksPage = new TasksPage(page);

    await tasksPage.go()
    await tasksPage.create(task)
    
    const validationMessage = await tasksPage.iptTaskName.evaluate(e => (e as HTMLInputElement).validationMessage)
    expect(validationMessage).toEqual('This is a required field')
})