// import axios from 'axios';
import ApiRequest from "./ApiRequest";

// const CancelToken = axios.CancelToken;
// const source = CancelToken.source();

/**
 * @param   {String}  endPoint - API endpoint url
 * @param   {?String} method   - Request method
 * @param   {?Object} params   - Request params
 * @return  {Promise}
 */
// const templateFn = (endPoint, method, params = {}, options = {}) => new ApiRequest({ url: endPoint, method, data: params, ...options, cancelToken: source.token }).load();
const templateFn = (endPoint, method, params = {}, options = {}) =>
  new ApiRequest({
    url: 'api' + endPoint,
    method,
    data: params,
    ...options
  }).load();

export default class Api {
  /**
   * @return {Promise}
   */

  /* GET REQUESTS */

  static getUsers(params) {
    return templateFn(`/users${params}`, ApiRequest.METHOD_GET, {});
  }

  static getUserById(userId) {
    return templateFn(`/users/${userId}`, ApiRequest.METHOD_GET, {});
  }

  static getCurrentUser() {
    return templateFn('/me', ApiRequest.METHOD_GET, {});
  }
  
  static getDayRoutines(params) {
    return templateFn(`/day_routines${params}`, ApiRequest.METHOD_GET, {});
  }

  static getCars(params) {
    return templateFn(`/cars${params}`, ApiRequest.METHOD_GET, {});
  }

  static getCarById(carId) {
    return templateFn(`/cars/${carId}`, ApiRequest.METHOD_GET, {});
  }

  static getDayRoutines(params) {
    return templateFn(`/day_routines${params}`, ApiRequest.METHOD_GET, {});
  }

  static getDayRoutineById(dayRoutineId) {
    return templateFn(`/day_routines/${dayRoutineId}`, ApiRequest.METHOD_GET, {});
  }

  static getVehicleDamageById(vehicleDamageId) {
    return templateFn(`/vehicle_damages/${vehicleDamageId}`, ApiRequest.METHOD_GET, {});
  }

  /* POST REQUESTS */

  static postCar(params) {
    return templateFn(`/cars`, ApiRequest.METHOD_POST, params);
  }

  static postUser(params) {
    return templateFn(`/users`, ApiRequest.METHOD_POST, params);
  }

  static postDayRoutine(params) {
    return templateFn(`/day_routines`, ApiRequest.METHOD_POST, params);
  }

  /* PUT REQUESTS */

  static putCar(id, params) {
    return templateFn(`/cars/${id}`, ApiRequest.METHOD_PUT, params);
  }

  static putUser(id, params) {
    return templateFn(`/users/${id}`, ApiRequest.METHOD_PUT, params);
  }

  static putDayRoutine(id, params) {
    return templateFn(`/day_routines/${id}`, ApiRequest.METHOD_PUT, params);
  }

  /* DELETE REQUEST */

  static deleteCar(id) {
    return templateFn(`/cars/${id}`, ApiRequest.METHOD_DELETE, {})
  }

  static deleteUser(id) {
    return templateFn(`/users/${id}`, ApiRequest.METHOD_DELETE, {})
  }

  static deleteDayRoutine(id) {
    return templateFn(`/day_routines/${id}`, ApiRequest.METHOD_DELETE, {})
  }

  static deleteVehicleDamage(id) {
    return templateFn(`/vehicle_damages/${id}`, ApiRequest.METHOD_DELETE, {})
  }

}
