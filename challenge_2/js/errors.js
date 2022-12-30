export default class Errors {
    constructor(elementId)
    {
        this.box = elementId;
    }

    handleError(error) {
        const status = error.status;
        this.displayError(error);
    }

    displayError(message) {
        console.log(message);

        const divError = `
        <div id="box-error">
        <p>
        ${message}
        </p>
        </div>`;

        return divError;
    }
}