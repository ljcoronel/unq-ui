import './FormField.css'

const FormField = ({labelText, inputType}) =>{
    return (
        <div class="field-form-container">
            <label for="gog-input" class="form-label">{labelText}</label>
            <input type={inputType} class="gog-input" />
        </div>
    );
}

export default FormField
