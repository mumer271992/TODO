import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Completed from './Completed';
import constants from '../../helpers/constants';

const mapStateToProps = (state) => {
  const { todos } = state;
  const list = todos.list.filter(item => !item.deleted_at && item.status === constants.status.completed);
  return {
    list,
  }
}

export default withRouter(connect(mapStateToProps, null)(Completed));
