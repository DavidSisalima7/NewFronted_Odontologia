import axios from "axios";

export class UserService {

    baseUrl = "http://localhost:8080/usuarios/";

    create(person) {

        return axios.post(this.baseUrl + "signup", person).then(res => res.data);
    }

    readAll() {

        return axios.get(this.baseUrl + "users/list").then(res => res.data);
    }

    update(person) {

        return axios.put(this.baseUrl + "actualizar/" + person.id_usuario, person).then(res => res.data);
    }

    delete(id) {

        return axios.delete(this.baseUrl + "delete/" + id);
    }
}