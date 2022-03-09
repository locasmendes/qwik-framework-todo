import {component$, $, createStore, useEvent} from '@builder.io/qwik';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Main } from './components/main/main';
import type { Todos } from './state/state';

import './base.css';
import './index.css';
import './modal.css';
import {addItem, closeMyDialog, saveItem} from "./state/state";

export const todos: Todos = {
  filter: 'all',
  items: [
    { completed: false, type: 'Tarefa', title: 'Ler a documentação do Qwik', timeCost: 6 },
    { completed: false, type: 'Hábito', title: 'Implementar um HelloWorld', timeCost: 1 },
    { completed: false, type: 'Hábito', title: 'Melhorar o código', timeCost: 4 },
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
    const state = createStore({ number: '' });
    return $(() => {
    return (
      <section class="todoapp">
        <Header todos={todos} />
        <Main todos={todos} />
        <Footer todos={todos} />
          <div id="myModal" class="modal">
              <form class="modal-content">
                  <div class="modal-header">
                      <span className="close" on$:click={() => closeMyDialog()}>&times;</span>
                  </div>
                  <div class="modal-body">
                      <label>Em quanto tempo esta tarefa foi feita?</label>
                      <div>
                          <input type="number" class="input-number" value={state.number}
                          on$:change={() => {
                              const event = useEvent<InputEvent>();
                              const inputValue = (event.target as HTMLInputElement).value;
                              state.number = inputValue
                          }}
                          />
                          <span>tomates</span>
                      </div>
                  </div>
                  <div class="modal-footer">
                      <button type="button"
                              on$:click={() => {
                                saveItem(state.number)
                              }}
                      >
                          Feito
                      </button>
                  </div>
              </form>
          </div>
      </section>
    );
  });
});
