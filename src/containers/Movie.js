import { connect } from 'react-redux';
import Movie from '../components/Movie';

export function mapStateToProps({ movie }) {
  return {
    info: movie,
  };
}

export function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Movie);
