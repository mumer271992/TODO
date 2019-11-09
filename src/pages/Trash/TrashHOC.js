import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Trash from './Trash';

const mapStateToProps = (state) => {
  const { todos } = state;
  const list = todos.list.filter(item => item.deleted_at);
  return {
    list,
  }
}

export default withRouter(connect(mapStateToProps, null)(Trash));
