const data = require('../data')

function makeLowerCase(field){
    field=field.toLowerCase();
}

module.exports = {
    getUserById: async function(id){
        console.log(`getUserById called with id: ${id}`);
        return data.getUserByID(id);
    },

    getUsersByAge: async function(age) {
        console.log(`getUsersByAge called with age: ${age}`);
        return data.getUsersByAge(age);
    },

    getUsersByCountry: async function(country) {
        console.log(`getUsersByCountry called with country: ${country}`);
        return data.getUsersByCountry(country);
    },

    getUsersByName: async function(name) {
        console.log(`searchUsersByName called with name: ${name}`);
        return data.getUsersByName(name);
    },

    deleteUser: async function(id) {
        console.log(`deleteUser called with id: ${id}`);
        data.deleteUser(id);
        return;
    }
}