/**
 * Created by tarva on 31.10.2017.
 */
export default class HttpCall {

    /**
     * Make GET request
     *
     * @param url - URL
     * @param callback - callback function
     */
    static get(url, callback) {
        this.apiCall(url, "GET", callback, null);
    }

    /**
     * Make POST request
     *
     * @param url - URL
     * @param callback - callback function
     * @param data - data as JSON
     */
    static post(url, callback, data) {
        this.apiCall(url, "POST", callback, data);
    }

    /**
     * Make PUT request
     * @param url - URL
     * @param callback - callback function
     * @param data - data as JSON
     */
    static put(url, callback, data) {
        this.apiCall(url, "PUT", callback, data);
    }

    /**
     * Make PUT request
     * @param url - URL
     * @param callback - callback function
     */
    static delete(url, callback) {
        this.apiCall(url, "DELETE", callback);
    }

    /**
     * Make raw api call. Please use either get, put, post, delete instead.
     * @param url - URL
     * @param method - request method
     * @param callback - callback function
     * @param data - data as JSON
     */
    static apiCall(url, method, callback, data) {
        //Log.logJSFProd("A.apiCall"); // does this need anything else? depends

        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        let init = {method: method, headers: headers};
        if (data !== null) {
            init.body = JSON.stringify(data);
        }

        let req = new Request(url, init);

        fetch(req).then(response => {
            if (method === "DELETE") return response;
            return response.json();
        }).then(data => {
            callback(data);
        });
    }
}