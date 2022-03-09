import { component$, createStore, $, useEvent } from '@builder.io/qwik';
import { addItem, Todos } from '../../state/state';

/**
 * Header component which is responsible for providing UI to ender new todo item.
 *
 * This component only rerenders if the user interacts with it through the input.
 */
export const Header = component$(
  (props: { todos: Todos }) => {
    const state = createStore({ text: '' });
    return $(() => {
      return (
        <>
          <h1>ToDo</h1>
            <div class="input-wrapper">
          <input
            class="new-todo"
            placeholder="O que precisa ser feito?"
            autoFocus
            value={state.text}
            on$:keyup={() => {
              const event = useEvent<KeyboardEvent>();
              const inputValue = (event.target as HTMLInputElement).value;
              state.text = inputValue;
              if (event.key === 'Enter' && inputValue) {
                addItem(props.todos, state.text, 'hábito');
                state.text = '';
              }
            }}
          />
            <button type="button" on$:click={() => console.log('tarefa')}>Tarefa</button>
            <button type="button" on$:click={() => console.log('hábito')}>Hábito</button>
            </div>
        </>
      );
    });
  },
  {
    tagName: 'header',
  }
);
