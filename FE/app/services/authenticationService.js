import httpRequest from 'helper/httpRequest';

class AuthService {
  getUserInfo = async () => {
    const response = await httpRequest.get('me');
    return response;
  }
}

export default new AuthService()