const sessionIdTOUserMap = new Map();

function setUser(id, user){
    sessionIdTOUserMap.set(id, user)
}

function getUser(id){
    return sessionIdTOUserMap.get(id);
}

module.exports = {
    getUser,
    setUser
}