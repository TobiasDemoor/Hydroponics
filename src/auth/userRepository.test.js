const User = require('./User');
const { saveUser, getUser } = require('./userRepository');
const user = new User("asdfasf", "adfadf");

it('saves and get proper user', async done => {
    await saveUser(user);
    const recov = await getUser()
        .then(({ username, password, salt }) =>
            new User(username, password, salt)
        );
    expect(recov).toMatchObject(user);
    done();
})