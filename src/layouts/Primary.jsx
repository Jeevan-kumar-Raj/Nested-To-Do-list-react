import React from 'react';
import { observer } from 'mobx-react';

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';

import Footer from '../components/Footer';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';


const styles = {
  container: {
    textAlign: 'left',
    padding: 0,
//    height: '100%',
  },
  paper: {
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
    position: 'relative',
    margin: 20,
    marginBottom: 200,
    height: '100%',
    minWidth: '460px',
    maxWidth: '800px',
    minHeight: '510px',
  },
  contentBody: {
    minHeight: '510px',
  },
  todoList: {

  },
  footerArea: {
    padding: 0,
    bottom: '0px',
    left: '0px',
    right: '0px',
    width: '100%',
  },
  addButton: {
    textAlign: 'right',
    bottom: '0px',
    right: '0px',
    margin: '40px',
    marginRight: '50px',
  },
};


@observer class Primary extends React.Component {

  render() {
    return (
      <div style={styles.container}>
        <Paper style={styles.paper} zDepth={4}>
          <div style={styles.contentBody}>
            <AppBar
              title="Nested To-Do List"
              iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
          
            <TodoList store={this.props.store} style={styles.todoList} />
          </div>
          <div style={styles.footerArea}>
            <div style={styles.addButton}>
              <AddTodo store={this.props.store} />
            </div>
            <Footer store={this.props.store} />
          </div>
        </Paper>
      </div>
    );
  }
}

export default Primary;
