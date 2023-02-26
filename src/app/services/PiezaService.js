import axios from 'axios';


export class PiezaService {
   baseUrl = "http://localhost:8080/api/pieza/";

   getAll() {
      return axios.get(this.baseUrl + "listar").then(res => res.data);
   }
   save(pieza) {
      return axios.post(this.baseUrl + "crear", pieza).then(res => res.data);
   }
   // /eliminar/{id}
   delete(id) {
      return axios.delete(this.baseUrl + "eliminar/" + id)
   }
   update(pieza){
      return axios.put(this.baseUrl+"actualizar/"+pieza.id_pieza,pieza).then(res=>res.data);
  }
};

