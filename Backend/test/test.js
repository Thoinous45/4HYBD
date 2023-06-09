process.env.NODE_ENV = "test";
let mongoose = require("mongoose");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server/server");
const { beforeEach } = require("mocha");
chai.should();
chai.use(chaiHttp);


describe("Users", () => {
  describe("/POST register", () => {
    it("it should not POST a user without email field", (done) => {
      let user = {
        pseudo: "test",
        password: "password",
        password_confirmation: "password",
      };
      chai
        .request(server)
        .post("/api/users/signup")
        .send(user)
        .end((err, res) => {
          res.should.have.status(406);
          res.should.be.a("object");
          res.body.should.have.property("err");
          res.body.should.have
            .property("msg")
            .eql("veuillez vérifier votre email/password");
          done();
        });
    });

    it("it should not POST a user without password field", (done) => {
      let user = {
        pseudo: "test",
        email: "test@email.com",
        password_confirmation: "password",
      };
      chai
        .request(server)
        .post("/api/users/signup")
        .send(user)
        .end((err, res) => {
          res.should.have.status(406);
          res.should.be.a("object");
          res.body.should.have.property("err");
          res.body.should.have
            .property("msg")
            .eql("veuillez vérifier votre email/password");
          done();
        });
    });

    it("it should not POST a user without password_confirmation field", (done) => {
      let user = {
        pseudo: "test",
        email: "test@email.com",
        password: "password123!",
      };
      chai
        .request(server)
        .post("/api/users/signup")
        .send(user)
        .end((err, res) => {
          res.should.have.status(406);
          res.should.be.a("object");
          res.body.should.have.property("err");
          res.body.should.have
            .property("msg")
            .eql("veuillez vérifier votre email/password");
          done();
        });
    });

    it("it should not POST a user without pseudo field", (done) => {
      let user = {
        email: "test.email.com",
        password: "password123!",
        password_confirmation: "password123!",
      };
      chai
        .request(server)
        .post("/api/users/signup")
        .send(user)
        .end((err, res) => {
          res.should.have.status(406);
          res.should.be.a("object");
          res.body.should.have.property("err");
          res.body.should.have
            .property("msg")
            .eql("veuillez vérifier votre email/password");
          done();
        });
    });

    it("it should not POST a user with wrong email", (done) => {
      let user = {
        pseudo: "test",
        email: "test.email.com",
        password: "password123!",
        password_confirmation: "password123!",
      };
      chai
        .request(server)
        .post("/api/users/signup")
        .send(user)
        .end((err, res) => {
          res.should.have.status(406);
          res.should.be.a("object");
          res.body.should.have.property("err");
          res.body.should.have
            .property("msg")
            .eql("veuillez vérifier votre email/password");
          done();
        });
    });

    it("it should not POST a user with wrong password", (done) => {
      let user = {
        pseudo: "test",
        email: "test.email.com",
        password: "pass",
        password_confirmation: "pass",
      };
      chai
        .request(server)
        .post("/api/users/signup")
        .send(user)
        .end((err, res) => {
          res.should.have.status(406);
          res.should.be.a("object");
          res.body.should.have.property("err");
          res.body.should.have
            .property("msg")
            .eql("veuillez vérifier votre email/password");
          done();
        });
    });

    it("it should not POST a user with wrong password_confirmation", (done) => {
      let user = {
        pseudo: "test",
        email: "test.email.com",
        password: "password123!",
        password_confirmation: "pass",
      };
      chai
        .request(server)
        .post("/api/users/signup")
        .send(user)
        .end((err, res) => {
          res.should.have.status(406);
          res.should.be.a("object");
          res.body.should.have.property("err");
          res.body.should.have
            .property("msg")
            .eql("veuillez vérifier votre email/password");
          done();
        });
    });

    it("it should register a user", (done) => {
      let user = {
        email: "tes@email.com",
        password: "Password1234!",
        password_confirmation: "Password1234!",
        firstname: "testeee",
        lastname: "testeee",
      };
      chai
        .request(server)
        .post("/api/users/signup")
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.not.have.property("err");
          res.body.should.have.property("message").eql("Utilisateur créé !");
          done();
        });
    });
  });


  //login

  describe("/POST login", () => {
    it("it should GET login (userId + token)", (done) => {
      let user = {
        email: "test1@email.com",
        password: "password123!",
      };
      chai
        .request(server)
        .post("/api/users/login")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.not.have.property("err");
          res.body.should.have.property("token");
          testToken = res.body.token;
          testUserId = res.body.userId;
          done();
        });
    });

    it("it should not GET login with wrong email", (done) => {
      let user = {
        email: "test.email.com",
        password: "password123!",
      };
      chai
        .request(server)
        .post("/api/users/login")
        .send(user)
        .end((err, res) => {
          res.should.have.status(406);
          res.body.should.be.a("object");
          res.body.should.have.property("err");
          res.body.should.have
            .property("msg")
            .eql("veuillez vérifier votre email/password");
          done();
        });
    });

    it("it should not GET login with wrong password", (done) => {
      let user = {
        email: "test1@email.com",
        password: "pass",
      };
      chai
        .request(server)
        .post("/api/users/login")
        .send(user)
        .end((err, res) => {
          res.should.have.status(406);
          res.body.should.be.a("object");
          res.body.should.have.property("err");
          res.body.should.have
            .property("msg")
            .eql("veuillez vérifier votre email/password");
          done();
        });
    });
    
    /**
     * Test the /PUT route
     */

    describe("/PUT user", () => {
      it("it should not PUT a user with wrong token", (done) => {
        let moduser = {
          password: "password123!",
          password_confirmation: "password123!",
        };

        chai
          .request(server)
          .put("/api/users/modify/" + testUserId)
          .set({ Authorization: `Bearer ${testToken}1` })
          .send(moduser)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a("object");
            res.body.should.have
              .property("message")
              .eql("token invalide ou inexistant");
            done();
          });
      });

      //need to be delete to active next test
    });

   
  
    it("it should PUT a user", (done) => {
      let moduser = {
        password: "password123!",
        password_confirmation: "password123!",
      };

      chai
        .request(server)
        .put("/api/users/modify/" + testUserId)
        .set({ Authorization: `Bearer ${testToken}` })
        .send(moduser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.not.have.property("err");
          res.body.should.have.property("message").eql("Utilisateur modifié !");
          done();
     });   
    });
  });
  
    /**
     * Test the /Get route
     */

    describe("/GET user", () => {
      it("it should GET a user with token", (done) => {
        chai
          .request(server)
          .get("/api/users/" + testUserId)
          .set({ Authorization: `Bearer ${testToken}` })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.not.have.property("err");
            res.body.should.have.property("pseudo");
            res.body.should.have.property("email");
            res.body.should.have.property("_id");
            done();
          });
      });

      it("it should not GET a user with wrong token", (done) => {
        let user = {
          email: "test1@email.com",
          password: "password123!",
        };
        chai
          .request(server)
          .post("/api/users/login")
          .send(user)
          .end((err, res) => {
            chai
              .request(server)
              .get("/api/users/" + testUserId)
              .set({ Authorization: `Bearer ${testToken}1` })
              .end((err, res) => {
                res.should.have.status(500);
                done();
              });
          });
      });

      it("it should not GET a user with wrong id", (done) => {
        let user = {
          email: "test1@email.com",
          password: "password123!",
        };
        chai
          .request(server)
          .post("/api/users/login")
          .send(user)
          .end((err, res) => {
            chai
              .request(server)
              .get("/api/users/" + testUserId + "1")
              .set({ Authorization: `Bearer ${testToken}` })
              .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a("object");
                res.body.should.have
                  .property("message")
                  .eql("erreur serveur ou identifiant invalide");
                done();
              });
          });
      });
    });

    /**
     * Test the /DELETE route
     */

    describe("/DELETE user", () => {
      it("it should not DELETE a user with wrong token", (done) => {
        chai
          .request(server)
          .delete("/api/users/delete/" + testUserId)
          .set({ Authorization: `Bearer ${testToken}1` })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a("object");
            res.body.should.have
              .property("message")
              .eql("token invalide ou inexistant");
            done();
          });
      });

      //delete user test done at the end to keed token and user id alive during all tests

      it("it should DELETE a user", (done) => {
        chai
          .request(server)
          .delete("/api/users/delete/" + testUserId)
          .set({ Authorization: `Bearer ${testToken}` })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.not.have.property("err");
            res.body.should.have
              .property("message")
              .eql("utilisateur supprimé");
            done();
          });
      });
    });
  });

