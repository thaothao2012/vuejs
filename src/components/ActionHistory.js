/* eslint-disable no-debugger */
import { pull } from 'lodash';

class ActionHistory {
  stateListeners = [];
  undoStack = [];
  redoStack = [];
  allState = [];
  // circlesById = {};
  // undoable = false;
  // redoable = false;

  // constructor() {
    // const initialState = {
    //   circlesById: [],
    //   undoable: false,
    //   redoable: false
    // }
    // this.state = initialState
  // }

  onNewState = listener => {
    this.stateListeners.push(listener);
    this.notify();
    return () => pull(this.stateListeners, listener);
  };

  // notify = () => {
  //   const payload = {
  //     state: this.state,
  //     undoable: this.undoStack.length > 0,
  //     redoable: this.redoStack.length > 0
  //   };
  //   this.stateListeners.forEach(fn => fn(payload));
  // };

  nextState = state => {
    debugger;
    this.undoStack.push(this.state);
    this.state = state;
    this.redoStack = [];
    // eslint-disable-next-line no-console
    console.log('this.undoStack', this.undoStack);
    // return this.state;
  };

  undo = () => {
    debugger;
    if (this.undoStack.length === 0) return;
    const current = this.state;
    // this.state = this.undoStack.pop();
    this.undoStack.pop();
    const stackLeng = this.undoStack.length;
    this.state = this.undoStack[stackLeng-1];
    this.redoStack.push(current);
    // this.notify();
    return this.state;
  };

  redo = () => {
    if (this.redoStack.length === 0) return;
    const current = this.state;
    this.state = this.redoStack.pop();
    this.undoStack.push(current);
    // this.notify();
    return this.state;
  };
}

export default ActionHistory;


[
  {
    "circlesById": [],
    "undoable": false,
    "redoable": false
  },

  {
    "circlesById": [
      { "id": 1, "x": 362, "y": 60, "r": 20 },
      { "id": 2, "x": 269, "y": 76, "r": 20 },
      { "id": 3, "x": 206, "y": 112, "r": 20 },
      { "id": 4, "x": 167, "y": 86, "r": 20 },
      { "id": 5, "x": 109, "y": 66, "r": 20 }
    ],
    "undoable": true,
    "redoable": false
  },
  {
    "circlesById": [
      { "id": 1, "x": 362, "y": 60, "r": 20 },
      { "id": 2, "x": 269, "y": 76, "r": 20 },
      { "id": 3, "x": 206, "y": 112, "r": 20 },
      { "id": 4, "x": 167, "y": 86, "r": 20 },
      { "id": 5, "x": 109, "y": 66, "r": 20 }
    ],
    "undoable": true,
    "redoable": false
  },
  {
    "circlesById": [
      { "id": 1, "x": 362, "y": 60, "r": 20 },
      { "id": 2, "x": 269, "y": 76, "r": 20 },
      { "id": 3, "x": 206, "y": 112, "r": 20 },
      { "id": 4, "x": 167, "y": 86, "r": 20 },
      { "id": 5, "x": 109, "y": 66, "r": 20 }
    ],
    "undoable": true,
    "redoable": false
  }
]