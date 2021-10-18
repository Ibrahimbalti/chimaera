const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/Users");
const appConfig = require("../config/config");
const uuid = require("uuid/v4");
const stripe = require("stripe")(appConfig.stripePrivateKey);
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(appConfig.sendgridApiKey);

module.exports = {
  cardProvider: async function(req, res) {
    try {
      req.user.emailProvider = !req.user.emailProvider;
      req.user.save();
      res.json(req.user);
    } catch (e) {
      res.status(500).json({ err: "Internal error" });
    }
  },
  account: async function(req, res) {
    try {
      req.user.full_colored_button = false;
      req.user.hide_icons = false;
      req.user.hide_sponsore = false;
      req.user.rounded_corner = false;
      req.user.layout = "vertical";
      req.user.hide_chimaera = false;
      req.user.account_type = "user";
      req.user.premium = 0;
      req.user.save();
      res.json(req.user);
    } catch (e) {
      res.status(500).json({ err: "Internal error" });
    }
  },
  recoverEmail: async (req, res) => {
    try {
      const user = await userModel.findOne({ email: req.body.email });
      const secondUser = await userModel.findOne({
        email: req.body.second_email
      });
      if (!user) {
        return res.status(404).json({ err: "User Not Found!" });
      }
      if (secondUser && secondUser.email === user.email) {
        return res.status(200).json({
          secondEmail: false,
          msg: "This email is registered by you."
        });
      }
      if (secondUser) {
        return res.status(200).json({
          secondEmail: false,
          msg: "This email used by another user."
        });
      }

      const palyload = {
        id: user.id,
        userName: user.userName,
        email: user.email,
        second_email: req.body.second_email
      };
      const token = jwt.sign(palyload, appConfig.secretOrKey, {
        expiresIn: "1h"
      });
      var mailOptions = {
        from: "support@chimaera.co",
        to: req.body.email,
        subject: "Sending Email From Chimaera",
        html: `<div
        style="min-height: 60vh;text-align: center;color: #000000; display: table;width: 100%;"
      >
        <div
          style="display: table-cell; vertical-align: middle; text-align: center; width: 100%;"
        >
        <img src="https://i.ibb.co/N2hJ8Ct/with-text.png" alt="Chimaera logo" style="width: 20%; margin:20px auto;">
          <p style="font-size: 18px;">
            You are requested to change your Chimaera email. Please click here to
            change email
          </p>
          <a
            href=${appConfig.hostURL}/change-email/${token}
            target="_blank"
            style="color: #000000;padding: 5px 20px;background-color: #FE0000; border: 2px solid #000000;font-size: 18px; font-weight: bold;border-radius: 5px;"
          >
            Change Email
          </a>
        </div>
      </div>`

        // `<p>You are requested to change your Chimaera email. Please follow the link: ${appConfig.hostURL}/change-email/${token}</p>`
      };
      sgMail.send(mailOptions);
      res.status(200).json();
    } catch (e) {
      res.status(400).json(e);
    }
  },
  resetEmail: (req, res) => {
    try {
      jwt.verify(req.params.id, appConfig.secretOrKey, async function(
        err,
        decoded
      ) {
        const user = await userModel.findById(decoded.id);
        const anotherUser = await userModel.findOne({
          email: decoded.second_email
        });
        if (!user || anotherUser) {
          return res.status(404).json({ err: "user not found!" });
        }
        user.email = decoded.second_email;
        await user.save();
        res.send(user);
      });
    } catch (e) {
      res.status(400).json();
    }
  },
  updatedPrimiumFeature: async (req, res) => {
    req.user.full_colored_button = req.body.full_colored_button;
    req.user.hide_icons = req.body.hide_icons;
    req.user.hide_sponsore = req.body.hide_sponsore;
    req.user.rounded_corner = req.body.rounded_corner;
    req.user.layout = req.body.layout;
    req.user.hide_chimaera = req.body.hide_chimaera;
    const anotherUser = await userModel.find({ userName: req.body.userName });
    if (
      anotherUser.length === 0 ||
      anotherUser[0].userName === req.user.userName
    ) {
      req.user.publicURL = `${appConfig.hostURL}/share/${req.body.userName}`;
      req.user.userName = req.body.userName;
    } else {
      return res.status(200).json({ err: "The URL used by another user!" });
    }
    const user = await req.user.save();
    if (user) {
      return res.status(200).json({});
    }
    return res.status(500).json({});
  },
  resetPassword: (req, res) => {
    try {
      jwt.verify(req.params.id, appConfig.secretOrKey, async function(
        err,
        decoded
      ) {
        const user = await userModel.findById(decoded.id);
        if (!user) {
          return res.status(404).json({ err: "user not found!" });
        }
        user.password = req.body.password;
        await user.save();
        res.send(user);
      });
    } catch (e) {
      res.status(400).json();
    }
  },
  updateCard: async (req, res) => {
    try {
      if (req.body.card) req.user.slinkLinks = req.body.card;
      await req.user.save();
      res.send(req.user.slinkLinks);
    } catch (e) {
      res.status(400).json();
    }
  },
  addContact: async (req, res) => {
    try {
      if (req.body.cardEmail) req.user.cardEmail = req.body.cardEmail;
      if (req.body.cardEmail1) req.user.cardEmail1 = req.body.cardEmail1;
      if (req.body.phone) req.user.phone = req.body.phone;
      if (req.body.phone1) req.user.phone1 = req.body.phone1;
      if (req.body.address) req.user.address = req.body.address;
      if (req.body.address1) req.user.address1 = req.body.address1;
      await req.user.save();
      res.send(req.user);
    } catch (e) {
      res.status(400).json();
    }
  },
  deleteContact: async (req, res) => {
    try {
      req.user.cardEmail = "";
      req.user.cardEmail1 = "";
      req.user.phone = "";
      req.user.phone1 = "";
      req.user.address = "";
      await req.user.save();
      res.send(req.user);
    } catch (e) {
      res.status(400).json();
    }
  },
  recoverPassword: async (req, res) => {
    try {
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ err: "User Not Found!" });
      }
      const palyload = {
        id: user.id,
        userName: user.userName,
        email: user.email
      };
      const token = jwt.sign(palyload, appConfig.secretOrKey, {
        expiresIn: "1h"
      });
      var mailOptions = {
        from: "support@chimaera.co",
        to: req.body.email,
        subject: "Sending Email From Chimaera",
        html: `<div
        style="min-height: 40vh;text-align: center;color: #000000; display: table;width: 100%;"
      >
        <div
          style="display: table-cell; vertical-align: middle; text-align: center; width: 100%;"
        >
          <p style="font-size: 18px;">
            You are requested to change your Chimaera password. Please click here to
            change password
          </p>
          <a
            href=${appConfig.hostURL}/reset-password/${token}
            target="_blank"
            style="color: #000000;padding: 5px 20px;background-color: #FE0000; border: 2px solid #000000;font-size: 18px; font-weight: bold;"
          >
            Change Password
          </a>
        </div>
      </div>`
        // `<p>You are requested to reset your Chimaera password. Please follow the link: ${appConfig.hostURL}/reset-password/${token}</p>`
      };
      sgMail.send(mailOptions);
      res.status(200).json();
    } catch (e) {
      res.status(400).json(e);
    }
  },
  signUp: async (req, res) => {
    try {
      if (req.body.userName) {
        req.body.publicURL = `${appConfig.hostURL}/share/${req.body.userName}`;
        req.body.displayedName = req.body.userName;
        req.body.createdAt = Date.now();
        req.body.adminId = req.body.adminId;
      }
      const user = new userModel(req.body);
      let findUser = await userModel.findOne({
        $or: [{ email: req.body.email }, { userName: req.body.userName }]
      });
      if (findUser && findUser.email === req.body.email) {
        console.log(findUser);
        return res
          .status(400)
          .json({ email: { message: "Email already taken" } });
      }
      if (findUser && findUser.userName === req.body.userName) {
        return res
          .status(400)
          .json({ userName: { message: "Username is already exits" } });
      }
      await user.save();

      const palyload = {
        id: user.id,
        name: user.userName,
        email: user.email
      };
      const token = jwt.sign(palyload, appConfig.secretOrKey, {
        expiresIn: "2 days"
      });
      var mailOptions = {
        from: "support@chimaera.co",
        to: user.email,
        subject: "Thank you.",
        html: `<div
        style="min-height: 40vh;text-align: center;color: #000000; display: table;width: 100%;"
      >
        <div
          style="display: table-cell; vertical-align: middle; text-align: center; width: 100%;"
        >
          <p style="font-size: 18px;">
            Thank you for joining to Chimaera.
          </p>
        </div>
      </div>`
      };
      sgMail.send(mailOptions);
      res.status(201).json({ user, token: "Bearer " + token });
    } catch (e) {
      if (e.errors.password) {
        return res.status(400).json({
          password: { message: "password must be at least 5 characters " }
        });
      }
      res.status(400).json(e);
    }
  },
  signIn: async (req, res) => {
    try {
      const user = await userModel.findOne({
        $or: [{ email: req.body.email }, { userName: req.body.userName }]
      });
      if (!user) {
        return res.status(404).json({ err: "User Not Found!" });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).json({ err: "Unable to login!" });
      }
      const palyload = {
        id: user.id,
        name: user.userName,
        email: user.email
      };
      const token = jwt.sign(palyload, appConfig.secretOrKey, {
        expiresIn: "2 days"
      });
      res.json({ user, token: "Bearer " + token });
    } catch (e) {
      res.status(400).json({ err: "Unable to login!" });
    }
  },
  facebookSignin: async function(req, res) {
    try {
      let user = await userModel.findOne({ email: req.user.emails[0].value });
      if (!user) {
        const publicURL = `${appConfig.hostURL}/share/${req.user.id}`;
        user = await userModel.create({
          displayedName: req.user.displayName,
          userName: req.user.id,
          publicURL,
          social_provider: true,
          email: req.user.emails[0].value,
          avatar: req.user.photos[0].value,
          createdAt: Date.now(),
          adminId: req.body.adminId || req.user.displayName
        });
      }
      const palyload = {
        id: user._id,
        name: user.userName,
        email: user.email
      };
      const token = jwt.sign(palyload, appConfig.secretOrKey, {
        expiresIn: "2 days"
      });
      res.json({ user, token: "Bearer " + token });
    } catch (e) {
      res.status(500).json({ err: e.message });
    }
  },
  googleSignin: async function(req, res) {
    try {
      let user = await userModel.findOne({ email: req.user.email });
      if (user) {
        user.googleId = req.user.sub;
        await user.save();
      } else {
        const publicURL = `${appConfig.hostURL}/share/${req.user.sub}`;
        user = await userModel.create({
          displayedName: req.user.name,
          userName: req.user.sub,
          publicURL,
          googleId: req.user.sub,
          email: req.user.email,
          social_provider: true,
          avatar: req.user.picture,
          createdAt: Date.now(),
          adminId: req.body.adminId || req.user.sub
        });
      }
      const palyload = {
        id: user._id,
        name: user.userName,
        email: user.email
      };
      const token = jwt.sign(palyload, appConfig.secretOrKey, {
        expiresIn: "2 days"
      });
      res.json({ user, token: "Bearer " + token });
    } catch (e) {
      res.status(500).json({ err: e.message });
    }
    // const user = await userModel.find()
  },
  deleteUser: async function(req, res) {
    try {
      const user = await userModel.findByIdAndDelete(req.user._id);
      res.json(user);
    } catch (e) {
      res.status(500).json({ err: "Internal error" });
    }
  },
  deleteLinks: async function(req, res) {
    try {
      if (req.user.slinkLinks.length < req.params.index) {
        return res.status(400).send();
      }
      req.user.slinkLinks.splice(req.params.index, 1);
      await req.user.save();
      res.json(req.user);
    } catch (e) {
      res.status(500).json({ err: "Internal error" });
    }
  },
  updateLinks: async function(req, res) {
    try {
      if (req.user.slinkLinks.length > req.body.index) {
        // if (req.body.desc)
        req.user.slinkLinks[req.body.index].desc = req.body.desc;
        if (req.body.placeholder)
          req.user.slinkLinks[req.body.index].placeholder =
            req.body.placeholder;
        if (req.body.icon)
          req.user.slinkLinks[req.body.index].avatar = req.body.icon;
        // if (req.body.title)
        req.user.slinkLinks[req.body.index].title = req.body.title;
        if (req.body.link1)
          req.user.slinkLinks[req.body.index].link1 = req.body.link1;
        if (req.body.link)
          req.user.slinkLinks[req.body.index].link = req.body.link;
        req.user.slinkLinks[req.body.index].enable = req.body.enable;
        if (req.body.bcColor)
          req.user.slinkLinks[req.body.index].bcColor = req.body.bcColor;
      }
      await req.user.save();
      res.json(req.user);
    } catch (e) {
      res.status(500).json({ err: "Internal error" });
    }
  },
  updateLinkViwes: async function(req, res) {
    try {
      const user = await userModel.findById(req.body.user_id);
      if (user.slinkLinks.length > req.body.index) {
        if (req.body.totalView) {
          user.slinkLinks[req.body.index].totalView =
            user.slinkLinks[req.body.index].totalView + 1;
        }
      }
      await user.save();
      res.json(req.body.totalView);
    } catch (e) {
      res.status(500).json({ err: "Internal error" });
    }
  },
  autoPilot: async function(req, res) {
    try {
      if (!req.body.link) {
        return res
          .status(400)
          .json({ type: "autopilot", message: "Link is required!" });
      }
      if (!req.body.startDate || !req.body.endDate) {
        return res
          .status(400)
          .json({ type: "date", message: "Date is required!" });
      }
      const user = await userModel.findByIdAndUpdate(
        req.user._id,
        { autopilot: req.body },
        { new: true, useFindAndModify: false }
      );
      res.json(user);
    } catch (e) {
      res.status(400).json(e);
    }
  },
  updateMe: async function(req, res) {
    const allKey = Object.keys(req.body);
    const allowedUpdates = [
      "totalView",
      "displayedName",
      "password",
      "oldPassword",
      "bio",
      "socialSharing",
      "profileBc",
      "designation",
      "slinkLinks",
      "avatar"
    ];
    const isValidOpetation = allKey.every(singleKey =>
      allowedUpdates.includes(singleKey)
    );
    if (!isValidOpetation) {
      return res.status(400).send({ error: "Invalid updates!" });
    }
    if (req.body.password && !req.body.oldPassword) {
      return res
        .status(400)
        .send({ type: "oldPassword", message: "Please set old password!" });
    }
    if (req.body.oldPassword) {
      if (!req.body.password) {
        return res
          .status(400)
          .send({ type: "newPassword", message: "Please set new password!" });
      }
      const isMatch = await bcrypt.compare(
        req.body.oldPassword,
        req.user.password
      );
      if (!isMatch) {
        return res.status(400).send({
          type: "oldPassword",
          message: "Old Password doesn't match!"
        });
      }
      if (req.body.password.length < 5)
        return res.status(400).send({
          type: "newPassword",
          message: "Password minnimum length is 5."
        });
    }
    if (req.file) {
      req.body.avatar = req.file.location;
      allKey.push("avatar");
    }
    try {
      allKey.forEach(key => {
        if (key === "slinkLinks") {
          req.user[key] = req.user[key].concat(req.body[key]);
        } else if (key === "second_email") {
          req.user.email = req.body[key];
        } else {
          req.user[key] = req.body[key];
        }
      });
      await req.user.save();
      res.send(req.user);
    } catch (err) {
      console.log(err);
      res.status(500).json();
    }
  },
  getUserAvatar: async function(req, res) {
    try {
      const user = await userModel.findById(req.params.id);
      if (!user || !user.avatar) {
        throw new Error();
      }
      res.set("Content-Type", "image/png");
      res.send(user.avatar);
    } catch (e) {
      res.status(400).send();
    }
  },
  getUser: async function(req, res) {
    try {
      const user = await userModel.findById(req.params.id);
      if (user.autopilot.isActive) {
        user.slinkLinks = user.slinkLinks.map(item => {
          if (item.link === user.autopilot.link) {
            if (
              user.autopilot.startDate <= Date.now() &&
              user.autopilot.endDate >= Date.now()
            ) {
              item.enable = true;
            } else {
              item.enable = false;
            }
          }
          return item;
        });
      }
      res.json(user);
    } catch (e) {
      res.status(400).send();
    }
  },
  checkout: async function(req, res) {
    let error;
    let status;
    try {
      const { product, token } = req.body;
      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id
      });
      const idempotency_key = uuid();
      if (product.price < 15) {
        req.user.premium =
          Date.now() + 30 * 24 * 60 * 60 * 1000 + req.user.premium;
      } else {
        req.user.premium =
          Date.now() + 365 * 24 * 60 * 60 * 1000 + req.user.premium;
      }
      if (product.name === "Chimaera plus") {
        req.user.account_type = "plus";
      } else if (product.name === "Chimaera gold") {
        req.user.account_type = "gold";
      }
      const charge = await stripe.charges.create(
        {
          amount: Math.round(product.price * 100),
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `Purchased the ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              line1: token.card.address_line1,
              line2: token.card.address_line2,
              city: token.card.address_city,
              country: token.card.address_country,
              postal_code: token.card.address_zip
            }
          }
        },
        {
          idempotency_key
        }
      );
      var mailOptions = {
        from: "support@chimaera.co",
        to: token.email,
        subject: "Thank you for purchasing Chimaera.",
        html: `<div
        style="min-height: 40vh;text-align: center;color: #000000; display: table;width: 100%;"
      >
        <div
          style="display: table-cell; vertical-align: middle; text-align: center; width: 100%;"
        >
          <p style="font-size: 18px;">
          Thank you. You have successfully purchased Chimaera ${product.name}. Stay connected to discover more.
          </p>
        </div>
      </div>`

        // `<p>Thank you. You have successfully purchased Chimaera ${product.name}. Stay connected to discover more.</p>`
      };
      sgMail.send(mailOptions);
      req.user.save();
      status = "success";
    } catch (error) {
      status = "failure";
    }

    res.json({ error, status });
  }
};
