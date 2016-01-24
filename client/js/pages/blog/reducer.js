const LOADALL   = 'my-app/widgets/LOADALL';
const LOAD   = 'my-app/widgets/LOAD';
const CREATE = 'my-app/widgets/CREATE';
const UPDATE = 'my-app/widgets/UPDATE';
const REMOVE = 'my-app/widgets/REMOVE';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    // do reducer stuff
    default: return state;
  }
}

export function loadWidgets() {
  return { type: LOADALL };
}

export function loadWidget(id) {
  return { type: LOAD, id };
}

export function createWidget(widget) {
  return { type: CREATE, widget: widget };
}

export function updateWidget(widget) {
  return { type: UPDATE, widget: widget };
}

export function removeWidget(id) {
  return { type: REMOVE, id };
}

