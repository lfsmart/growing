import { useId, useState, ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react';
import { ActionFunctionArgs, useNavigation, Form, useSubmit, useHref } from 'react-router-dom';

import { sleep } from '@/tools';

interface TodoListType {
  name: string;
  id: string;
}

export default () =>{ 
  const navigation = useNavigation();
  const submit = useSubmit();
  const [ todoList, setTodoList ] = useState<TodoListType[]>([]);
  const [ name, setName ] = useState<string>( '' );
  const formRef = useRef<HTMLFormElement>( null );

  const handleChage = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)
  
  const handleAdd = () => {
    const id = Date.now().toString(32);
    if( !name ) {
      return 
    }

    const data = { id, name };

    setTodoList([ 
      ...todoList, 
     data
    ]);
    setName( '' );
    submit( { ...data, action: 'delete' }, {
      method: "post",
    });
  }

  const handleEnter = (e: KeyboardEvent) => {
    if( e.code === 'Enter' ){
      handleAdd()
    }
  }

  const handleDelete = (key: string) => {
    setTodoList( 
      todoList.filter( ({ id }) => id !== key ) 
    )
  }

  useEffect(() => {
    console.log( navigation, 'navigation' );
    if (navigation.formData?.get("action") === "add") {
      // setIsAdding(true);
    } else if (navigation.state === "idle") {
      // setIsAdding(false);
      // formRef.current?.reset();
    }
  }, [navigation]);

  return <>
    <ul>
      {
        todoList.map( (item, id) => 
          <li key={ id }>
            <span className='name' style={{ marginRight: 6 }}>{ item.name }</span>
            <button onClick={ () => handleDelete(item.id) }>delete</button>
          </li>
        )
      }
      
    </ul>
    <div>
      {/* <Form method="post" ref={formRef}>
        <input type="hidden" name="action" value="add" />
        <input name="todo"></input>
        <button type="submit">Adding...</button>
      </Form> */}
      <input type="text" onInput={ handleChage } onKeyUp={ handleEnter } value={ name } />
      <button onClick={ handleAdd }>add</button>
    </div>
  </>
} 