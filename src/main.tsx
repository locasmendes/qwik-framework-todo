import { component$, $ } from '@builder.io/qwik';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Main } from './components/main/main';
import type { Todos } from './state/state';

import './base.css';
import './index.css';

export const todos: Todos = {
  filter: 'all',
  items: [
    { completed: false, type: 'Tarefa', title: 'Ler a documentação do Qwik' },
    { completed: false, type: 'Hábito', title: 'Implementar um HelloWorld' },
    { completed: false, type: 'Tarefa', title: 'Profit' },
  ],
};

/**
 * Overall application component.
 *
 * This component is static (meaning it will never change). Because of this
 * Qwik knows that it should never need to be rerendered, and its code will never
 * download to the client.
 */
export const App = component$(() => {
  return $(() => {
    return (
      <section class="todoapp">
        <Header todos={todos} />
        <Main todos={todos} />
        <Footer todos={todos} />
      </section>
    );
  });
});
