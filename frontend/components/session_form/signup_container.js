import { connect } from 'react-redux';
import { signup, login, receiveErrors } from '../../actions/session_actions';
import SignupForm from './signup_form';

const mapStateToProps = (state) => ({
  errors: state.errors.session,
});

const mapDispatchToProps = (dispatch) => ({
  formAction: (user) => dispatch(signup(user)),
  demoLogin: (user) => dispatch(login(user)),
  receiveErrors: (errors) => dispatch(receiveErrors(errors))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);