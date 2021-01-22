import React from 'react';
import { observer } from 'mobx-react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const AddTodo = observer(({ store }) => (
  <FloatingActionButton
    onTouchTap={(e) => {
      e.preventDefault();
      store.addTodo();
    }}
  >
    <ContentAdd />
  </FloatingActionButton>
));

export default AddTodo;
