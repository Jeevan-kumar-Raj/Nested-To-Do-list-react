import { observable, computed, action, toJS } from 'mobx';

let nextTodoId = 0;

class TodoNode {
  // When this is the root node, it is not displayed. Its children are what
  // constitute the primary level of "Todos"
  @observable text;
  @observable id;
  @observable completed;
  @observable getsFocus = false;
  @observable parent;
  @observable children = [];
  // @observable depth;  // set only when the tree is returned for display.

  @computed get isRoot() {
    return (typeof toJS(this.parent) === 'undefined');
  }

  // the index of this node in its parent array
  @computed get index() {
    if (this.isRoot) {
      return undefined;
    }
    // is there any advantage to doing (n === this) versus (n.id === this.id) ?
    const result = this.parent.children.findIndex(node => node === this);
    return result;
  }

  // returns the previous node in the current depth's list.
  @computed get previous() {
    if (this.index === 0) {
      return undefined;
    }
    return this.parent.children[this.index - 1];
  }

  // do I need @computed get depth() ??
  @computed get depth() {
    let n = this;
    let d = 0;
    while (!n.isRoot) {
      n = n.parent;
      d += 1;
    }
    return d;
  }

  // Mark all children nodes the same value as this one recursively
  @action.bound
  setStatus(newStatus) {
    this.completed = newStatus;
    for (const c of this.children) {
      c.setStatus(newStatus);
    }
  }

  @action.bound
  toggle() {
    let nextHigherNode;
    this.setStatus(!this.completed);
    
    if (this.completed === false) {
      nextHigherNode = this.parent;

      while (
        nextHigherNode.completed === true
        && !nextHigherNode.isRoot) {
        nextHigherNode.completed = false;
        nextHigherNode = nextHigherNode.parent;
      }
    }
  }

  @action.bound
  update(text) {
    this.text = text;
  }

  @action.bound
  delete() {
    this.parent.children.remove(this);
  }

  @action.bound
  indent() {
    if (!this.previous) {
      return;
    }
    const currentParent = this.parent;
    const newParent = this.previous;

    newParent.children.push(this);
    currentParent.children.remove(this);
    this.parent = newParent;
  }

  @action.bound
  unindent() {
    if (this.parent.isRoot) {
      return;
    }
    const currentParent = this.parent;
    const newParent = this.parent.parent;

    // insert this in just after the current parent.
    newParent.children.splice(currentParent.index + 1,
                              0,
                              this);
    currentParent.children.remove(this);
    this.parent = newParent;
  }

  @action.bound
  moveUp() {
    if (this.index === 0) {
      return;
    }
    const a = this.parent.children;
    const i = this.index;
    [a[i - 1], a[i]] = [this, a[i - 1]];
  }

  @action.bound
  moveDown() {
    if (this.index >= this.parent.children.length - 1) {
      return;
    }
    const a = this.parent.children;
    const i = this.index;
    [a[i + 1], a[i]] = [this, a[i + 1]];
  }

  constructor(parent = undefined, text = '') {
    this.text = text;
    this.id = nextTodoId;
    nextTodoId += 1;
    this.completed = false;
    this.parent = parent;
  }
}

export default TodoNode;
