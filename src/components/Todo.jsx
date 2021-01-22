import React from 'react';
import { observer } from 'mobx-react';

import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import { ListItem } from 'material-ui/List';


const iconStyles = {
  margin: 5,
};

const INDENT_SIZE = 25;


@observer class Todo extends React.Component {

  // Give focus to the most recently created todo item.
  componentDidMount() {
    this.textFieldRef.focus();
  }

  componentDidUpdate() {
    const { node } = this.props;
    if (node.getsFocus) {
      this.textFieldRef.focus();
      node.getsFocus = false;
    }
  }

  render() {
    const {
      addAfter,
      completed,
      deleteSelf,
      depth,
      focusNode,
      getsFocus,
      id,
      indent,
      moveDown,
      moveUp,
      node,
      text,
      toggle,
      unindent,
      update,
    } = this.props;

    // the (non displaying) root node is depth 0. first non-indented level
    // is at depth 1.
    const marginLeft = `${(depth - 1) * INDENT_SIZE}pt`;

    // It's important for the interface to function correctly to handle
    // both keydown and keyup. In the case of tab, for example, if you just
    // handle keydown, keyup will still cause the browser to advance focus
    // to the next element.
    const handleKeyPress = (e) => {
      // console.log('Text field keyUp key: ', e.which);
      switch (e.which) {
        case 13:  // enter
          e.preventDefault();
          if (e.type === 'keydown') {
            addAfter();
          }
          break;
        case 8:
          // backspace (often labeled 'delete').
          // Only deletes the todo if the text field is empty.
          if (text.length === 0) {
            e.preventDefault();
            if (e.type === 'keydown') {
              focusNode(id, -1);
              deleteSelf();
            }
          }
          break;
        case 9:
          if (!e.shiftKey) {  // tab
            e.preventDefault();
            if (e.type === 'keydown') {
              indent();
            }
            break;
          } else {  // shift+tab
            e.preventDefault();
            if (e.type === 'keydown') {
              unindent();
            }
            break;
          }
        case 38:  // up arrow
          if (e.metaKey) {  // Cmd+up / Meta+up
            e.preventDefault();
            if (e.type === 'keydown') {
              moveUp();
            }
          } else {
            e.preventDefault();
            if (e.type === 'keydown') {
              // set focus on the previous node in the visible list.
              focusNode(id, -1);
            }
          }
          break;
        case 40:  // down arrow
          if (e.metaKey) {  // Cmd+up / Meta+up
            e.preventDefault();
            if (e.type === 'keydown') {
              moveDown();
            }
          } else {
            e.preventDefault();
            if (e.type === 'keydown') {
              focusNode(id, 1);
            }
          }
          break;
        default:
          break;
      }
    };

    return (
      <ListItem
        disabled
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          padding: '3px',
          alignItems: 'center',
          marginLeft,
        }}
      >
        <Checkbox
          name=""
          label=""
          checked={completed}
          onClick={toggle}
          style={{
            display: 'inline-block',
            width: '',
            margin: '0',
            marginLeft: 10,
            verticalAlign: 'center',
          }}
        />
        <TextField
          hintText=""
          id={`${node.id}textfield`}
          fullWidth={false}
          value={text}
          ref={(input) => { this.textFieldRef = input; }}
          disabled={completed}
          onChange={(e, newValue) => update(newValue)}
          onKeyDown={handleKeyPress.bind(this)}
          onKeyUp={handleKeyPress.bind(this)}
          style={{
            margin: 0,
            display: 'inline-block',
            flexGrow: 2,
          }}
        />
        <IconButton
          onTouchTap={() => {
            focusNode(id, -1);
            deleteSelf();
          }}
          tooltip="Delete Todo"
        >
          <FontIcon className="material-icons" style={iconStyles} >delete</FontIcon>
        </IconButton>
      </ListItem>
    );
  }
}

export default Todo;
