import axios from './Axios';
// import store from '../../store/index';
import router from '../../router/index'
import store from '@/store';

export default class ApiRequest {
  /**
   * @param {Object} options
   */
  constructor(options = {}) {
    this.options = {
      url: '',
      method: ApiRequest.METHOD_POST,
      data: null
    };
    this.headers = {};
    Object.assign(this.options, options);
    Object.assign(this.headers, options.headers);
  }

  static get METHOD_GET() {
    return 'GET';
  }
  static get METHOD_HEAD() {
    return 'HEAD';
  }
  static get METHOD_POST() {
    return 'POST';
  }
  static get METHOD_PUT() {
    return 'PUT';
  }
  static get METHOD_DELETE() {
    return 'DELETE';
  }
  static get METHOD_CONNECT() {
    return 'CONNECT';
  }
  static get METHOD_OPTIONS() {
    return 'OPTIONS';
  }
  static get METHOD_TRACE() {
    return 'TRACE';
  }
  static get METHOD_PATCH() {
    return 'PATCH';
  }

  
  /**
   * @return {Promise}
   */
  load() {
    const { options } = this;
    options.headers = this.headers;

    axios.interceptors.response.use(null, error => {

      return Promise.reject(error);
    });

    return axios(options);
  }
}