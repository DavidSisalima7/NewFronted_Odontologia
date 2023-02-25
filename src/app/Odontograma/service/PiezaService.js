import axios from 'axios';


export class PiezaService {
   baseUrl="http://localhost:8080/api/pieza/";
   
   getAll(){
        return axios.get(this.baseUrl + "listar").then(res => res.data);
   }
   async save(pieza){
    const res = await axios.post(this.baseUrl + "crear", pieza);
       return res.data;
   }
};

