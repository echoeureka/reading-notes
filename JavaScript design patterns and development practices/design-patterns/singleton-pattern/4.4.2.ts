const User = (() => {
  const _name = 'Ryan Moyo'
  const _age = 20

  return {
    getUserInfo: () => `${_name} - ${_age}`
  }
})()

console.log(User.getUserInfo()) // Ryan Moyo - 20
