import { test, expect } from '@playwright/test';

import { faker } from '@faker-js/faker';
import { TaskModel } from './fixtures/task.model';
import { deleteTaskByHelper, postTask } from './support/helpers';
import { TasksPage } from './support/pages/tasks';

import data from './fixtures/tasks.json' assert { type: 'json' };

let tasksPage: TasksPage;

test.beforeEach(({ page }) => {
    tasksPage = new TasksPage(page);
})

test.describe('Cadastro', () => {
    test('Deve poder cadastrar uma nova tarefa', async ({ request }) => {
        const task = data.sucess as TaskModel;

        await deleteTaskByHelper(request, task.name);



        await tasksPage.go()
        await tasksPage.create(task)
        await tasksPage.shouldHaveText(task.name)
    })


    test('Não deve permitir tarefa duplicada', async ({ request }) => {
        const task = data.duplicate as TaskModel;

        await deleteTaskByHelper(request, task.name);
        await postTask(request, task);



        await tasksPage.go()
        await tasksPage.create(task)
        await tasksPage.alertHaveText('Task already exists!')
    })

    test('Deve validar o campo obrigatorio', async () => {
        const task = data.required as TaskModel;



        await tasksPage.go()
        await tasksPage.create(task)

        const validationMessage = await tasksPage.iptTaskName.evaluate(e => (e as HTMLInputElement).validationMessage)
        expect(validationMessage).toEqual('This is a required field')
    })
})

test.describe('Atualização', () => {
    test('Deve concluir uma tarefa', async ({ request }) => {
        const task = data.update as TaskModel

        await deleteTaskByHelper(request, task.name);
        await postTask(request, task);


        await tasksPage.go()
        await tasksPage.toggle(task.name)
        await tasksPage.shouldBeDone(task.name)
    })
})

test.describe('exclusão', () => {
    test('Deve excluir uma tarefa', async ({ request }) => {
        const task = data.delete as TaskModel

        await deleteTaskByHelper(request, task.name);
        await postTask(request, task);


        await tasksPage.go()
        await tasksPage.remove(task.name)
        await tasksPage.shouldNotExist(task.name)
    })
})
