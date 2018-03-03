/**
 * Created by tarva on 2.11.2017.
 */

const BASE_URL = "http://localhost:8080/projects";

/**
 * Helper class for backend URLs.
 */
export default class BaseURL {
    static base = BASE_URL;
    static singleProject = BASE_URL + "/{1}";
    static singleProjectChecklist = BASE_URL + "/{1}/checklist-items";
}