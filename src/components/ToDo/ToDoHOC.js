import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToDo from './ToDo';
import { updateTodo } from '../../actions/todos';

const mapDispatchToProps = dispatch => ({
  updateTodo: (uuid, todo) => dispatch(updateTodo(uuid, todo)),
});

export default withRouter(connect(null, mapDispatchToProps)(ToDo));
