import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:5000/api/auth',
      withCredentials: false,
    });
    this.service = service;
  }


  currentUser = () =>{
    return this.service.get('/getcurrentuser')
    .then(response => response.data)
  }



}

export default AuthService;