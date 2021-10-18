const vCardsJS = require('vcards-js');
const userModel = require("../models/Users");
const superUserModel = require("../models/SuperUser");

module.exports = {
  getAllIcons: async function (req, res) {
    try {
      const user = await superUserModel.find({});
      if (user.length === 0)
        return res.status(400).json({ err: "user not found" });
      res.json(user[0].socialIcons);
    } catch (e) {
      res.status(500).json({ err: "Internal error" });
    }
  },
  getAllBlogs: async function (req, res) {
    try {
      const user = await superUserModel.find({});
      if (user.length === 0)
        return res.status(400).json({ err: "user not found" });
      res.json(user[0]);
    } catch (e) {
      res.status(500).json({ err: "Internal error" });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await userModel.findOne({
        $or: [
          { userName: req.params.userName },
          { adminId: req.params.userName }
        ]
      });
      if (!user) {
        return res.status(404).json({ err: "Not Found" });
      }
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
      res.status(400).json({ err: "Not Found" });
    }
  },
  updateMe: async function (req, res) {
    const allKey = Object.keys(req.body);
    const allowedUpdates = ["totalView", "userName"];
    const isValidOpetation = allKey.every(singleKey =>
      allowedUpdates.includes(singleKey)
    );
    if (!isValidOpetation) {
      return res.status(400).send({ error: "Invalid updates!" });
    }
    try {
      await userModel.findOneAndUpdate(
        { userName: req.body.userName },
        { totalView: req.body.totalView },
        { useFindAndModify: false }
      );
    } catch (e) {
      res.send();
    }
  },
  getUserAvatar: async (req, res) => {
    try {
      const user = await userModel.findOne({ userName: req.params.userName });
      if (!user || !user.avatar) {
        throw new Error();
      }
      res.set("Content-Type", "image/jpg");
      res.send(user.avatar);
    } catch (e) {
      res.status(400).send();
    }
  },
  getSponsore: async (req, res) => {
    try {
      const user = await superUserModel.find({});
      if (user.length === 0)
        return res.status(400).json({ err: "user not found" });
      const user1 = await userModel.findOne({ userName: req.params.userName });
      // if(user1.premium < Date.now()){
      //     req.user.account_type="user"
      //     req.user.premium = 0
      //     req.user.save()
      // }
      const data =
        user[0].sponsor[Math.floor(Math.random() * user[0].sponsor.length)];
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({});
      }
    } catch (e) {
      res.status(500).json({ err: "Internal error" });
    }
  },
  getUserVCf: async (req, res) => {
    try {
      const user = await userModel.findOne(
        {
          $or: [
            { userName: req.params.userName },
            { adminId: req.params.userName }
          ]
        },
        "cardEmail cardEmail1 phone phone1 address address1 displayedName"
      );
      const vCard = vCardsJS();
      vCard.isOrganization = true;
      // vCard.nickname.label = 'Name';
      vCard.nickname = user.displayedName;
      // vCard.email.label = 'Email';
      vCard.email = user.cardEmail;
      // vCard.workEmail.label = 'Work Email';
      vCard.workEmail = user.cardEmail1;
      // vCard.cellPhone.label =  'Cell Phone';
      vCard.cellPhone = user.phone;
      // vCard.workPhone.label = 'Work Phone';
      vCard.workPhone = user.phone1;
      //set address information
      vCard.homeAddress.label = 'Home Address';
      vCard.homeAddress.street = user.address1;
      vCard.workAddress.label = 'Work Address';
      vCard.workAddress.street =  user.address;

      //set content-type and disposition including desired filename
      res.set("Content-Type", `text/vcard; name="name.vcf"`);
      res.set("Content-Disposition", `inline; filename="name.vcf"`);
      //send the response
      res.send(vCard.getFormattedString());
    } catch (e) {
      res.status(400).send();
    }
  }
};
