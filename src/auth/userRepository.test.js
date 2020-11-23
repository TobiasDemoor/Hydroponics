const User = require('../models/User');
const { saveUser, getUser } = require('./userRepository');
const user = new User("asdfasf", "adfadf");

it('saves and get proper user', async () => {
    await saveUser(user);
    const recov = await getUser();
    expect(new User(recov.username, recov.password, recov.salt)).toMatchObject(user);
})