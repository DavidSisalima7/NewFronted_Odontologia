import axios from "axios";

export class RolService {

    baseUrl = "http://localhost:8080/api/rol/";

    create(person) {

        return axios.post(this.baseUrl + "crear", person).then(res => res.data);
    }

    readAll() {

        return axios.get(this.baseUrl + "listar").then(res => res.data);
    }

    update(rol) {

        return axios.put(this.baseUrl + "actualizar/" + rol.rolId, rol).then(res => res.data);
    }
}