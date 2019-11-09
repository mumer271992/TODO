import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreateOrEdit from './CreateOrEdit';

import { createTodo, updateTodo } from '../../actions/todos';

const mapStateToProps = (state, props) => {
  const uuid = props.match.params.id;
  console.log(props);
  console.log("Route param: ", uuid);
  const todo = state.todos.list.find(item => item.uuid === uuid);
  console.log(state.todos.list);
  console.log(todo);
  return {
    todo,
  } 
};

const mapDispatchToProps = dispatch => ({
  createTodo: (todo) => dispatch(createTodo(todo)),
  updateTodo: (uuid, todo) => dispatch(updateTodo(uuid, todo)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateOrEdit));
