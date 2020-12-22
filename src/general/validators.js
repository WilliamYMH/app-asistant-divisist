export const isEmpty = (str) => {
    if (str !== undefined && str !== null) {
        if(str == '*') {
            alert('Dato invalido, porfavor ingrese otro valor diferente a: *')
            return true;
        }
        str = str.toString();
        return !str.replace(/^\s+/g, '').length;
    }
    return true;
};