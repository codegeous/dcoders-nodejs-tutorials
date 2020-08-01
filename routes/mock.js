var router = require("express").Router();
var faker = require("faker");

router.get("/data", async (req, res, next) => {
    let users = [];
    let totalItems = parseInt(req.query.total) || 1;

    if (totalItems > 1000) {
        totalItems = 1000;
    }

    for (let i = 1; i <= totalItems; i++) {
        users.push({
            id: i,
            name: faker.name.firstName() + " " + faker.name.lastName(),
            uname: faker.internet.userName(),
            email: faker.internet.email(),
            phone: faker.phone.phoneNumber(),
            dob: faker.date.past(),
            url: faker.internet.url(),
            pic: faker.image.imageUrl(),
            avatar: faker.internet.avatar(),
            company: `${faker.company.companyName()} - ${faker.company.catchPhrase()}`,
            address: `${faker.address.streetName()}, ${faker.address.city()}, ${faker.address.country()}, ZIP - ${faker.address.zipCode()}`,
        });
    }

    res.json({ users });
});

module.exports = router;
