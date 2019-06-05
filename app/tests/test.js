// Import the dependencies for testing
import chai from 'chai';
// import chaiHttp from 'chai-http';
import app from '../server';

// Configure chai
// chai.use(chaiHttp);
chai.should();
describe("Orgs", () => {
    describe("GET /", () => {
        // Test to get all students record
        it("should get all orgs on record", (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        // // Test to get single student record
        // it("should get a single student record", (done) => {
        //     const id = 1;
        //     chai.request(app)
        //         .get(`/${id}`)
        //         .end((err, res) => {
        //             res.should.have.status(200);
        //             res.body.should.be.a('object');
        //             done();
        //         });
        // });

        // // Test to get single student record
        // it("should not get a single student record", (done) => {
        //     const id = 5;
        //     chai.request(app)
        //         .get(`/${id}`)
        //         .end((err, res) => {
        //             res.should.have.status(404);
        //             done();
        //         });
        // });
    });
});